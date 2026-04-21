async function run() {
  const res = await fetch("http://0.0.0.0:3000/api/thm-badge");
  console.log(res.status, res.headers.get("content-type"));
}
run();
