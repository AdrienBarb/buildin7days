import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { subscribeSchema } from "@/lib/schemas/subscribe";
import { errorHandler } from "@/utils/errors/errorHandler";

const BEEHIIV_API_URL = process.env.BEEHIIV_API_URL;
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!BEEHIIV_API_KEY || !BEEHIIV_API_URL) {
      return NextResponse.json(
        { error: "Beehiiv API token is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const { email } = subscribeSchema.parse(body);

    const response = await axios.post(
      BEEHIIV_API_URL,
      { email, reactivate_existing: true, send_welcome_email: true },
      {
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return errorHandler(error);
  }
}
