import { totalPages } from "../../api/requests/get.js";

export function updatePagination(currentPage) {
  const totalPagesDisplay = document.getElementById("totalPages");
  const currentPageDisplay = document.getElementById("currentPage");

  totalPagesDisplay.innerText = totalPages;
  currentPageDisplay.innerText = currentPage;
}

export function checkNavPagesBtns(currentPage) {
  const nxtBtn = document.getElementById("nxtBtn");
  const prvBtn = document.getElementById("prvBtn");

  if (totalPages > 1 && currentPage !== totalPages && currentPage !== 1) {
    nxtBtn.style.display = "block";
    prvBtn.style.display = "block";
  }
  if (totalPages <= 1 && currentPage <= 1) {
    nxtBtn.style.display = "none";
    prvBtn.style.display = "none";
  }
  if (currentPage === 1 && totalPages > 1) {
    prvBtn.style.display = "none";
  }
  if (currentPage < 1 && totalPages > 1) {
    prvBtn.style.display = "block";
  }
  if (currentPage === totalPages) {
    nxtBtn.style.display = "none";
  }
}
