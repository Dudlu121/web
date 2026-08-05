export async function onRequest(context: any) {
  const { env } = context;
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
    
    if (githubPat) {
      response = await fetch(`https://raw.githubusercontent.com/Dudlu121/THM-STATS-PULLER/main/data/latest.json`, {
        headers: {
          "Authorization": `token ${githubPat}`,
          "Accept": "application/vnd.github.v3.raw"
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
      return new Response(JSON.stringify({ error: `Failed to fetch THM stats: ${response.statusText}` }), { 
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
  } catch (e) {
    return new Response(JSON.stringify({ error: "Server Error" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
