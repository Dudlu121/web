async function run() {
  const res = await fetch("https://tryhackme.com/api/user/rank/Dudlu121");
  console.log(res.status, await res.text());
}
run();
