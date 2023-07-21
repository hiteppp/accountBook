/**
 *
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */

module.exports = function (success, error) {
  const mongoose = require("mongoose");

  //导入配置文件
  const { DBHOST, DBPORT, DBNAME } = require("../config/config");

  //设置 strictQuery 为 true
  mongoose.set("strictQuery", true);

  //3. 连接 mongodb 服务                        数据库的名称
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  mongoose.connection.once("open", () => {
    success();
  });
  // 设置连接错误的回调
  mongoose.connection.on("error", () => {
    error();
  });

  //设置连接关闭的回调
  mongoose.connection.on("close", () => {
    console.log("连接关闭");
  });
};
