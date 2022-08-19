console.log("js file linked.");

const body = document.querySelector("body");
const form = document.createElement("form");
// Array to compare different types of input allowed
const supportedTypes = [
  "text",
  "number",
  "tel",
  "email",
  "password",
  "checkbox",
  "radio",
];

// Function that takes a json object an creates inputs based on the different types available
function formRenderer(jsonData) {
  jsonData.forEach((item) => {
    // Check if types available on json object are supported
    if (supportedTypes.includes(item.type)) {
      const input = document.createElement("input");
      const label = document.createElement("label");
      const brTag = document.createElement("br");
      input.setAttribute("id", item.id);
      input.setAttribute("type", item.type);
      label.innerText = item.label;
      // check json for validations
      if (item.validations) {
        const temp = item.validations;
        temp.forEach((item) => {
          if (item.type === "pattern") {
            console.log(item);
            input.setAttribute(item.type, item.value);
          } else if (item.type === "required") {
            input.required = eval(item.value);
          }
        });
      }
      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(brTag);
    } else if (item.type === "select") {
      // console.log(item);
      const selectTag = document.createElement("select");
      selectTag.setAttribute("id", item.id);
      if (item.options) {
        // console.log(item.options);
        const temp = item.options;
        temp.forEach((item) => {
          const optionTag = document.createElement("option");
          optionTag.innerText = item.label;
          optionTag.setAttribute("value", item.value);
          selectTag.appendChild(optionTag);
          // console.log(item);
        });
      }
      form.appendChild(selectTag);
    }
  });
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
