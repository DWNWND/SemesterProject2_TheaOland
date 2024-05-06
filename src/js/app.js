async function router() {
  const pathname = window.location.pathname;

  //for the local version:
  // const route = pathname.split("/")[1];

  //for the deployed site:
  const route = pathname.split("/")[2];

  console.log(route);

  switch (route) {
    // case "/SemesterProject2_TheaOland/":
    case "":
      console.log("Home page/Feed");

      const feedRequest = "./routes/feed.js";
      const { generateFeed } = await import(feedRequest);
      await generateFeed();

      break;

    // case "/index.html":
    //   console.log("Home page/Feed");

    //   const feedRequest = "./routes/feed.js";
    //   const { generateFeed } = await import(feedRequest);
    //   await generateFeed();

    //   break;
    case "auth":
      console.log("Login/Register page");
      // generateAuth()

      const authRequest = "./routes/auth.js";
      const { generateAuth } = await import(authRequest);
      await generateAuth();

      break;
    case "profile":
      console.log("Profile page");
      break;

    case "listing":
      console.log("Listing spesific page");
      break;
    case "edit":
      console.log("Edit/Publish listing page");
      break;
  }
}

router();

// import { generateFeed } from "./routes/feed.mjs";
// await generateFeed();
