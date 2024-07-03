let config = {
    full_name: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  username: {
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    required: true,
    email: true,
    minLength: 5,
    maxLength: 50,
  },
  phone_number: {
    minLength: 9,
    maxLength: 13,
  },
  zip_code:{
    required: false,
    defaultLength: 5
  },
  password: {
    required: true,
    minLength: 7,
    maxLength: 25,
    matching: "repeat_password",
  },
  repeat_password: {
    required: true,
    minLength: 7,
    maxLength: 25,
    matching: "password",
  },
};

let validator = new Validator(config);