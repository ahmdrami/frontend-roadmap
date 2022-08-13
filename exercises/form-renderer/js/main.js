console.log("js file linked.");

const body = document.querySelector("body");
const form = document.createElement("form");
// Array to compare different types of input allowed
const supportedTypes = ["text", "number", "tel", "email", "password"];

// Function that takes a json object an creates inputs based on the different types available
function formRenderer(jsonData) {
  jsonData.forEach((item) => {
    // Check if types available on json object are supported
    if (supportedTypes.includes(item.type)) {
      const input = document.createElement("input");
      // console.log(item.type, " is allowed");
      input.setAttribute("id", item.id);
      input.setAttribute("type", item.type);
      form.appendChild(input);
    } else {
      console.log(item.type, " type is not allowed");
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
    // console.log(data);
    formRenderer(data);
  });
