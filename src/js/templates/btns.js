export function generateBtn(btnType, link, innerText) {
  const btnLink = document.createElement("a");
  btnLink.setAttribute("href", link);

  const btn = document.createElement("button");

  if (btnType === "editListingBtn" || btnType === "viewListingBtn") {
    btn.classList.add("btn-local", "btn-height-s", "btn-width-100", "btn-white-black", "btn-fontsize-m", "uppercase");
  }
  btn.innerText = innerText;
  btn.id = btnType;

  btnLink.append(btn);
  return btnLink;
}

// const editListingLink = document.createElement("a");
// editListingLink.setAttribute("href", `/edit/index.html?key=${listingID}`);

// const editListingBtn = document.createElement("button");
// editListingBtn.classList.add("btn-local", "btn-height-s", "btn-width-100", "btn-white-black", "btn-fontsize-m", "uppercase");
// editListingBtn.setAttribute("href", "#");
// editListingBtn.innerText = "Edit";
// editListingLink.append(editListingBtn);

// const viewListingLink = document.createElement("a");
// viewListingLink.setAttribute("href", `/listing/index.html?key=${listingID}`);

// const viewListingBtn = document.createElement("button");
// viewListingBtn.classList.add("btn-local", "btn-height-s", "btn-width-100", "btn-white-black", "btn-fontsize-m", "uppercase");
// viewListingBtn.setAttribute("id", "viewListingBtn");
// viewListingBtn.innerText = "View";

// viewListingLink.append(viewListingBtn);
