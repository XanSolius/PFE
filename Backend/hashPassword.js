const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds (higher = more secure but slower)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Example usage
const plaintextPassword = 'admin123'; // Replace with the password you want to hash
hashPassword(plaintextPassword).then((hashedPassword) => {
  console.log('Hashed Password:', hashedPassword);
});