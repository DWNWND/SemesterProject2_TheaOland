async function router() {
  const loadRequest = "./storage/load.js";
  const { load } = await import(loadRequest);
  const loggedIn = load("profile");

  const pathname = window.location.pathname;

  if (pathname.toLowerCase() === "/semesterproject2_theaoland/" || pathname === "/") {
    console.log("Pathname: ", pathname, ", Location: Home page/Feed");
    const feedRequest = "./routes/feed.js";
    const { generateFeed } = await import(feedRequest);
    await generateFeed();
    return;
  }
  if (pathname.toLowerCase().includes("/auth/")) {
    if (loggedIn) {
      location.pathname = "/";
    }
    if (!loggedIn) {
      console.log("Pathname: ", pathname, ", Location: Login/Register page");
      const authRequest = "./routes/auth.js";
      const { generateAuth } = await import(authRequest);
      await generateAuth();
    }
    return;
  }
  if (pathname.toLowerCase().includes("/listing/")) {
    if (!loggedIn) {
      location.pathname = "/";
    }
    if (loggedIn) {
      console.log("Pathname: ", pathname, ", Location: Listing spesific page");
      const listingRequest = "./routes/listing.js";
      const { generateListingSpesific } = await import(listingRequest);
      await generateListingSpesific();
    }
    return;
  }
  if (pathname.toLowerCase().includes("/profile/")) {
    if (!loggedIn) {
      location.pathname = "/";
    }
    if (loggedIn) {
      console.log("Pathname: ", pathname, ", Location: Profile page");
      const profileRequest = "./routes/profile.js";
      const { generateUserProfile } = await import(profileRequest);
      await generateUserProfile();
    }
    return;
  }
  if (pathname.toLowerCase().includes("/edit/")) {
    if (!loggedIn) {
      location.pathname = "/";
    }
    if (loggedIn) {
      console.log("Pathname: ", pathname, ", Location: Edit/Publish listing page");
      const editRequest = "./routes/edit.js";
      const { generateEdit } = await import(editRequest);
      await generateEdit();
    }
    return;
  }
  if (pathname.toLowerCase().includes("/alllistings/")) {
    if (!loggedIn) {
      location.pathname = "/";
    }
    if (loggedIn) {
      console.log("Pathname: ", pathname, ", Location: All userSpesific Listings");
      const allListingsRequest = "./routes/allListings.js";
      const { generateUserFeed } = await import(allListingsRequest);
      await generateUserFeed();
    }
    return;
  } else {
    throw new Error("The router function is not able to read pathname. Pathname: ", pathname);
  }
}
router();
