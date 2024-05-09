export function generateBtn(btnType, innerText, link) {
  const btn = document.createElement("button");
  btn.innerText = innerText;
  btn.id = btnType;
  btn.classList.add("btn-local", "btn-height-s", "w-100");

  if (btnType === "editListingBtn" || btnType === "viewListingBtn") {
    const btnLink = document.createElement("a");
    btnLink.setAttribute("href", link);
    btn.classList.add("btn-white-black", "btn-fontsize-m", "uppercase");
    btnLink.append(btn);
    return btnLink;
  }
  if (btnType === "saveBtn" || btnType === "backBtn") {
    btn.classList.add("d-flex", "align-items-center", "justify-content-center", "btn-fontsize-l", "lowercase");
  }
  if (btnType === "saveBtn") {
    btn.classList.add("btn-orange");
    btn.type = "submit";
    return btn;
  }
  if (btnType === "backBtn") {
    btn.classList.add("btn-purple");
    btn.type = "button";
    return btn;
  }
}
