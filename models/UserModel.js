//创建模型文件
const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//6. 创建模型对象  对文档操作的封装对象    mongoose 会使用集合名称的复数, 创建集合
let UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
