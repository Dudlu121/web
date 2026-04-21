async function run() {
  const res = await fetch("https://tryhackme-badges.s3.amazonaws.com/Dudlu121.png");
  console.log("png", res.status);
  const res2 = await fetch("https://tryhackme.com/api/v2/badges/public-profile?userPublicId=12301293"); // what is his userPublicId?
}
run();
