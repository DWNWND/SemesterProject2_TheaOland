/**
 * The function generates update profile form fields.
 *
 * @param {string} id The input id
 * @param {string} element The type of element to create
 * @param {string} type The value of the type attribute
 * @param {string} name The name of the element
 * @param {string} data The data that populates the value of the inputs
 *
 * @returns {string} a "div" HTML element
 */
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
  return fieldContainer;
}
