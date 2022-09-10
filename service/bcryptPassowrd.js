const bcrypt = require("bcryptjs");

const hashPassword = async (unHash_password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(unHash_password, salt);
  return hashedPassword;
};

const validatePassword = async (unHash_password, hashed_password) => {
  const validation_result = await bcrypt.compare(
    unHash_password,
    hashed_password
  );
  return validation_result;
};

module.exports = { hashPassword, validatePassword };
