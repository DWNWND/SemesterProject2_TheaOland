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

  console.log("the OG:", currentPage, totalPages);

  if (totalPages > 1 || (totalPages > 1 && currentPage > 1)) {
    console.log(currentPage);
    console.log(totalPages);
    nxtBtn.style.display = "block";
    prvBtn.style.display = "block";
  }
  if (totalPages === 1 || (currentPage === 1 && totalPages === 1)) {
    console.log(currentPage);
    console.log(totalPages);

    nxtBtn.style.display = "none";
    prvBtn.style.display = "none";
  }
  if (currentPage === 1) {
    console.log(currentPage);
    console.log(totalPages);

    prvBtn.style.display = "none";
  }
  if (currentPage !== 1 && totalPages !== 1 && currentPage === totalPages) {
    console.log(currentPage);
    console.log(totalPages);

    nxtBtn.style.display = "none";
  }
}
