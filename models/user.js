const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
      default: "",
    },
    contactNo: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImgUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

function validateUser(body) {
  let schema = Joi.object({
    username: Joi.string()
      .regex(/^[a-zA-Z ]*$/)
      .required(),
    email: Joi.string()
      .email()
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .required(),
    password: Joi.string()
      // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required(),
    contactNo: Joi.string(),
    isAdmin: Joi.boolean(),
    profileImgUrl: Joi.string(),
  });

  return schema.validate(body);
}
function validateLoginType(body) {
  let schema = Joi.object({
    loginType: Joi.string().required(),
  });

  return schema.validate(body);
}
function validateLoginWithEmail(body) {
  let schema = Joi.object({
    email: Joi.string()
      .email()
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .required(),
    password: Joi.string()
      // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required(),
  });

  return schema.validate(body);
}

function validateLoginWithNumber(body) {
  let schema = Joi.object({
    contactNo: Joi.string().required(),
    password: Joi.string()
      // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required(),
  });

  return schema.validate(body);
}

function validateUpdateUser(body) {
  let schema = Joi.object({
    username: Joi.string().regex(/^[a-zA-Z ]*$/),
    email: Joi.string()
      .email()
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
    contactNo: Joi.string(),
    profileImgUrl: Joi.string().optional().min(0),
  });

  return schema.validate(body);
}
module.exports = {
  User,
  validateUser,
  validateLoginType,
  validateLoginWithEmail,
  validateLoginWithNumber,
  validateUpdateUser,
};
