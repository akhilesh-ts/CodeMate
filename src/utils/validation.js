const validateEditField = (userInput) => {
  const allowedFieldsToEdit = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const invalidFields = Object.keys(userInput).filter(
    (fields) => !allowedFieldsToEdit.includes(fields)
  )
  
  if (invalidFields.length > 0) {
    throw new Error(`you cannot edit this fields ${invalidFields} `);
  }
  return true;
};

module.exports = {
  validateEditField,
};
