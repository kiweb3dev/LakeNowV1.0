import { NextRequest, NextResponse } from "next/server";
import { DISPATCH_COOKIE_NAME, isDispatchAuthorized } from "@/lib/dispatchAuth";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";

const allowedStatuses = new Set(["pending", "accepted", "done", "rejected"]);

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const isAuthorized = await isDispatchAuthorized(
    request.cookies.get(DISPATCH_COOKIE_NAME)?.value
  );

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const status = typeof body.status === "string" ? body.status : "";

  if (!allowedStatuses.has(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const { id } = await context.params;
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update request status.",
      },
      { status: 500 }
    );
  }
}
