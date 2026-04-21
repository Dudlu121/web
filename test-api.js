async function run() {
  const urls = [
    "https://tryhackme.com/api/v2/public-profile?username=Dudlu121",
    "https://tryhackme.com/api/v2/users/public-profile?username=Dudlu121",
    "https://tryhackme.com/api/users/Dudlu121"
  ];
  for (const url of urls) {
     console.log("Fetching", url);
     const res = await fetch(url, {
       headers: {
         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
         "Accept": "application/json"
       }
     });
     const text = await res.text();
     console.log(res.status, text.slice(0, 150));
  }
}
run();
