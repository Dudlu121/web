export async function onRequest(context: any) {
  const { env } = context;
  const username = env.THM_USERNAME;

  if (!username) {
    return new Response("THM_USERNAME not configured", { status: 400 });
  }

  try {
    const thmUrl = `https://tryhackme-badges.s3.amazonaws.com/${username}.png`;
    const response = await fetch(thmUrl);

    if (!response.ok) {
      return new Response(`Failed to fetch THM badge: ${response.statusText}`, { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/png";

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=900"
      }
    });
  } catch (e) {
    return new Response("Server Error", { status: 500 });
  }
}
