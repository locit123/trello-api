/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRouter } from "~/routes/v1/boardRouters";
const Router = express.Router();
//check APIs v1/status
Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Api V1 are ready to use" });
});
//Board APIs
Router.use("/boards", boardRouter);

export const APIs_V1 = Router;
