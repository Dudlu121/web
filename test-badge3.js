async function run() {
  const url1 = "https://tryhackme-badges.s3.amazonaws.com/Dudlu121.png";
  const url2 = "https://tryhackme-badges.s3.amazonaws.com/dudlu121.png";
  
  for (const u of [url1, url2]) {
     const r = await fetch(u);
     console.log(u, r.status);
  }
}
run();
