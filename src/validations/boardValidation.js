/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      "string.empty": "title is not allowed to be empty(loc-dev)",
      "any.required": "title is required(loc-dev)",
      "string.min": "title length must be at least 3 characters long (loc-dev)",
      "string.max":
        "title length must be less than or equal to 5 characters long (loc-dev)",
      "string.trim":
        "title must not have leading or trailing whitespace (loc-dev)",
    }),
    description: Joi.string()
      .required()
      .min(3)
      .max(256)
      .trim()
      .strict()
      .messages({
        "string.empty": "description is not allowed to be empty(loc-dev)",
        "any.required": "description is required(loc-dev)",
        "string.min":
          "description length must be at least 3 characters long (loc-dev)",
        "string.max":
          "description length must be less than or equal to 5 characters long (loc-dev)",
        "string.trim":
          "description must not have leading or trailing whitespace (loc-dev)",
      }),
  });
  try {
    //set abortEarly:false -> trả về tất cả lỗi khi validation
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    //Validation dữ liệu hợp lệ thì cho đi tiếp
    next();
  } catch (error) {
    console.log(error);
    //mã 422 failed khi lỗi validation
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
