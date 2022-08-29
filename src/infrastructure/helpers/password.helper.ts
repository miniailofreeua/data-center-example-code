// eslint-disable-next-line
const bcrypt = require('bcryptjs');

export const hashPassword = async (password) => {
  if (!password) {
    return null;
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};
