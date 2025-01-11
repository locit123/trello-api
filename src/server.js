/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
const START_SERVER = () => {
  const app = express();
  //Enable req.body json data
  app.use(express.json());

  //Use APIs V1
  app.use("/v1", APIs_V1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3.Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  //thực hiện các tác vụ cleanup trước khi đóng server
  exitHook(() => {
    console.log("4.Disconnecting from MongoDB Cloud Atlas...");
    CLOSE_DB();
    console.log("5.Disconnected from MongoDB Cloud Atlas");
  });
};

//IIFE ->Immediately Invoked Function Expression  ->là một hàm ẩn danh -> chạy ngay sau khi được định nghĩa
(async () => {
  try {
    console.log("1.Connecting to MongoDB Cloud Atlas");
    await CONNECT_DB();
    console.log("2.Connected to MongoDB Cloud Atlas");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

//Chỉ khi kết nối tới DB thành công thì mới Start Server backend lên.
// CONNECT_DB()
//   .then(() => console.log("Connected to MongoDB Cloud Atlas"))
//   .then(() => START_SERVER())
//   .catch((err) => {
//     console.error(err);
//     process.exit(0);
//   });
