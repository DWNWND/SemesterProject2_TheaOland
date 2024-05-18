export function generateBtn(btnType, innerText, link) {
  const btn = document.createElement("button");
  btn.innerText = innerText;
  btn.id = btnType;
  btn.classList.add("btn-local", "btn-height-s", "w-100", "d-flex", "align-items-center", "justify-content-center");

  if (btnType === "editListingBtn" || btnType === "viewListingBtn") {
    const btnLink = document.createElement("a");
    btnLink.setAttribute("href", link);
    btnLink.classList.add("text-decoration-none");
    btn.classList.add("btn-white-black", "text-uppercase");
    btn.type = "button";
    btnLink.append(btn);
    return btnLink;
  }
  if (btnType === "saveBtn" || btnType === "backBtn") {
    btn.classList.add("text-lowercase");
    btn.type = "button";
  }
  if (btnType === "saveBtn") {
    btn.classList.add("btn-purple");
    btn.type = "submit";
    return btn;
  }
  if (btnType === "backBtn") {
    btn.classList.add("btn-purple");
    btn.type = "button";
    return btn;
  }
}
