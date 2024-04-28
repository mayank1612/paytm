const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(
  "mongodb+srv://admin:Mqs4vR8NKFFJMoRz@cluster0.aj9v9dm.mongodb.net/paytm"
);

// Create a Schema for Users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password_hash: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

// Adding methods to useSchema

// Method to generate a hash from plain text
userSchema.methods.createHash = async function (plainTextPassword) {
  // Hashing user's salt and password with 10 iterations,
  const saltRounds = 10;

  // First method to generate a salt and then create hash
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
};

// Validating the candidate password with stored hash and hash function
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password_hash);
};

// Create a model from the schema
const User = mongoose.model("User", userSchema);

// Accounts

const accountSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  balance: {
    type: Number,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
