async function run() {
  const res = await fetch("https://tryhackme.com/p/dudlu121");
  const text = await res.text();
  console.log(res.status, text.includes("Cloudflare") ? "Cloudflare blocked" : "Success", text.slice(0, 100));
}
run();
