async function run() {
  const res = await fetch("https://tryhackme.com/api/v2/public-profile?username=Dudlu121", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "application/json"
    }
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
