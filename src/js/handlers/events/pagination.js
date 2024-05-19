import { totalPages } from "../../api/requests/get.js";

export function updateTotalPageDisplay() {
  const totalPagesDisplay = document.getElementById("totalPages");
  totalPagesDisplay.innerText = totalPages;
}

export function updateCurrentPageDisplay(currentPage) {
  const currentPageDisplay = document.getElementById("currentPage");
  currentPageDisplay.innerText = currentPage;
}

export function updatePaginationBtns(nxtbtn, prvbtn, currentPage) {
  const totalPagesDisplay = document.getElementById("totalPages");
  const updatedTotalPages = parseInt(totalPagesDisplay.innerText);

  if ((currentPage === updatedTotalPages && updatedTotalPages <= 1) || updatedTotalPages <= 1) {
    nxtbtn.style.display = "none";
    prvbtn.style.display = "none";
  }
  if (currentPage === updatedTotalPages && updatedTotalPages >= 2) {
    nxtbtn.style.display = "none";
    prvbtn.style.display = "flex";
  }
  if (currentPage < updatedTotalPages && currentPage > 1 && updatedTotalPages > 1) {
    nxtbtn.style.display = "flex";
    prvbtn.style.display = "flex";
  }
  if (currentPage <= 1 && updatedTotalPages >= 2) {
    nxtbtn.style.display = "flex";
    prvbtn.style.display = "none";
  }
}
