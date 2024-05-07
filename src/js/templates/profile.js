import { listingTemplate } from "./listings.js";
const uxElement = document.getElementById("uxElement");

export function profileTemplate(userProfile) {
  const profileElement = document.createElement("div");
  profileElement.classList.add("user-profile", "text-center", "text-red", "glassmorphism");

  const avatarContainer = document.createElement("div");
  avatarContainer.classList.add("p-4", "d-flex", "justify-content-center");

  const avatar = document.createElement("img");
  avatar.classList.add("img-profile");
  avatar.src = userProfile.avatar.url;
  avatar.alt = userProfile.avatar.alt;

  const username = document.createElement("h1");
  username.classList.add("heading-1", "text-red");
  username.innerText = userProfile.name;

  const email = document.createElement("p");
  email.innerText = userProfile.email;

  const bio = document.createElement("p");
  if (!userProfile.bio) {
    bio.innerText = "Bio:";
  }
  if (userProfile.bio) {
    bio.innerText = "Bio: " + userProfile.bio;
  }

  const credit = document.createElement("p");
  credit.innerText = "Your credits: " + userProfile.credits;

  avatarContainer.append(avatar);
  profileElement.append(avatarContainer, username, email, bio, credit);

  const profileContainer = document.getElementById("profileContainer");
  profileContainer.append(profileElement);
}

export function renderProfileListings(listingsArray, container) {
  if (listingsArray.length === 0 || !listingsArray) {
    uxElement.innerHTML = "";
    throw new Error("You have not posted any listings yet.");
  } else {
    container.innerHTML = "";
    for (let i = 0; i < listingsArray.length; i++) {
      container.append(listingTemplate(listingsArray[i]));
    }
    uxElement.innerHTML = "";
  }
}
