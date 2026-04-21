const fs = require("fs");
async function run() {
  const res = await fetch("https://tryhackme.com/badge/dudlu121");
  console.log(res.status, res.headers.get("content-type"));
}
run();
