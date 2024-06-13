const isObjetcEmpty = (item) => Object.keys(item).length === 0;
export const isEmpty = (value) => {
  if (!value) return true;
  if (typeof value == "string") {
    return value.length === 0;
  } else if (typeof value === "object") {
    return isObjetcEmpty(value);
  }
};
const isAlphaNumeric = (value) => /^[a-zA-Z0-9]+$/.test(value);
const isCharacter = (value) => /^[a-zA-Z]+$/.test(value);
const isNumber = (value) => /^\d+$/.test(value);
const hasOneWhiteSpace = (str) => /^\S+\s\S+$/.test(str);

const maxLength = 52;

export const removeWhiteSpace = (str) => str.replace(/\s/g, "");

// enquiry form validation

export const validateFullname = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Full Name Can't be empty.";
  } else if (value.length < 3) {
    error = "Full name must be at least 3 characters.";
  } else if (!isCharacter(value)) {
    const removeSpace = value.replace(/\s/g, "");
    if (!isCharacter(removeSpace)) {
      error = "Full name must contain only characters.";
    }
  }
  return error;
};

export const validateFirstname = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "First name is required.";
  } else if (value.length < 3) {
    error = "First name must be at least 3 characters.";
  } else if (value.length > maxLength) {
    error = `First name must be less than ${maxLength} characters.`;
  } else if (!isCharacter(value)) {
    const removeSpace = value.replace(/\s/g, "");
    if (!isCharacter(removeSpace)) {
      error = "First name must contain only characters.";
    }
    // else if (isCharacter(removeSpace) && hasOneWhiteSpace(value)) {
    //   error = undefined;
    // }
  }
  return error;
};

export const validateLastname = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Last name is required.";
  } else if (value.length < 1) {
    error = "Last name must be at least 1 characters.";
  } else if (value.length > maxLength) {
    error = `Last name must be less than ${maxLength} characters.`;
  } else if (!isCharacter(value)) {
    error = "Last name must contain only characters.";
  }
  return error;
};

export const validateWorldPhoneNumber = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Phone number is required.";
  } else if (!/^\+?[0-9]{1,17}$/.test(value)) {
    error = "Invalid format.";
  }
  return error;
};

export const validateIndiaPhoneNumber = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Phone number is required.";
  } else if (!/^\+?[0-9]{1,12}$/.test(value)) {
    error = "Invalid format.";
  }
  return error;
};

export const validatePhoneNumberTurkey = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Phone number is required.";
  } else if (!/^\+90[1-9][0-9]{9}$/.test(value)) {
    error = "Invalid format.";
  }
  return error;
};


export const validatePhoneNumber = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Phone number is required.";
  } else if (!/^\+91[6-9][0-9]{9}$/.test(value)) {
    error = "Invalid format.";
  }
  return error;
};


export const validatePhoneAuth = (value: string, isVerified: boolean) => {
  let error = validatePhoneNumber(value);
  if (!isVerified) {
    error = "Phone number is not verified.";
  }
  return error;
};

export const validateEmailId = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Email Id is required.";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
    error = "Invalid email Id.";
  }
  return error;
};

export const validateOccupation = (value: any) => {
  let error;
  if (isEmpty(value)) {
    error = "Occupation is required.";
  } else if (value.length > maxLength) {
    error = `Occupation must be less than ${maxLength} characters.`;
  }
  return error;
};

export const validateDOB = (value: string) => {
  let error;
  const number = value.replaceAll(/-/g, "");
  if (isEmpty(value)) {
    error = "Date of Birth is required.";
  } else if (!isNumber(number)) {
    error = "Invalid characters.";
  } else if (number.length == 8) {
    try {
      const day = parseInt(number.substring(0, 2));
      const month = parseInt(number.substring(2, 4));
      const year = parseInt(number.substring(number.length - 4));
      const currentYear = new Date().getFullYear();
      if (day > 31 || day < 1) {
        error = "Must be a valid date.";
      } else if (month > 12 || month < 1) {
        error = "Must be a valid month.";
      } else if (year >= currentYear || year < 1) {
        error = "Must be a valid year.";
      }
    } catch (error) {
      error = "Must be a valid date of birth.";
    }
  } else if (value.replaceAll(/-/g, "").length > 9) {
    error = "Must be a valid date of birth.";
  } else if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    error = "Invalid format.";
  }
  return error;
};

export const validatePancard = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Pancard is required.";
  } else if (!isAlphaNumeric(value)) {
    error = "Invalid format.";
  } else if (value.length !== 10) {
    error = "Pancard must be 10 characters.";
  }
  return error;
};


export const validateQuery = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Enter your Query.";
  } else if (value.length < 10) {
    error = "Query must be at least 10 characters.";
  }
  return error;
};

export const validateGender = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Gender is required.";
  }
  return error;
};

export const validateAddress = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Address is required.";
  }
  return error;
};
export const validateCity = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "City is required.";
  }
  return error;
};

export const validateProofOfId = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Proof of Address is required.";
  }
  return error;
};

export const validatePincode = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Pincode is required.";
  } else if (!isAlphaNumeric(value)) {
    error = "Invalid pincode number.";
  } 
  // else if (value.length !== 6) {
  //   error = "Pincode must be 6 characters.";
  // }
  return error;
};

export const validateAadhaar = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Aadhaar number is required";
  } else if (value.length > 12) {
    error = "Aadhaar number must be 12 characters";
  } else if (!/^[1-9]\d{11}$/.test(value.replace(/\s/g, ""))) {
    error = "Invalid Aadhaar number";
  }
  return error;
};
export const validateDrivingLicense = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Driving License is required";
  } else if (value.length > 15) {
    error = "Driving License must be valid";
  } else if (!isAlphaNumeric(value)) {
    error = "Driving License must be characters and numbers";
  }
  return error;
};

export const validatePassportId = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Passport Id is required";
  } else if (value.length > 12) {
    error = "Passport Id must be 12 characters";
  } else if (!/^[A-Z]{1,2}\d{7}$/.test(value)) {
    error = "Invalid Passport ID";
  }
  return error;
};

export const validateVoterId = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Voter Id is required";
  } else if (value.length > 10) {
    error = "Voter Id must be 10 characters.";
  } else if (!/^[A-Z]{3}[0-9]{7}$/.test(value)) {
    error = "Voter ID must be valid.";
  }
  return error;
};
export const validateIdentityNumber = (value: string, categoryId: string) => {
  const input = value.replace(/\s/g, "");
  categoryId = categoryId.toLowerCase();
  if (categoryId === "aadhaar_id") {
    return validateAadhaar(input);
  } else if (categoryId === "voter_id") {
    return validateVoterId(input);
  } else if (categoryId === "passport_id") {
    return validatePassportId(input);
  } else if (categoryId === "driving_license") {
    return validateDrivingLicense(input);
  }
  return undefined;
};

/// Format Input Value
export const formatFirstName = (value) => {
  let filteredTxt = value.replace(/[^a-zA-Z0-9 ]/g, "").trim();

  if (filteredTxt.includes(" ")) {
    const split = filteredTxt.split(" ");
    // Assume First Index will be fname and 2nd space will be middle name
    const fname = split[0];
    const cleanStr = filteredTxt.split(" ").join("");
    return (filteredTxt = fname + " " + cleanStr.replace(fname, ""));
  } else {
    return filteredTxt;
  }
};
export const formatDateOfBirth = (dob: string, pre: string) => {
  const replaceDash = dob.replaceAll(/-/g, "").trim();

  if (replaceDash && !isNumber(replaceDash)) {
    return pre;
  }

  if (/^\d{8}$/.test(dob)) {
    // Date of birth is missing hyphens, add them and format as "dd-MM-yyyy"
    return dob.replace(/(\d{2})(\d{2})(\d{4})/, "$1-$2-$3");
  } else {
    if (dob.length < pre.length) {
      // do not allow to filter when text is removing
      return dob;
    }
    // Date of birth Auto Dash
    const dobList = replaceDash.split("");
    const day = dobList.slice(0, 2).join("");
    const month = dobList.slice(2, 4).join("");
    const year = dobList.slice(4).join("");
    let newDob = dob;

    if (day.length === 2 && month.length === 0) {
      newDob = `${day}-`;
    }
    if (month.length === 2 && year.length === 0) {
      newDob = `${day}-${month}-`;
    }
    return newDob;
  }
};

export const formatPincode = (value: string) => {
  if (isNumber(value)) {
    return value.trim();
  }
};

export const formatIdentityNumber = (
  value: string,
  categoryId: string,
  pre: string
) => {
  const input = value.replace(/\s/g, "").trim();
  console.log("Value: ", value, pre);

  if (value.length < pre.length) {
    return value;
  }

  if (categoryId === "aadhaar_id") {
    if (isNumber(input)) {
      return value;
    } else {
      return "";
    }
  } else {
    return input;
  }
};

export const validateUVEmailId = (value: string) => {
  let error = validateEmailId(value);
  if (error) {
    return error;
  } else if (!value.includes("@ultraviolette.com")) {
    error = "Invalid work email id.";
  }
  return error;
};
export const validateChatBotField = (value: string) => {
  let error;
  if (isEmpty(value)) {
    error = "Input is required.";
  }
  return error;
};