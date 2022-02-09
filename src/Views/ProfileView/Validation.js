export default function validate(label, input) {
  let errors = "";

  switch (label) {
    case "NAME":
      if (!input) {
        errors = "First Name is required";
      } else if (!/^[a-zA-Z]+$/.test(input)) {
        errors = "a valid Name is required, (letters only)";
      }
      break;
    case "LASTNAME":
      if (!input) {
        errors = "Last Name is required";
      } else if (!/^[a-zA-Z]+$/.test(input)) {
        errors = "a valid Last Name is required, (letters only)";
      }
      break;
    case "USERNAME":
      if (!input) {
        errors = "Username is required";
      }
      break;
    case "DNI":
      if (!input) {
        errors = "DNI is required";
      } else if (!/^[0-9a-zA-Z]+$/.test(input)) {
        errors = "A valid DNI is required, (numbers and letters only)";
      }
      break;
    case "EMAIL":
      if (!input) {
        errors = "Email is required";
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(input)
      ) {
        errors = "A valid email is required, ex. example@example.com";
      }
      break;
    case "PHONE":
      if (!input) {
        errors = "Phone number is required";
      } else if (!/^[0-9]*$/.test(input)) {
        errors = "A valid phone number is required, (numbers only)";
      }
      break;
    case "PASSWORD":
      if (!input) {
        errors = "a password is required";
      } else if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(input)
      ) {
        errors =
          "A valid password is required, at least one number, at least one special character, 6-16 characters";
      }
    default:
      break;
  }
  return errors;
}
