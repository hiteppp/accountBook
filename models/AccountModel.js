//创建模型文件
const mongoose = require("mongoose");

let AccountSchema = new mongoose.Schema({
  //标题
  title: {
    type: String,
    require: true,
  },

  //时间
  time: Date,

  //类型
  type: {
    type: Number,
    default: -1,
  },

  //金额
  account: {
    type: Number,
    require: true,
  },

  //备注
  remarks: {
    type: String,
  },
});

//6. 创建模型对象  对文档操作的封装对象    mongoose 会使用集合名称的复数, 创建集合
let AccountModel = mongoose.model("accounts", AccountSchema);

module.exports = AccountModel;
