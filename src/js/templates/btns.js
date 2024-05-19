/**
 * The function generates a "button" element based on the btnType param, with the details passed into the function.
 * 
 * @param {string} btnType The type of button, either: "editListingBtn", "viewListingBtn", "saveBtn", "backBtn" or "userListings"
 * @param {string} innerText The inner text of the button
 * @param {string} link A link if the button is for navigating to a new url

 * @returns {string} Returns a "button" or a "a" elemement
 */

export function generateBtn(btnType, innerText, link) {
  const btn = document.createElement("button");
  btn.innerText = innerText;
  btn.id = btnType;
  btn.classList.add("btn-local", "d-flex", "align-items-center", "justify-content-center");

  if (btnType === "editListingBtn" || btnType === "viewListingBtn") {
    const btnLink = document.createElement("a");
    btnLink.setAttribute("href", link);
    btnLink.classList.add("text-decoration-none");
    btn.classList.add("btn-white-black", "w-100", "text-uppercase", "btn-height-s");
    btn.type = "button";
    btnLink.append(btn);
    return btnLink;
  }
  if (btnType === "saveBtn" || btnType === "backBtn") {
    btn.classList.add("text-lowercase", "w-100", "btn-height-s");
    btn.type = "button";
  }
  if (btnType === "saveBtn") {
    btn.classList.add("btn-purple", "w-100", "btn-height-s");
    btn.type = "submit";
    return btn;
  }
  if (btnType === "backBtn") {
    btn.classList.add("btn-purple", "w-100", "btn-height-s");
    btn.type = "button";
    return btn;
  }
  if (btnType === "userListings") {
    const btnLink = document.createElement("a");
    btnLink.setAttribute("href", link);
    btnLink.classList.add("text-decoration-none", "mt-4", "align-items-center", "justify-content-center", "d-flex");
    btn.type = "button";
    btn.classList.add("btn-red", "btn-width-l", "btn-height-l", "text-uppercase", "extra-bold");
    btnLink.append(btn);
    return btnLink;
  }
}
