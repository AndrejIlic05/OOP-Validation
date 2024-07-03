class Validator {
  constructor(config) {
    this.elementsConfig = config;
    this.errors = {};

    this.generateErrorsObject();
    this.inputListener();
  }

  generateErrorsObject() {
    for (let field in this.elementsConfig) {
      this.errors[field] = [];
    }
  }

  inputListener() {
    let inputSelector = this.elementsConfig;

    for (let field in inputSelector) {
      let el = document.querySelector(`input[name="${field}"]`);

      el.addEventListener("input", this.validate.bind(this));
    }
  }

  validate(e) {
    let elFields = this.elementsConfig;

    let field = e.target;
    let fieldName = field.getAttribute("name");
    let fieldValue = field.value;

    this.errors[fieldName] = [];

    if (elFields[fieldName].required) {
      if (fieldValue === "") {
        this.errors[fieldName].push("The field is empty");
      }
    }

    if (elFields[fieldName].email) {
      if (!this.validateEmail(fieldValue)) {
        this.errors[fieldName].push("Invalid email address");
      }
    }

    if (fieldValue.length < elFields[fieldName].minLength || fieldValue.length > elFields[fieldName].maxLength) {
      this.errors[fieldName].push(`The field must be ${elFields[fieldName].minLength} - ${elFields[fieldName].maxLength} characters`);
    }

    if(fieldValue.length < elFields[fieldName].defaultLength || fieldValue.length > elFields[fieldName].defaultLength){
        this.errors[fieldName].push(`The field must contain ${elFields[fieldName].defaultLength} characters`);
    }

    if (fieldName === 'zip_code' && !Number.isInteger(Number(fieldValue))) {
        this.errors[fieldName].push("The field must be an number");
    }    

    if (elFields[fieldName].matching) {
      let matchingEl = document.querySelector(
        `input[name="${elFields[fieldName].matching}"]`
      );

      if (fieldValue !== matchingEl.value) {
        this.errors[fieldName].push("Passwords do not match");
      }

      if (this.errors[fieldName].length === 0) {
        this.errors[fieldName] = [];
        this.errors[elFields[fieldName].matching] = [];
      }
    }

    this.populateErrors(this.errors);
  }

  populateErrors(errors) {
    for (const elem of document.querySelectorAll("ul")) {
      elem.remove();
    }

    for (let key of Object.keys(errors)) {
      let parentElement = document.querySelector(
        `input[name="${key}"]`
      ).parentElement;
      let errorsElement = document.createElement("ul");
      parentElement.appendChild(errorsElement);

      errors[key].forEach((error) => {
        let li = document.createElement("li");
        li.innerText = error;

        errorsElement.appendChild(li);
      });
    }
  }

  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
}
