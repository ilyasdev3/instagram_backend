const bcrypt = require("bcryptjs");

const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(pass, salt);
  return hashed;
};

const comaprePass = async (candidatePassword, hashPassword) => {
  const isMatch = bcrypt.compareSync(candidatePassword, hashPassword);
  return isMatch;
};
module.exports = { comaprePass, hashPassword };
