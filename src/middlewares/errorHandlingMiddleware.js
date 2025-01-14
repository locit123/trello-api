/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  //Tạo ra một biến responseError để kiểm soát những gì muốn trả  về
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], //Nếu không có mã lỗi message thì lấy INTERNAL_SERVER_ERROR
    stack: err.stack,
  };
  //Chỉ khi một môi trường dev thì mới trả về Stack Trace để debug dễ dàng hơn ,Còn không thì xóa đi.()
  // console.log("env.BUILD_MODE:", env.BUILD_MODE);
  if (env.BUILD_MODE !== "dev") delete responseError.stack;
  //Đoạn này có thể mở rộng nhiều về sau như ghi Error Log vào file ,Bắn thông báo lỗi vào group Slack,Telegram,Email,... Hoặc có thể viết riêng Code ra một file Middleware khác tùy dự án

  //Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(responseError);
};
