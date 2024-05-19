export function generateUpdateProfileFormFields(id, element, type, name, data) {
  const fieldContainer = document.createElement("div");
  fieldContainer.classList.add("form-floating", "mb-3", "w-100");

  const input = document.createElement(element);
  input.id = id;
  input.setAttribute("name", name);
  input.classList.add("form-control");
  input.required;
  input.value = data;

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.classList.add("edit-profile-form-labels", "text-uppercase", "semi-bold", "text-grayish-purple");
  label.innerText = id;

  // if (name !== "bio") {
  //   input.type = type;
  // }
  if (name === "bio") {
    const helpBlock = document.createElement("div");
    helpBlock.id = "imageTextHelpBlock";
    helpBlock.classList.add("form-text", "mb-3");
    helpBlock.innerText = "Add a personal bio.";
    fieldContainer.append(input, label, helpBlock);
  }

  if (name === "url") {
    input.type = type;
    const helpBlock = document.createElement("div");
    helpBlock.id = "imageTextHelpBlock";
    helpBlock.classList.add("form-text", "mb-3");
    helpBlock.innerText = "Your avatar image has to be a valid url.";
    fieldContainer.append(input, label, helpBlock);
  }
  if (name !== "alt") {
    label.innerText = id;
  }
  if (name === "alt") {
    label.innerText = "captions";
    const helpBlock = document.createElement("div");
    helpBlock.id = "imageTextHelpBlock";
    helpBlock.classList.add("form-text", "mb-3");
    helpBlock.innerText = "Add image captions to your avatar image.";
    fieldContainer.append(input, label, helpBlock);
  }
  // fieldContainer.append(input, label);
  return fieldContainer;
}

// }
// if (name === "name") {
