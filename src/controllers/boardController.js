/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";

const createNew = (req, res, next) => {
  try {
    console.log("check req.body", req.body);
    console.log("check req.query", req.query);
    console.log("check req.params", req.params);
    res.status(StatusCodes.CREATED).json({ message: "post from controller" });
  } catch (error) {
    //mã 500 failed khi lỗi validation
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: new Error(error).message,
    });
  }
};

export const boardController = { createNew };
