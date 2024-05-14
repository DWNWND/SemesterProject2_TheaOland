import { listenForLogout } from "../handlers/listners/logout.js";
import { updateProfileTemplate } from "../handlers/listners/_index.js";
import { get } from "../api/requests/get.js";

// const uxElementSecondary = document.getElementById("uxElementSecondary");

export function profileTemplate(userProfile) {
  const profileElement = document.createElement("div");
  profileElement.classList.add("user-profile", "d-flex", "flex-column", "align-items-center", "text-red", "justify-content-between");
  profileElement.id = "profileElement";

  const avatarContainer = document.createElement("div");
  avatarContainer.classList.add("p-4", "d-flex", "justify-content-center");

  const avatar = document.createElement("img");
  avatar.classList.add("img-profile");
  avatar.src = userProfile.avatar.url;
  avatar.alt = userProfile.avatar.alt;

  const username = document.createElement("h1");
  username.classList.add("heading-2", "text-red", "text-center");
  username.innerText = userProfile.name;

  const bio = document.createElement("div");
  bio.classList.add("text-center");
  if (!userProfile.bio) {
    bio.innerText = "";
  }
  if (userProfile.bio) {
    bio.innerText = userProfile.bio;
  }

  const credit = document.createElement("div");
  credit.classList.add("heading-1", "text-dark-purple", "text-center", "pt-4", "pb-4");
  credit.innerText = "CREDITS: " + userProfile.credits;

  const logoutBtn = document.createElement("button");
  logoutBtn.classList.add("d-flex", "btn-purple", "align-items-center", "w-100", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-fontsize-l", "lowercase");
  logoutBtn.id = "logoutBtn";
  logoutBtn.innerText = "log out";
  listenForLogout(logoutBtn);

  const editProfileBtn = document.createElement("button");
  editProfileBtn.classList.add("lowercase", "d-flex", "w-100", "align-items-center", "justify-content-center", "btn-local", "btn-height-s", "btn-width-xs", "btn-orange", "btn-fontsize-l");
  editProfileBtn.id = "eidtProfileBtn";
  editProfileBtn.innerText = "edit profile";
  updateProfileTemplate(editProfileBtn, userProfile, profileElement);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("d-flex", "flex-column", "w-100", "align-items-center", "justify-content-center", "gap-2");
  btnContainer.append(editProfileBtn, logoutBtn);

  const details = document.createElement("div");

  avatarContainer.append(avatar);
  details.append(username, bio, credit);
  profileElement.append(avatarContainer, details, btnContainer);

  const profileContainer = document.getElementById("profileContainer");
  // uxElementSecondary.innerHTML = "";

  profileContainer.append(profileElement);
}

export async function displayWins(username) {
  const wins = await get("winsByProfile", username);
  const winsContainer = document.getElementById("wins");
  if (wins.length === 0) {
    const userFeedbackMsg = "no wins yet";
    winsContainer.append(userFeedbackMsg);
  } else {
    wins.forEach((win) => {
      const winContainer = document.createElement("div");
      winContainer.classList.add("d-flex", "bg-light-orange", "w-100", "rounded", "p-2", "justify-content-between", "align-items-center");

      const titleContainer = document.createElement("div");
      titleContainer.classList.add("uppercase", "heading-2-feed");
      const winAmountContainer = document.createElement("div");
      titleContainer.innerHTML = win.listing.title;
      winAmountContainer.innerText = win.amount + " credit";

      winContainer.append(titleContainer, winAmountContainer);
      winsContainer.append(winContainer);
    });
  }
}

export async function displayBids(username) {
  const bids = await get("bidsByProfile", username);

  const bidsContainer = document.getElementById("bids");
  bids.forEach((bid) => {
    const bidContainer = document.createElement("a");
    const link = `/listing/index.html?key=${bid.listing.id}`;
    bidContainer.href = link;
    bidContainer.classList.add("d-flex", "bg-pink", "w-100", "rounded", "p-2", "justify-content-between", "align-items-center", "no-decoration", "pointer");
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("uppercase", "heading-2-feed");
    const bidAmountContainer = document.createElement("div");
    bidAmountContainer.classList.add("text-red");

    titleContainer.innerText = bid.listing.title;
    bidAmountContainer.innerText = bid.amount + " credit";

    bidContainer.append(titleContainer, bidAmountContainer);
    bidsContainer.append(bidContainer);
  });
}
