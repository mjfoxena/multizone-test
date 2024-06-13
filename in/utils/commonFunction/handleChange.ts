export const handleChange = (value, setValue, type) => {
  let regex, error;
  if (type === "email") {
    regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    error = regex.test(value) ? "" : "Invalid Email.";
  }
  if (type === "fullName") {
    regex = /^[a-zA-Z ]{2,40}$/;
    error = regex.test(value) ? "" : "Invalid Full Name.";
  }
  if (type === "phone") {
    regex = /^[+]?([0-9]{13})$/;
    error =
      regex.test(value) && value.length === 13 ? "" : "Invalid Phone Number.";
  }
  if (type === "age") {
    error =
      value <= 99 && value >= 1 && value.length !== 0 ? "" : "Invalid age.";
    value = value.replace(/^0+|[^0-9]/g, "");
  }
  if (type === "gender") {
    regex = /^[A-Za-z]+$/;
    error =
      regex.test(value) && value.length > 0
        ? ""
        : "This field is required. Enter valid gender.";
  }
  if (type === "country") {
    error =
      value.length !== 0
        ? ""
        : "This field is required. Enter valid country name.";
  }
  if (type === "state") {
    error =
      value.length > 0 ? "" : "This field is required. Enter valid state name.";
  }
  if (type === "pincode") {
    error =
      value.length !== 0 ? "" : "This field is required. Enter Valid Pincode.";
  }
  if (type === "phone") {
    const regEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const regPhone = /^[0-9]{10}$/;
    error =
      regEmail.test(value) || (regPhone.test(value) && value.length > 0)
        ? ""
        : "Invalid phone/email.";
  }

  setValue({ value, error });
};
