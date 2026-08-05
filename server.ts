import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Primitive Memory Cache to be respectful to TryHackMe APIs
  const thmCache = {
    badge: { buffer: null as Buffer | null, contentType: "", timestamp: 0 },
    stats: { data: null as any, timestamp: 0 },
    TTL: 1000 * 60 * 15 // 15 minutes
  };

  // THM Badge proxy to hide username
  app.get("/api/thm-badge", async (req, res) => {
    try {
      const username = process.env.THM_USERNAME;
      if (!username) {
        return res.status(400).send("THM_USERNAME not configured");
      }

      // Serve from memory cache if fresh
      if (thmCache.badge.buffer && Date.now() - thmCache.badge.timestamp < thmCache.TTL) {
        res.setHeader("Content-Type", thmCache.badge.contentType);
        res.setHeader("Cache-Control", "public, max-age=900");
        return res.send(thmCache.badge.buffer);
      }

      // Check the TryHackMe S3 badge endpoint
      const thmUrl = `https://tryhackme-badges.s3.amazonaws.com/${username}.png`;
      const response = await fetch(thmUrl);

      if (!response.ok) {
        return res.status(response.status).send(`Failed to fetch THM badge: ${response.statusText}`);
      }

      // Read the image buffer and send it back to the client
      const imageBuffer = await response.arrayBuffer();
      const contentType = response.headers.get("content-type") || "image/png";
      const buffer = Buffer.from(imageBuffer);
      
      // Save to memory cache
      thmCache.badge.buffer = buffer;
      thmCache.badge.contentType = contentType;
      thmCache.badge.timestamp = Date.now();

      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=900"); 
      res.send(buffer);
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  });

  // THM Stats proxy
  app.get("/api/thm-stats", async (req, res) => {
    try {
      const username = process.env.THM_USERNAME;
      if (!username) {
        return res.status(400).json({ error: "THM_USERNAME not configured" });
      }

      // Serve from memory cache if fresh
      if (thmCache.stats.data && Date.now() - thmCache.stats.timestamp < thmCache.TTL) {
        res.setHeader("Cache-Control", "public, max-age=900");
        return res.json(thmCache.stats.data);
      }

      const githubPat = process.env.GITHUB_PAT;
      if (!githubPat) {
        console.warn("GITHUB_PAT not configured, falling back to THM API (may be blocked)");
      }

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
        return res.status(response.status).json({ error: `Failed to fetch THM stats: ${response.statusText}` });
      }

      const data = await response.json();
      
      // Save to cache
      thmCache.stats.data = data;
      thmCache.stats.timestamp = Date.now();

      res.setHeader("Cache-Control", "public, max-age=900");
      res.json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve the static files from the build directory
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
