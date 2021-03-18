"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _api = _interopRequireDefault(require("./routes/api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//env credentials
require("dotenv").config();

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use("/", _express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use("/api", _api["default"]);
app.listen(port, function () {
  console.log("Server is up on port ".concat(port));
});