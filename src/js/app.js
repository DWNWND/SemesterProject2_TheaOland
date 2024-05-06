async function router() {
  const pathname = window.location.pathname;

  if (pathname.toLowerCase() === "/semesterproject2_theaoland/" || pathname === "/") {
    console.log("Pathname: ", pathname, ", Location: Home page/Feed");
    const feedRequest = "./routes/feed.js";
    const { generateFeed } = await import(feedRequest);
    await generateFeed();
    return;
  }
  if (pathname.toLowerCase().includes("/auth/")) {
    console.log("Pathname: ", pathname, ", Location: Login/Register page");
    const authRequest = "./routes/auth.js";
    const { generateAuth } = await import(authRequest);
    await generateAuth();
    return;
  }
  if (pathname.toLowerCase().includes("/listing/")) {
    console.log("Pathname: ", pathname, ", Location: Listing spesific page");
    return;
  }
  if (pathname.toLowerCase().includes("/profile/")) {
    console.log("Pathname: ", pathname, ", Location: Profile page");
    return;
  }
  if (pathname.toLowerCase().includes("/edit/")) {
    console.log("Pathname: ", pathname, ", Location: Edit/Publish listing page");
    return;
  } else {
    throw new Error("Pathname is not defined according to the router function. Pathname: ", pathname);
  }
}
router();
