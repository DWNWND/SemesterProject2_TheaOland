async function router() {
  const pathname = window.location.pathname;

  console.log(pathname);

  switch (pathname) {
    case "/":
    case "/index.html":
      console.log("Home page/Feed");

      const feedRequest = "./routes/feed.mjs";
      const { generateFeed } = await import(feedRequest);
      await generateFeed();

      break;
    case "/auth/index.html":
      console.log("Login/Register page");
      // generateAuth()

      const authRequest = "./routes/auth.mjs";
      const { generateAuth } = await import(authRequest);
      await generateAuth();

      break;
    case "/profile/index.html":
      console.log("Profile page");
      break;

    case "/listing/index.html":
      console.log("Listing spesific page");
      break;
    case "/edit/index.html":
      console.log("Edit/Publish listing page");
      break;
  }
}

router();

// import { generateFeed } from "./routes/feed.mjs";
// await generateFeed();
