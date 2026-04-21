async function run() {
  const res = await fetch("https://tryhackme.com/api/v2/public-profile?username=dudlu121");
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
