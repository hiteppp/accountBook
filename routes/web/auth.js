var express = require("express");
var router = express.Router();
//导入用户模型
const UserModel = require("../../models/UserModel");
const md5 = require("md5");

//响应html内容
router.get("/reg", (req, res) => {
  res.render("auth/reg");
});

//注册新用户
router.post("/reg", (req, res) => {
  UserModel.create(
    { ...req.body, password: md5(req.body.password) },
    (err, data) => {
      if (err) {
        res.status(500).send("注册失败");
        return;
      }
      res.render("sucess", { msg: "注册成功", url: "/login" });
    }
  );
});

//登录
router.get("/login", (req, res) => {
  res.render("auth/login");
});

//登录操作
router.post("/login", (req, res) => {
  //获取用户名和密码
  let { username, password } = req.body;
  //查询数据库
  UserModel.findOne(
    { username: username, password: md5(password) },
    (err, data) => {
      if (err) {
        res.status(500).send("登录失败");
        return;
      }
      //判断data
      if (!data) {
        return res.send("账号或密码错误");
      }

      //导入session
      req.session.username = data.username;
      req.session._id = data._id;

      //登录成功响应
      res.render("sucess", { msg: "登录成功", url: "/account" });
    }
  );
});

//退出登录
router.post("/logout", (req, res) => {
  //销毁session
  req.session.destroy(() => {
    res.render("sucess", { msg: "退出成功", url: "/login" });
  });
});
module.exports = router;
