console.log("js file linked.");

const body = document.querySelector("body");
const form = document.createElement("form");
const submit = document.createElement("input");
submit.setAttribute("type", "submit");
submit.setAttribute("id", "submit");
// Array to compare different types of input allowed
const supportedTypes = ["text", "number", "tel", "email", "password"];

// Function that takes a json object an creates inputs based on the different types available
function formRenderer(jsonData) {
  jsonData.forEach((item) => {
    const label = document.createElement("label");
    const div = document.createElement("div");
    // handles different inputs *****************
    if (supportedTypes.includes(item.type)) {
      const input = document.createElement("input");
      input.setAttribute("id", item.id);
      input.setAttribute("type", item.type);
      input.setAttribute("name", item.name);
      label.innerText = item.label;
      label.setAttribute("for", item.id);
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
      label.innerHTML = item.label;
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
      // console.log("I am radio");
      if (item.options) {
        const options = item.options;
        options.forEach((option) => {
          const input = document.createElement("input");
          const label = document.createElement("label");
          input.setAttribute("type", itemType);
          input.setAttribute("id", option.id);
          input.setAttribute("name", option.name);
          input.setAttribute("name", option.name);
          input.setAttribute("value", option.value);
          label.innerText = option.label;
          label.setAttribute("for", option.id);
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
          div.appendChild(input);
          div.appendChild(label);
          form.appendChild(div);
        });
      }
    }
  });
  form.appendChild(submit);
  body.appendChild(form);
}

//  Fetch external .json file and converts into js objetc (I am still leraning more about asynchronous javascript)
const jsonObj = fetch("./form.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    formRenderer(data);
  });
