//Awaiting image load inspired by: https://stackoverflow.com/questions/11071314/javascript-execute-after-all-images-have-loaded

function hideLoader() {
  const loader = document.getElementById("loaderContainerMain");
  loader.style.display = "none";
}

function showContent() {
  const content = document.querySelector(".content");
  content.classList.remove("hidden");
}

async function router() {
  const loadRequest = "./storage/load.js";
  const { load } = await import(loadRequest);
  const loggedIn = load("profile");

  const pathname = window.location.pathname;

  if (pathname.toLowerCase().includes("/auth/")) {
    if (loggedIn) {
      location.pathname = "../";
    }
    if (!loggedIn) {
      const authRequest = "./routes/authPage.js";
      const { generateAuth } = await import(authRequest);
      await generateAuth();
    }
    return;
  }
  if (pathname.toLowerCase().includes("/listing/")) {
    if (!loggedIn) {
      location.pathname = "../";
    }
    if (loggedIn) {
      const listingRequest = "./routes/listingSpesificPage.js";
      const { generateListingSpesific } = await import(listingRequest);
      await generateListingSpesific();
      Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.onload = img.onerror = resolve;
              })
          )
      ).then(() => {
        const content = document.querySelector(".content");
        hideLoader();
        showContent();
        content.classList.add("d-flex");
      });
    }
    return;
  }
  if (pathname.toLowerCase().includes("/profile/")) {
    if (!loggedIn) {
      location.pathname = "../";
    }
    if (loggedIn) {
      const profileRequest = "./routes/profilePage.js";
      const { generateUserProfile } = await import(profileRequest);
      await generateUserProfile();
      const content = document.querySelector(".content");
      hideLoader();
      showContent();
      content.classList.add("d-flex");
    }
    return;
  }
  if (pathname.toLowerCase().includes("/postlisting/")) {
    if (!loggedIn) {
      location.pathname = "../";
    }
    if (loggedIn) {
      const editRequest = "./routes/postListingPage.js";
      const { generateEdit } = await import(editRequest);
      await generateEdit();
      hideLoader();
      showContent();
    }
    return;
  }
  if (pathname.toLowerCase().includes("/userlistings/")) {
    if (!loggedIn) {
      location.pathname = "../";
    }
    if (loggedIn) {
      const allListingsRequest = "./routes/userListingsPage.js";
      const { generateUserFeed } = await import(allListingsRequest);
      await generateUserFeed();
      const content = document.querySelector(".content");
      hideLoader();
      showContent();
      content.classList.add("row");
    }
    return;
  } else {
    const feedRequest = "./routes/feedPage.js";
    const { generateFeed } = await import(feedRequest);
    await generateFeed();
    const content = document.querySelector(".content");
    hideLoader();
    showContent();
    content.classList.add("row");
    return;
  }
}
router();
