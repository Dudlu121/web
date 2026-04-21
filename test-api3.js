async function run() {
  const urls = [
    "https://tryhackme.com/api/v2/public-profile?username=dudlu121",
    "https://tryhackme.com/api/v2/public-profile?username=Dudlu121",
    "https://tryhackme.com/api/all/dudlu121"
  ];
  for (const url of urls) {
     console.log("Fetching", url);
     const res = await fetch(url, {
       headers: {
         "User-Agent": "Mozilla/5.0",
         "Accept": "application/json"
       }
     });
     const text = await res.text();
     console.log(res.status, text.slice(0, 150));
  }
}
run();
