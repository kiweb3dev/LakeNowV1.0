import { NextRequest, NextResponse } from "next/server";
import { DISPATCH_COOKIE_NAME, isDispatchAuthorized } from "@/lib/dispatchAuth";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request: NextRequest) {
  const isAuthorized = await isDispatchAuthorized(
    request.cookies.get(DISPATCH_COOKIE_NAME)?.value
  );

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ requests: data || [] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load dispatch requests.",
      },
      { status: 500 }
    );
  }
}
