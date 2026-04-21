async function run() {
  const url = "https://tryhackme.com/badge/dudlu121";
  const res = await fetch(url);
  console.log(res.status, res.headers.get("content-type"));
}
run();
