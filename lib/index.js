"use strict";

require("babel-polyfill");

var _express = _interopRequireDefault(require("express"));

var _Merchant = _interopRequireDefault(require("./Merchant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 8080!');
});

require('dotenv').config();

var env = {
  isThereAnyDealApiKey: process.env.API_KEY || "",
  telegramToken: process.env.BOT_TOKEN || ""
};
var server = new _Merchant["default"](env);
server.start();