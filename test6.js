async function run() {
  const urls = [
    "https://tryhackme-badges.s3.amazonaws.com/dudlu121.png",
    "https://tryhackme-badges.s3.amazonaws.com/dudlu121.svg",
    "https://tryhackme-badges.s3.amazonaws.com/Dudlu121.png",
    "https://tryhackme-badges.s3.amazonaws.com/Dudlu121.svg"
  ];
  for(let url of urls) {
     const res = await fetch(url);
     console.log(url, res.status);
  }
}
run();
