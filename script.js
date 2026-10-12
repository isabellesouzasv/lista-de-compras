const initialItems = ["Pão de forma", "Café preto", "Suco de laranja", "Bolacha"];

const form = document.querySelector("#add-item-form");
const input = document.querySelector("#item-input");
const inputError = document.querySelector("#input-error");
const itemsList = document.querySelector("#items-list");
const toast = document.querySelector("#removal-toast");
const closeToastButton = toast.querySelector(".toast__close");
const backLink = document.querySelector(".back-link");

let nextItemId = 1;
let toastTimer;

function trashIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6M4 6h16M18 6l-.8 14H6.8L6 6M10 10v6M14 10v6"></path>
    </svg>
  `;
}

function createItem(name) {
  const itemId = `item-${nextItemId++}`;
  const item = document.createElement("li");
  item.className = "item";

  const label = document.createElement("label");
  label.className = "item__label";
  label.htmlFor = itemId;

  const checkbox = document.createElement("input");
  checkbox.className = "item__checkbox";
  checkbox.id = itemId;
  checkbox.type = "checkbox";

  const itemName = document.createElement("span");
  itemName.className = "item__name";
  itemName.textContent = name;

  const removeButton = document.createElement("button");
  removeButton.className = "remove-button";
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", `Remover ${name}`);
  removeButton.innerHTML = trashIcon();

  label.append(checkbox, itemName);
  item.append(label, removeButton);
  itemsList.append(item);

  checkbox.addEventListener("change", () => {
    item.classList.toggle("item--completed", checkbox.checked);
  });

  removeButton.addEventListener("click", () => {
    item.remove();
    showRemovalToast();
  });
}

function showRemovalToast() {
  window.clearTimeout(toastTimer);
  toast.hidden = false;
  toastTimer = window.setTimeout(hideRemovalToast, 5000);
}

function hideRemovalToast() {
  toast.hidden = true;
  window.clearTimeout(toastTimer);
}

function clearValidation() {
  input.removeAttribute("aria-invalid");
  inputError.textContent = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemName = input.value.trim();

  if (!itemName) {
    input.setAttribute("aria-invalid", "true");
    inputError.textContent = "Digite o nome de um item para adicioná-lo.";
    input.focus();
    return;
  }

  createItem(itemName);
  input.value = "";
  clearValidation();
  input.focus();
});

input.addEventListener("input", clearValidation);
closeToastButton.addEventListener("click", hideRemovalToast);

backLink.addEventListener("click", (event) => {
  event.preventDefault();

  if (window.history.length > 1) {
    window.history.back();
  }
});

initialItems.forEach(createItem);
