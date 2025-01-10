/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

//Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null;
// Khởi tạo một đối tượng mongoClientInstance  để kết nối tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //Lưu ýý:Cái serverApi có phiên bản MongoDB 5.0.0 trở lên,có thể không cần dùng nó,còn nêú dùng nó là chúng ta chỉ định một cái Stable API version của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  //gội kết nối với mongoDB atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();
  //Kết nối thành công thì lấy ra DB theo tên và gán ngược nó lại vào biến trelloDatabaseInstance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

//Đóng kết nối tới Database khi cần
export const CLOSE_DB = async () => {
  console.log("code chay vao cho close nay");
  await mongoClientInstance.close();
};

//function GET_DB (không async) này có nhiệm vụ export ra cái trello Database sau khi đã connect thành công tới mongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code.
//Lưu ý đảm bảo chỉ luôn gọi cái getDB này sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error("Must connect to db first!");
  return trelloDatabaseInstance;
};
