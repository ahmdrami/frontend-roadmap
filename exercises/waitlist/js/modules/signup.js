import NewElement from "./newElement.js";
export default function initSignup() {}

const body = document.body;
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

form.appendChild(nameLabel);
form.appendChild(nameInput);
form.appendChild(emailLabel);
form.appendChild(emailInput);
termsDiv.appendChild(termsCheckbox);
termsDiv.appendChild(termsText);
form.appendChild(termsDiv);
form.appendChild(submitButton);
body.appendChild(form);

const url = "http://localhost:3000/users";
const urlCounter = "http://localhost:3000/waitlistposition";
let emailsArray = [];
let validEmail = true;
const newUser = {};

// TODO
// function saveValues(jsonObj){}

// Fetch data once user click on the form **********
function handleJsonFetch(e) {
  form.removeEventListener("click", handleJsonFetch);
  fetch(url)
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
  emailsArray.forEach((email) => {
    if (email === emailInput.value) {
      emailInput.classList.add("error");
      emailErrorSpan.innerText =
        "Email already in use. Please try a different email.";
      emailInput.after(emailErrorSpan);
      validEmail = false;
    } else {
      emailInput.classList.remove("error");
      emailErrorSpan.innerText = "";
      emailInput.after(emailErrorSpan);
      validEmail = true;
    }
  });
  if (!emailInput.checkValidity() || emailInput.value === null) {
    emailInput.classList.add("error");
    emailErrorSpan.innerText = emailInput.validationMessage;
    emailInput.after(emailErrorSpan);
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

nameInput.addEventListener("change", handleNameInput);
emailInput.addEventListener("change", filterEmail);
termsCheckbox.addEventListener("change", handleCheckBox);
form.addEventListener("click", handleJsonFetch);

function handleClick(event) {
  event.preventDefault();
  if (handleNameInput() && filterEmail() && validEmail) {
    console.log("All good!");
    fetch(urlCounter)
      .then((r) => r.json())
      .then((jsonData) => {
        console.log(jsonData);
        // TODO Save values to newUser OBJ
        // saveValues();
      });
  } else {
    console.log("WTF, try again bruh!");
  }
}

submitButton.addEventListener("click", handleClick);

// teste
