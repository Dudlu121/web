async function run() {
  const urls = [
    "https://tryhackme.com/api/user/dudlu121",
    "https://tryhackme.com/api/user/Dudlu121",
    "https://tryhackme.com/api/user/rank/dudlu121",
    "https://tryhackme.com/api/user/rank/Dudlu121"
  ];
  for (const url of urls) {
     const text = await (await fetch(url)).text();
     if(!text.includes("<!DOCTYPE html>")) console.log("FOUND", url, text);
  }
}
run();
