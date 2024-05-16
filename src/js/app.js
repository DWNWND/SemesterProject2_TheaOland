//https://stackoverflow.com/questions/11071314/javascript-execute-after-all-images-have-loaded

function hideLoader() {
  const loader = document.getElementById("loaderContainerMain");
  loader.style.display = "none";
}

function hideImageLoader() {
  const ImgLoaderContainer = document.querySelectorAll("#ImgLoaderContainer");
  ImgLoaderContainer.forEach((loader) => {
    loader.classList.remove("d-flex");
    loader.style.display = "none";
  });
}
function showImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.classList.remove("hidden");
  });
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

  if (pathname.toLowerCase() === "/semesterproject2_theaoland/" || pathname === "/") {
    const feedRequest = "./routes/feed.js";
    const { generateFeed } = await import(feedRequest);
    await generateFeed();
    const content = document.querySelector(".content");
    hideLoader();
    showContent();
    content.classList.add("row");
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
      hideImageLoader();
      showImages();
    });

    return;
  }
  if (pathname.toLowerCase().includes("/auth/")) {
    if (loggedIn) {
      location.pathname = "/";
    }
    if (!loggedIn) {
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
      const listingRequest = "./routes/listing.js";
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
      location.pathname = "/";
    }
    if (loggedIn) {
      const profileRequest = "./routes/profile.js";
      const { generateUserProfile } = await import(profileRequest);
      await generateUserProfile();
      const content = document.querySelector(".content");
      hideLoader();
      showContent();
      content.classList.add("d-flex");

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
        hideImageLoader();
        showImages();
      });
    }
    return;
  }
  if (pathname.toLowerCase().includes("/edit/")) {
    if (!loggedIn) {
      location.pathname = "/";
    }
    if (loggedIn) {
      const editRequest = "./routes/edit.js";
      const { generateEdit } = await import(editRequest);
      await generateEdit();
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
        hideLoader();
        showContent();
      });
    }
    return;
  }
  if (pathname.toLowerCase().includes("/alllistings/")) {
    if (!loggedIn) {
      location.pathname = "/";
    }
    if (loggedIn) {
      const allListingsRequest = "./routes/allListings.js";
      const { generateUserFeed } = await import(allListingsRequest);
      await generateUserFeed();
      const content = document.querySelector(".content");
      hideLoader();
      showContent();
      content.classList.add("row");
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
        hideImageLoader();
        showImages();
      });
    }
    return;
  } else {
    throw new Error("The pathname is not recognizable: ", pathname);
  }
}
router();
