const Joi = require("joi");

const signupSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name should have at least 3 characters",
    "string.max": "Full name should not exceed 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password should be at least 8 characters",
      "string.max": "Password should not exceed 20 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

module.exports = { signupSchema };
