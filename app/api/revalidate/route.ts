import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target. Configure the webhook to POST on create/update/delete
 * with projection `{ "_type": _type }` and the shared secret in
 * SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: body._type, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
