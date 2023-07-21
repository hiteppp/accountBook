const mongoose = require("mongoose");

let BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  is_hot: Boolean,
});

//6. 创建模型对象  对文档操作的封装对象    mongoose 会使用集合名称的复数, 创建集合
let BookModel = mongoose.model("novel", BookSchema);

module.exports = BookModel;
