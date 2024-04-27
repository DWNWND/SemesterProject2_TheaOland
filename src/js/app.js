// function router() {
//   const pathname = window.location.pathname;

//   console.log(pathname);

//   switch (pathname) {
//     case "/":
//     case "/index.html":
//       console.log("Home page");
//       break;
//     case "/register/":
//       console.log("Register page");
//       break;
//   }
// }

// router();

import { loggedOutFeed } from "./routes/feed.mjs";

await loggedOutFeed();
