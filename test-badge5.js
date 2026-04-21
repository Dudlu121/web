async function run() {
  const url = "https://tryhackme.com/badge/dudlu121";
  const res = await fetch(url);
  const text = await res.text();
  console.log(text.slice(0, 300));
}
run();
