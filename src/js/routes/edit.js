import { navTemplate } from "../templates/nav.js";
import { load } from "../storage/index.js";
import { publishListing } from "../api/requests/post.js";

let img = 1;
const imageUpload = document.getElementById("imageUpload");
const addImgsBtn = document.getElementById("addImgsBtn");
const profile = load("profile");
const username = profile.name;

export function generateEdit() {
  try {
    navTemplate(username);
    addMoreImages(addImgsBtn);
    publishNewListing();
  } catch (error) {
    console.log(error);
  }
}

function addMoreImages(btn) {
  btn.addEventListener("click", () => {
    img++;
    if (img <= 8) {
      generateImgInputs();
    }
    if (img >= 8) {
      addImgsBtn.innerText = "max amound of images pr. listing";
      addImgsBtn.disabled;
      throw new Error("Max amount of uploaded images is 8.");
    }
  });
}

function generateImgInputs() {
  const imageFields = document.createElement("div");
  imageFields.id = "image";
  imageFields.classList.add("d-flex", "flex-column", "gap-1", "p-1", "bg-grayish-purple");

  const urlInput = document.createElement("input");
  urlInput.classList.add("form-control");
  urlInput.type = "url";
  urlInput.id = "media-uploads";
  urlInput.name = "media";
  urlInput.placeholder = "image url";
  urlInput.required;

  const altInput = document.createElement("input");
  altInput.classList.add("form-control");
  altInput.type = "text";
  altInput.id = "altText";
  altInput.placeholder = "image description";
  altInput.required;
  altInput.maxLength = "120";

  imageFields.append(urlInput, altInput);
  imageUpload.append(imageFields);
}

// async function postNewListing(event) {
//   event.preventDefault();
//   const form = event.target;

//   if (form) {
//     const formData = new FormData(form);
//     const post = Object.fromEntries(formData.entries());
//     post.id = form.name;

//     const requestModule = "../../../api/httpRequests/update.mjs";
//     const { updatePostInAPI } = await import(requestModule);
//     updatePostInAPI(post);
//   }
// }

async function publishNewListing() {
  document.forms.newListing.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const newListing = Object.fromEntries(formData.entries());

    const newListingObj = {
      title: newListing.title,
      description: newListing.description,
      endsAt: newListing.endsAt,
      tags: [],
      media: [
        {
          url: newListing.url,
          alt: newListing.alt,
        },
      ],
    };

    // console.log(newListingObj);

    // const imgUploads = document.querySelectorAll("fieldset");
    // console.log(imgUploads);

    publishListing(newListingObj);

    // const { ...title, description, endsAt, url, } = form.elements;

    // [...form.elements].forEach((item) => {
    //   console.log(item.name);
    // });

    // console.log(formData.entries());

    // sendPostToAPI(post);
  });
}

// export function publish() {
//   document.forms.newListing.addEventListener("submit", publishNewListing);
// }
