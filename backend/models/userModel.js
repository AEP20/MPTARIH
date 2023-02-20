const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  solvedQuestions: {
    type: Array,
    default: [],
  },
  solvedThemas: {
    type: [Number],
    default: [0, 0, 0, 0] // default value for the solvedThemas array
  },
  favoriteQuestions: {
    type: Array,
    default: [],
    },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    console.log("empty email or password");
    throw Error("Lütfen email ve şifre giriniz");
  }

  if (!validator.isEmail(email)) {
    console.log("invalid email");
    throw Error("Email geçerli bir email değil");
  }

  if (password.length < 6) {
    console.log("password too short");
    throw Error("Şifre en az 6 karakter olmalıdır");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    console.log("email already exists");
    throw Error("Bu email zaten kayıtlı");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Lütfen email ve şifre giriniz");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email geçerli bir email değil");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email veya şifre hatalı");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Email veya şifre hatalı");
  }
  console.log("user logged in");
  return user;
};

module.exports = mongoose.model("User", userSchema);
