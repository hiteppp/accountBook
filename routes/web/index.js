var express = require("express");
var router = express.Router();

const moment = require("moment/moment");
const AccountModel = require("../../models/AccountModel");

//声明中间件来检测登录
let checkLoginMiddleware = require("../../middlewares/checkLoginMiddleware");

//添加首页的路由规则
router.get("/", (req, res) => {
  //重定向
  res.redirect("/account");
});
//账本列表
router.get("/account", checkLoginMiddleware, function (req, res, next) {
  //读取所有信息
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).send("读取失败");
        return;
      }
      //响应成功提示
      res.render("list", { accounts: data, moment: moment });
    });
});

//添加记录
router.get("/account/create", checkLoginMiddleware, function (req, res, next) {
  res.render("create");
});

//新增记录
router.post("/account", checkLoginMiddleware, (req, res) => {
  //修改res.body.time的值
  req.body.time = moment(req.body.time).toDate();

  //插入数据库
  AccountModel.create(
    {
      ...req.body,
    },
    (err, data) => {
      if (err) {
        res.status(500).send("插入失败");
        return;
      }
      //成功提醒
      res.render("sucess", { msg: "添加成功哦~~~", url: "/account" });
    }
  );
});

//删除记录
router.get("/account/:id", checkLoginMiddleware, (req, res) => {
  let id = req.params.id;

  //删除

  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send("删除失败");
      return;
    }
    res.render("sucess", { msg: "删除成功哦~~~", url: "/account" });
  });
});
module.exports = router;
