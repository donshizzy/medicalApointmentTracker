const bcrypt = require("bcryptjs");

// function hideppid(ppid) {
//   const newppid = ppid.map((item) => {
//     if (item === "username" || item === "password") {
//       return "***";
//     }
//     return item;
//   });

//   return newppid;
// }
// const ppid = [username, password];

const hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};
const comparepassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error('password does not match');
  }
};



module.exports = {
  hashpassword,
  comparepassword,
};
