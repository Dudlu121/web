async function run() {
  const url = "https://tryhackme-badges.s3.amazonaws.com/dudlu121.png";
  const res = await fetch(url);
  console.log(res.status, res.statusText);
}
run();
