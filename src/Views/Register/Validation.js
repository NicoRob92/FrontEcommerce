export default function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = "Username is required";
  }

  if (!input.first_name) {
    errors.first_name = "First Name is required";
  } else if (!/^[a-zA-Z]+$/.test(input.first_name)) {
    errors.first_name = "a valid Last Name is required, just letters";
  }

  if (!input.last_name) {
    errors.last_name = "Last Name is required";
  } else if (!/^[a-zA-Z]+$/.test(input.last_name)) {
    errors.last_name = "a valid Last Name is required, (letters only)";
  }

  if (!input.email) {
    errors.email = "Email is required";
  } else if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(input.email)
  ) {
    errors.email = "A valid email is required, ex. example@example.com";
  }

  if (!input.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9]*$/.test(input.phone)) {
    errors.phone = "A valid phone number is required, (numbers only)";
  }

  if (!input.dni) {
    errors.dni = "DNI is required";
  } else if (!/^[0-9a-zA-Z]+$/.test(input.dni)) {
    errors.dni = "A valid DNI is required, (numbers and letters only)";
  }

  if (!input.password) {
    errors.username = "a password is required";
  } else if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      input.password
    )
  ) {
    errors.password =
      "A valid password is required, at least one number, at least one special character, 6-16 characters";
  }

  if (!input.country) {
    errors.country = "Please select a country";
  }

  return errors;
}
