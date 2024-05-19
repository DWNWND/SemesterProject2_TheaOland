import { totalPages } from "../../api/requests/get.js";

/**
 * The function updated the total page displayed
 */
export function updateTotalPageDisplay() {
  const totalPagesDisplay = document.getElementById("totalPages");
  totalPagesDisplay.innerText = totalPages;
}

/**
 * The function updated the current page displayed
 */
export function updateCurrentPageDisplay(currentPage) {
  const currentPageDisplay = document.getElementById("currentPage");
  currentPageDisplay.innerText = currentPage;
}

/**
 * The function updates which of the next and previous page buttons should be displayed.
 */
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
