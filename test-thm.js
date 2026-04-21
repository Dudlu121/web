const fetch = require("node-fetch");
async function run() {
  const urls = [
    "https://tryhackme.com/api/user/dudlu121",
    "https://tryhackme.com/api/user/profile/dudlu121",
    "https://tryhackme.com/api/users/dudlu121",
    "https://tryhackme.com/api/user/exist/dudlu121"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      console.log(url, res.status, text.slice(0, 100));
    } catch(e) {}
  }
}
run();
