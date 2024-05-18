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

  if (name !== "bio") {
    input.type = type;
  }
  if (name !== "alt") {
    label.innerText = id;
  }
  if (name === "alt") {
    label.innerText = "image description";
  }
  if (name === "name") {
    const usernameHelpBlock = document.createElement("div");
    usernameHelpBlock.id = "usernameHelpBlock";
    usernameHelpBlock.classList.add("form-text", "mb-3");
    usernameHelpBlock.innerText = "The username must not contain punctuation symbols apart from underscore (_).";
    fieldContainer.append(input, label, usernameHelpBlock);
  } else {
    fieldContainer.append(input, label);
  }
  return fieldContainer;
}
