import { totalPages } from "../../api/requests/get.js";

const nxtBtn = document.getElementById("nxtBtn");
const prvBtn = document.getElementById("prvBtn");

export function updatePagination(currentPage) {
  const totalPagesDisplay = document.getElementById("totalPages");
  const currentPageDisplay = document.getElementById("currentPage");

  totalPagesDisplay.innerText = totalPages;
  currentPageDisplay.innerText = currentPage;

  if (totalPages === 1) {
    nxtBtn.style.display = "none";
    prvBtn.style.display = "none";
  }
  if (totalPages <= 1) {
    nxtBtn.style.display = "block";
    prvBtn.style.display = "block";
  }
}
