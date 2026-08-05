interface Env {
  THM_USERNAME: string;
  GITHUB_PAT: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Proxy TryHackMe Badge
    if (url.pathname === "/api/thm-badge") {
      const username = env.THM_USERNAME;
      if (!username) {
        return new Response("THM_USERNAME not configured", { status: 400 });
      }
      const response = await fetch(`https://tryhackme-badges.s3.amazonaws.com/${username}.png`);
      return new Response(response.body, {
        headers: {
          "Content-Type": response.headers.get("content-type") || "image/png",
          "Cache-Control": "public, max-age=900"
        }
      });
    }

    // Proxy TryHackMe Stats
    if (url.pathname === "/api/thm-stats") {
      const username = env.THM_USERNAME;
      const githubPat = env.GITHUB_PAT;
      if (!username) {
        return new Response(JSON.stringify({ error: "THM_USERNAME not configured" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      try {
        let response;
        const isDummyPat = githubPat && githubPat.includes("11BCGBOHA");

        if (githubPat && !isDummyPat) {
          response = await fetch(`https://api.github.com/repos/Dudlu121/THM-STATS-PULLER/contents/data/latest.json`, {
            headers: {
              "Authorization": `token ${githubPat}`,
              "Accept": "application/vnd.github.v3.raw",
              "User-Agent": "Cloudflare-Worker"
            }
          });
        } else {
          response = await fetch(`https://tryhackme.com/api/v2/public-profile?username=${username}`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
              "Accept": "application/json"
            }
          });
        }

        if (!response.ok) {
          return new Response(JSON.stringify({ error: `Failed to fetch: ${response.statusText}` }), {
            status: response.status,
            headers: { "Content-Type": "application/json" }
          });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=900"
          }
        });
      } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message || "Server Error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Serve static files from the assets directory
    return env.ASSETS.fetch(request);
  }
};
