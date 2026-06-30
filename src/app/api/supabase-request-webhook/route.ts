import { NextRequest, NextResponse } from "next/server";

type RequestRecord = {
  id?: string;
  type?: string | null;
  name?: string | null;
  phone?: string | null;
  pickup?: string | null;
  destination?: string | null;
  items?: string | null;
  created_at?: string | null;
};

function getServiceLabel(type?: string | null) {
  if (type === "ride") return "Land Ride";
  if (type === "delivery") return "Land Delivery";
  if (type === "water_taxi") return "Water Ride";
  if (type === "boat_delivery") return "Water Delivery";
  if (type === "captain_request") return "Captain Request";
  if (type === "beta_feedback") return "Beta Feedback";
  return "LakeNow Request";
}

function buildSmsBody(record: RequestRecord) {
  const service = getServiceLabel(record.type);
  const requestUrl =
    process.env.NEXT_PUBLIC_APP_URL && record.id
      ? `${process.env.NEXT_PUBLIC_APP_URL}/dispatch`
      : "Open /dispatch";

  return [
    `New LakeNow ${service}`,
    record.name ? `Name: ${record.name}` : null,
    record.phone ? `Phone: ${record.phone}` : null,
    record.pickup ? `Pickup: ${record.pickup}` : null,
    record.destination ? `Destination: ${record.destination}` : null,
    record.items ? `Details: ${record.items}` : null,
    requestUrl,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendSms(body: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.DISPATCH_PHONE_NUMBER;

  if (!accountSid || !authToken || !from || !to) {
    throw new Error("Twilio SMS environment variables are not configured.");
  }

  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString(
    "base64"
  );

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: to,
        From: from,
        Body: body.slice(0, 1500),
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Twilio SMS request failed.");
  }
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;
  const providedSecret = request.headers.get("x-lakenow-webhook-secret");

  if (!webhookSecret || providedSecret !== webhookSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const record = payload?.record as RequestRecord | undefined;

  if (!record) {
    return NextResponse.json({ error: "Missing request record." }, { status: 400 });
  }

  if (record.type === "beta_feedback") {
    return NextResponse.json({ skipped: true });
  }

  try {
    await sendSms(buildSmsBody(record));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send dispatch text message.",
      },
      { status: 500 }
    );
  }
}
