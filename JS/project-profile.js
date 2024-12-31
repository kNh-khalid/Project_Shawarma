// Elements from the DOM
const usernameElement = document.getElementById("username");
const nameInput = document.getElementById("Name");
const addressInput = document.getElementById("address");
const notesInput = document.getElementById("notes");
const editButton = document.getElementById("edit-button");
const saveButton = document.getElementById("save-button");

// Variables to hold profile data
let name = "";
let address = "";
let notes = "";

// Load existing data from localStorage
function loadProfileData() {
  name = localStorage.getItem("name") || name;
  address = localStorage.getItem("address") || address;
  notes = localStorage.getItem("notes") || notes;

  // Update the UI
  usernameElement.textContent = `Hi ${name}`;
  nameInput.value = name;
  addressInput.value = address;
  notesInput.value = notes;
}

// Save form data to localStorage
function saveProfileData() {
  name = nameInput.value;
  address = addressInput.value;
  notes = notesInput.value;

  // Save to localStorage
  localStorage.setItem("name", name);
  localStorage.setItem("address", address);
  localStorage.setItem("notes", notes);

  alert("Profile information saved successfully!");
  toggleEditMode(false);

  // Update the greeting
  usernameElement.textContent = `Hi, ${name}`;
}

// Toggle edit mode
function toggleEditMode(enable) {
  const inputs = [nameInput, addressInput, notesInput];
  inputs.forEach(input => input.disabled = !enable);
  saveButton.disabled = !enable;
  editButton.disabled = enable;
}

// Event listener for edit button
editButton.addEventListener("click", () => {
  toggleEditMode(true);
});

// Event listener for save button
saveButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission
  saveProfileData();
});

// Initialize page by loading data
loadProfileData();
