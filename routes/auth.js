var express = require('express');
var router = express.Router();
var userModel = require('../schemas/user')
var ResHand = require('../helper/ResHandle')
var { validationResult } = require('express-validator');
var checkAuth = require('../validators/auth')
var bcrypt = require('bcrypt');
var protect = require('../middlewares/protect')
var sendMail = require('../helper/sendmail')
var path = require('path');




router.get('/me', protect, async function (req, res, next) {
  ResHand(res, true, req.user);
});
router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../view/login.html'));
});


router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    ResHand(res, false, "Hay nhap day du thong tin");
    return;
  }
  let user = await userModel.findOne({ username: username })
  if (!user) {
    ResHand(res, false, "Username hoac password khong dung");
    return;
  }
  let result = bcrypt.compareSync(password, user.password);
  if (result) {
    // ResHand(res, true, user.getJWT());
    let token = user.getJWT();
    res.status(200).cookie('token', token, {
      expires: new Date(Date.now() + 24 * 3600 * 1000),
      httpOnly: true
    }).send({
      success: true,
      data: token
    })
  } else {
    ResHand(res, false, "Username hoac password khong dung");
  }
});

router.get('/me', protect, async function (req, res, next) {
  ResHand(res, true, req.user);
});

router.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, '../view/register.html'));
});
router.post('/register', checkAuth(), async function (req, res, next) {
  var result = validationResult(req);
  if (result.errors.length > 0) {
    ResHand(res, false, result.errors);
    return;
  }
  try {
    var newUser = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: ["USER"]
    })
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get('/ResetPassword', function(req, res) {
  res.sendFile(path.join(__dirname, '../view/resetPassword.html'));
});
router.post('/ResetPassword/:token', async function (req, res, next) {
  let user = await userModel.findOne({
    ResetPasswordToken:
      req.params.token
  });
  if (!user) {
    res.status(404).send("URL khong hop le");
    return;
  }
  user.password = req.body.password;
  user.ResetPasswordToken = undefined;
  user.ResetPasswordExp = undefined;
  await user.save();
  res.status(200).send("Doi pass thanh cong");

});
router.get('/forgotPassword', function(req, res) {
  res.sendFile(path.join(__dirname, '../view/forgotPassword.html'));
});
router.post('/ForgotPassword', async function (req, res, next) {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send("EMail khong ton tai");
    return;
  }
  let token = user.genTokenResetPassword();
  await user.save();
  let url = `http://localhost:3000/auth/ResetPassword/?token-=${token}`
  try {
    await sendMail(user.email, url);
    res.status(200).send("gui mail thanh cong");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;