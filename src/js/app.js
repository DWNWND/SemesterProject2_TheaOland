async function router() {
  const pathname = window.location.pathname;

  const testPath = pathname.slice(pathname.lastIndexOf("/"));
  console.log(testPath);

  switch (pathname) {
    // case "/SemesterProject2_TheaOland/":
    case "/":
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
    case "/SemesterProject2_TheaOland/auth/index.html":
      console.log("Login/Register page");
      // generateAuth()

      const authRequest = "./routes/auth.js";
      const { generateAuth } = await import(authRequest);
      await generateAuth();

      break;
    case "/SemesterProject2_TheaOland/profile/index.html":
      console.log("Profile page");
      break;

    case "/SemesterProject2_TheaOland/listing/index.html":
      console.log("Listing spesific page");
      break;
    case "/SemesterProject2_TheaOland/edit/index.html":
      console.log("Edit/Publish listing page");
      break;
  }
}

router();

// import { generateFeed } from "./routes/feed.mjs";
// await generateFeed();
