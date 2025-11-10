import { NextResponse } from "next/server";
import crypto from "crypto";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const LEMON_WEBHOOK_SECRET = process.env.LEMON_WEBHOOK_SECRET!;
const ORG = "BuildIn7Days";

const VARIANT_TO_TEAM_MAP: Record<string, string> = {
  "1083631": "customers-scale-boilerplate",
};

async function getTeamId(slug: string) {
  const r = await fetch(`https://api.github.com/orgs/${ORG}/teams/${slug}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });
  if (!r.ok) {
    const errorText = await r.text();
    throw new Error(`Cannot fetch team ${slug}: ${errorText}`);
  }
  const t = await r.json();
  return t.id as number;
}

async function inviteByEmailWithTeam(email: string, teamSlug: string) {
  const teamId = await getTeamId(teamSlug);
  const res = await fetch(`https://api.github.com/orgs/${ORG}/invitations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      role: "direct_member",
      team_ids: [teamId],
    }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Org invite failed: ${errorText}`);
  }
}

function extractVariantId(payload: {
  data?: {
    attributes?: {
      first_order_item?: {
        variant_id?: number;
      };
      order_items?: {
        data?: Array<{
          attributes?: {
            variant_id?: number;
          };
        }>;
      };
    };
  };
}): number | undefined {
  // Try first_order_item first (for order_created events)
  if (payload?.data?.attributes?.first_order_item?.variant_id) {
    return payload.data.attributes.first_order_item.variant_id;
  }

  // Try order_items array (for subscription events)
  const orderItems = payload?.data?.attributes?.order_items?.data;
  if (orderItems && orderItems.length > 0) {
    return orderItems[0]?.attributes?.variant_id;
  }

  return undefined;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");

    if (!LEMON_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const digest = crypto
      .createHmac("sha256", LEMON_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (digest !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload?.meta?.event_name as string;
    const email = payload?.data?.attributes?.user_email as string | undefined;
    const variantId = extractVariantId(payload);

    // Grant on purchase / subscription start / update
    if (
      event === "order_created" ||
      event === "subscription_created" ||
      event === "subscription_updated"
    ) {
      if (email && variantId) {
        const teamSlug = VARIANT_TO_TEAM_MAP[variantId.toString()];
        if (teamSlug) {
          await inviteByEmailWithTeam(email, teamSlug);
        }
      }
    }

    // Revoke on cancel / expire / refund
    if (
      event === "subscription_cancelled" ||
      event === "subscription_expired" ||
      event === "order_refunded"
    ) {
      // Note: Revocation requires GitHub username, which is not available from email-only invites
      // Consider storing username mapping or requiring it at checkout
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
