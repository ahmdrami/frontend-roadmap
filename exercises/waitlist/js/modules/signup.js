import NewElement from "./newElement.js";
export default function initSignup() {}

const body = document.body;
const h1 = document.querySelector("h1");
const messageH4 = new NewElement("h4", "Join our Waitlist!").element();
const form = new NewElement("form").element();
const nameLabel = new NewElement("label", "What is your name?").element();
const nameInput = NewElement.inputElement("text", "name", "name", "required");
nameInput.setAttribute("pattern", "^[A-Za-z\\s]*$");
const emailLabel = new NewElement("label", "What is your email?").element();
const emailInput = NewElement.inputElement(
  "email",
  "email",
  "email",
  "required",
);
const termsCheckbox = NewElement.inputElement(
  "checkbox",
  "terms",
  "terms",
  "required",
);

const termsText = new NewElement(
  "span",
  "By checking this box you accept our terms and conditions.",
).element();
const termsDiv = new NewElement("div").element();
const nameErrorSpan = new NewElement("span").element();
const emailErrorSpan = new NewElement("span", "Required").element();
const checkBoxErrorSpan = new NewElement("span", "Required").element();
const submitButton = NewElement.inputElement("submit", "submit", "submit", "");
submitButton.setAttribute("disabled", "");

h1.appendChild(messageH4);
form.appendChild(nameLabel);
form.appendChild(nameInput);
form.appendChild(emailLabel);
form.appendChild(emailInput);
termsDiv.appendChild(termsCheckbox);
termsDiv.appendChild(termsText);
form.appendChild(termsDiv);
form.appendChild(submitButton);

body.appendChild(form);

const usersUrl = "http://localhost:3000/users";
const counterUrl = "http://localhost:3000/waitlistposition";
let emailsArray = [];
let validEmail = true;
const newUser = {};

function getLocalStorageData() {
  const properties = Object.keys(localStorage);
  if (properties.length) {
    messageH4.innerText = `${localStorage["name"]} you have already signed up! Your position on the wailist is ${localStorage["position"]}`;
    h1.appendChild(messageH4);
  }
}

// Fetch data once user click on the form **********
function handleJsonFetch(e) {
  getLocalStorageData();
  form.removeEventListener("click", handleJsonFetch);
  fetch(usersUrl)
    .then((r) => r.json())
    .then((jsonData) => {
      emailsArray = jsonData.map((item) => item.email);
      // console.log(emailsArray);
    });
}

// Name Validation ************
function handleNameInput() {
  if (!nameInput.checkValidity()) {
    nameInput.classList.add("error");
    nameErrorSpan.innerText = nameInput.validationMessage;
    nameInput.after(nameErrorSpan);
  } else {
    nameInput.classList.remove("error");
    nameErrorSpan.innerText = "";
    nameInput.after(nameErrorSpan);
  }
  return nameInput.checkValidity();
}

// Validate and check if Email has already been used ***********
function filterEmail() {
  if (emailsArray.includes(emailInput.value)) {
    emailInput.classList.add("error");
    emailErrorSpan.innerText =
      "Email already in use. Please try a different email.";
    emailInput.after(emailErrorSpan);
    validEmail = false;
  } else if (!emailInput.checkValidity() || emailInput.value === null) {
    emailInput.classList.add("error");
    emailErrorSpan.innerText = emailInput.validationMessage;
    emailInput.after(emailErrorSpan);
  } else {
    emailInput.classList.remove("error");
    emailErrorSpan.innerText = "";
    emailInput.after(emailErrorSpan);
    validEmail = true;
  }

  return emailInput.checkValidity();
}

// Terms and condition validation (enable/disable submitButton depending on whether it is checked or not) *********
function handleCheckBox(event) {
  if (event.target.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
// Save user obj locally after submitting
function saveValues(json) {
  localStorage["id"] = json.counter + 1;
  localStorage[nameInput.name] = nameInput.value;
  localStorage[emailInput.name] = emailInput.value;
  localStorage["position"] = json.counter + 1;

  newUser["id"] = json.counter + 1;
  newUser[nameInput.name] = nameInput.value;
  newUser[emailInput.name] = emailInput.value;
  newUser["position"] = json.counter + 1;
}

function updateWaitlistCounter(json) {
  const newCounter = {
    counter: json.counter + 1,
  };
  fetch(counterUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCounter),
  });
}

function postNewUser() {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
}

function postSuccessful() {
  window.alert(
    `${newUser.name} all good! Your position number is ${newUser.position}`,
  );
  document, location.reload(true);
}

function handleClick(event) {
  event.preventDefault();
  if (handleNameInput() && filterEmail() && validEmail) {
    console.log("All good!");
    fetch(counterUrl)
      .then((r) => r.json())
      .then((jsonData) => {
        saveValues(jsonData);
        console.log(newUser);
        updateWaitlistCounter(jsonData);
        postNewUser();
        postSuccessful();
      });
  } else {
    checkBoxErrorSpan.innerText =
      "Please, make sure all fields are filled correctly.";
    termsDiv.appendChild(checkBoxErrorSpan);
    console.log("WTF, try again bruh!");
  }
}

nameInput.addEventListener("change", handleNameInput);
emailInput.addEventListener("change", filterEmail);
termsCheckbox.addEventListener("change", handleCheckBox);
form.addEventListener("click", handleJsonFetch);
submitButton.addEventListener("click", handleClick);

// teste
