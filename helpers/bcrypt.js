const bcrypt = require('bcryptjs');

const hashPwd = (password) => bcrypt.hashSync(password);

const checkPwd = (password, hashPwd) => bcrypt.compareSync(password, hashPwd);

module.exports = {
  hashPwd,
  checkPwd,
};
