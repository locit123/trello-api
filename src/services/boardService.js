/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";

const createNew = async (reqBody) => {
  try {
    //xử lý logic dữ liêu tùy đặc thù dự án
    const newBoard = { ...reqBody, slug: slugify(reqBody.title), title: "" };
    //Gọi tới Model để xử lí dữ liệu bản ghi vào trong Database
    const createdBoard = await boardModel.createNew(newBoard);
    //Lấy bản ghi board sau khi gọi (tùy mục đích dự án mà cần bước này hay không)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    //Làm thêm các xử lí logic khác với các Collection khác tùy đặc thù dự án ... vv
    //Bắn Email,Notification về cho admin khi có 1 cái board mới được tạo ...vv

    //Trả kết quả về trong Service luôn phải có return
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = { createNew };
