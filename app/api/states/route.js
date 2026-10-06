import { getStates } from "@/lib/storage";

// ROUTE HANDLER: a JSON endpoint at /api/states (optional ?region=northern).
// It reads from the local storage file. No third-party API is involved.
export async function GET(request) {
  const region = request.nextUrl.searchParams.get("region") ?? undefined;
  const states = await getStates({ region });
  return Response.json(
    states.map(({ slug, name, capital, region }) => ({ slug, name, capital, region })),
  );
}
