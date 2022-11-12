export default class NewElement {
  constructor(type, text) {
    this.type = type;
    this.text = text || "";
  }

  element() {
    const newHtmlElement = document.createElement(this.type);
    newHtmlElement.innerText = this.text;
    return newHtmlElement;
  }

  static inputElement(inputType, name, id, required) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", inputType);
    inputElement.setAttribute("name", name);
    inputElement.setAttribute("id", id);
    inputElement.setAttribute("required", required || "");
    return inputElement;
  }
}
