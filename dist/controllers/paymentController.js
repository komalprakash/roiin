"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardpayment = exports.checkStatus = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../config"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PaysafeApiClient = require("../lib/PaysafeApiClient"); //var PaysafeApiClient;


var paysafeApiClient = new PaysafeApiClient(_config["default"].paysafeApiKeyId, _config["default"].paysafeApiKeySecret, _config["default"].paysafeEnvironment, _config["default"].paysafeAccountNumber);

var checkStatus = function checkStatus(req, res) {
  paysafeApiClient.cardServiceHandler(paysafeApiClient).monitor(function (error, response) {
    if (error) {
      res.send(JSON.stringify(error));
    } else {
      res.send(JSON.stringify(response));
    }
  });
};

exports.checkStatus = checkStatus;

var cardpayment = function cardpayment(req, res) {
  console.log(req.body);
  var _req$body = req.body,
      amount = _req$body.amount,
      token = _req$body.token;
  var access_token = _config["default"].SERVERAPI_KEY;
  var url = "".concat(_config["default"].API_URL, "/cardpayments/v1/accounts/").concat(_config["default"].paysafeAccountNumber, "/auths");
  console.log("url ", url);
  var merchantRefNumber = Math.random().toString(36).slice(2);

  _axios["default"].post(url, {
    merchantRefNum: merchantRefNumber,
    amount: amount,
    settleWithAuth: true,
    card: {
      paymentToken: token
    },
    billingDetails: {
      street: "100 Queen Street West",
      city: "Toronto",
      state: "ON",
      country: "CA",
      zip: "M5H 2N2"
    }
  }, {
    headers: {
      Authorization: "Basic ".concat(access_token)
    }
  }).then(function (response) {
    // console.log(response.data);
    res.send(JSON.stringify(response.data));
  })["catch"](function (error) {
    console.log(error);
    res.send(JSON.stringify(error));
  });
};

exports.cardpayment = cardpayment;