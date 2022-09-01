console.log("js file linked.");

const body = document.querySelector("body");
const form = document.createElement("form");
const container = document.createElement("div");
const formTitle = document.createElement("h2");
formTitle.innerText = "Sign up form";
container.classList.add("container");
const submit = document.createElement("input");
submit.setAttribute("type", "submit");
submit.setAttribute("id", "submit");
// Array to compare different types of input allowed
// todo: supportedTypes array is missing textarea, select, radio and checkbox
const supportedTypes = ["text", "number", "tel", "email", "password"];
const formURL =
  "http://127.0.0.1:5500/frontend-roadmap/exercises/form-renderer/";

// Function that takes a json object an creates inputs based on the different types available
function formRenderer(jsonData) {
  form.appendChild(formTitle);
  jsonData.forEach((item) => {
    const label = document.createElement("label");
    const div = document.createElement("div");
    // handles different inputs *****************
    if (supportedTypes.includes(item.type)) {
      // todo:
      // this part of the code is repeated on line 72 and line 93 
      // how can you make it reusable? 
      const input = document.createElement("input");
      input.setAttribute("id", item.id);
      input.setAttribute("type", item.type);
      input.setAttribute("name", item.name);
      label.innerText = item.label;
      label.setAttribute("for", item.id);
      // todo:
      // this part of the code is repeated on line 105 as well
      // how can you make it reusable? 
      // check json for validations
      if (item.validations) {
        const temp = item.validations;
        temp.forEach((item) => {
          if (item.type === "pattern") {
            // console.log(item);
            input.setAttribute(item.type, item.value);
          } else if (item.type === "required") {
            input.required = !!item.value;
          }
        });
      }

      div.appendChild(label);
      div.appendChild(input);
      form.appendChild(div);
      // Handles select tags *************************
    } else if (item.type === "select") {
      // console.log(item);
      const selectTag = document.createElement("select");
      selectTag.setAttribute("id", item.id);
      selectTag.setAttribute("name", item.name);
      if (item.options) {
        // console.log(item.options);
        const temp = item.options;
        temp.forEach((item) => {
          const optionTag = document.createElement("option");
          optionTag.innerText = item.label;
          optionTag.setAttribute("value", item.value);
          selectTag.appendChild(optionTag);
        });
      }
      label.innerText = item.label;
      div.appendChild(label);
      div.appendChild(selectTag);
      form.appendChild(div);
      // Handles textarea tags **************************
    } else if (item.type === "textarea") {
      // console.log("I am textarea");
      const textarea = document.createElement("textarea");
      textarea.setAttribute("id", item.id);
      textarea.setAttribute("name", item.name);
      textarea.setAttribute("rows", item.rows);
      textarea.setAttribute("cols", item.cols);
      label.innerText = item.label;
      label.setAttribute("for", item.id);

      div.appendChild(label);
      div.appendChild(textarea);
      form.appendChild(div);
      // Handles radios and checkboxes tags **************************
    } else if (item.type === "radio" || item.type === "checkbox") {
      const itemType = item.type;
      label.innerText = item.label;
      div.appendChild(label);
      // console.log("I am radio");
      if (item.options) {
        const options = item.options;
        options.forEach((option) => {
          const input = document.createElement("input");
          const labelOption = document.createElement("label");
          input.setAttribute("type", itemType);
          input.setAttribute("id", option.id);
          input.setAttribute("name", option.name);
          input.setAttribute("name", option.name);
          input.setAttribute("value", option.value);
          labelOption.innerText = option.label;
          label.setAttribute("for", option.id);
          if (item.validations) {
            const temp = item.validations;
            temp.forEach((item) => {
              if (item.type === "pattern") {
                input.setAttribute(item.type, item.value);
              } else if (item.type === "required") {
                input.required = !!item.value;
              }
            });
          }

          div.appendChild(input);
          div.appendChild(labelOption);
          form.appendChild(div);
        });
      }
    }
  });

  form.appendChild(submit);
  container.appendChild(form);
  body.appendChild(container);
}

// todo:
// what happens when this fetch call fails? You are not catching the error.
// Would be nicer to show the feedback of the error to the end user.
//  Fetch external .json file and converts into js objetc (I am still leraning more about asynchronous javascript)
const jsonObj = fetch("./form.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    formRenderer(data);
    displayResults(data);
  });

// Display data on webpage
function displayResults(dataArray) {
  const resultsDiv = document.createElement("div");
  const resultsTitle = document.createElement("h2");
  resultsTitle.innerText = "Confirm your details:";
  resultsDiv.setAttribute("id", "results");
  resultsDiv.classList.add("results-div");

  // this is a good way of handling search params
  new URLSearchParams(window.location.search).forEach((value, name) => {
    // Compare URL names with input name to display each label on the webpage accordingly
    dataArray.forEach((element) => {
      if (name === element.name) {
        // console.log(element.label);

        const text = document.createElement("p");
        text.innerText = `${element.label} ${value}`;
        resultsDiv.appendChild(text);
      }
    });
    resultsDiv.insertBefore(resultsTitle, resultsDiv.firstChild);
  });

  container.appendChild(resultsDiv);
  // Remove parameters from URL, refreshing the page to its original state
  window.history.pushState({}, "", formURL);
}

submit.addEventListener("click", displayResults);
