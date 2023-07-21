var express = require("express");
var router = express.Router();

const moment = require("moment/moment");
const AccountModel = require("../../models/AccountModel");

//账本列表
router.get("/account", function (req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get("accounts").value();

  //读取所有信息
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        res.json({
          //响应编号
          code: "1001",
          //响应的信息
          msg: "读取失败",
          //响应数据
          data: null,
        });
        return;
      }
      //响应成功提示
      // res.render("list", { accounts: data, moment: moment });
      res.json({
        //响应编号
        code: "0000",
        //响应的信息
        msg: "读取成功",
        //响应数据
        data: data,
      });
    });
});

//新增记录
router.post("/account", (req, res) => {
  //获取请求头里面的数据
  //生成id
  // let id = shortid.generate();
  // db.get("accounts")
  //   .push({ id: id, ...req.body })
  //   .write();

  //修改res.body.time的值
  req.body.time = moment(req.body.time).toDate();

  //插入数据库
  AccountModel.create(
    {
      ...req.body,
    },
    (err, data) => {
      if (err) {
        res.json({
          //响应编号
          code: "1002",
          //响应的信息
          msg: "读取失败",
          //响应数据
          data: null,
        });
        return;
      }
      //成功提醒
      res.json({
        code: "0000",
        msg: "创建成功",
        data: data,
      });
    }
  );
});

//删除记录
router.delete("/account/:id", (req, res) => {
  let id = req.params.id;

  //删除

  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.json({
        //响应编号
        code: "1003",
        //响应的信息
        msg: "删除失败",
        //响应数据
        data: null,
      });
      return;
    }
    res.json({
      //响应编号
      code: "0000",
      //响应的信息
      msg: "删除成功",
      //响应数据
      data: null,
    });
  });
});

//获取单个账单信息
router.get("/account/:id", (req, res) => {
  let id = req.params.id;
  //删除

  AccountModel.findById(id, (err, data) => {
    if (err) {
      return res.json({
        //响应编号
        code: "1004",
        //响应的信息
        msg: "获取失败",
        //响应数据
        data: null,
      });
    }
    res.json({
      //响应编号
      code: "0000",
      //响应的信息
      msg: "读取成功",
      //响应数据
      data: data,
    });
  });
});

//更新单个账单信息
router.patch("/account/:id", (req, res) => {
  //获取 id 参数值
  let { id } = req.params;
  //更新数据库
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      return res.json({
        code: "1005",
        msg: "更新失败~~",
        data: null,
      });
    }
    //再次查询数据库 获取单条数据
    AccountModel.findById(id, (err, data) => {
      if (err) {
        return res.json({
          code: "1004",
          msg: "读取失败~~",
          data: null,
        });
      }
      //成功响应
      res.json({
        code: "0000",
        msg: "更新成功",
        data: data,
      });
    });
  });
});
module.exports = router;
