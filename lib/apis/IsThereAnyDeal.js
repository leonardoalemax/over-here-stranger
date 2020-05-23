"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IsThereAnyDeal = /*#__PURE__*/function () {
  function IsThereAnyDeal() {
    _classCallCheck(this, IsThereAnyDeal);
  }

  _createClass(IsThereAnyDeal, null, [{
    key: "games",
    value: function () {
      var _games = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
        var params, url, _yield$axios$get, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = new URLSearchParams({
                  key: process.env.API_KEY || "",
                  region: 'BR2',
                  country: 'BR',
                  q: query,
                  shops: 'nuuvem,steam,greenmangaming,humblestore'
                });
                url = "https://api.isthereanydeal.com/v01/search/search/?".concat(params.toString());
                _context.next = 4;
                return _axios["default"].get(url);

              case 4:
                _yield$axios$get = _context.sent;
                data = _yield$axios$get.data;
                return _context.abrupt("return", data.data.list);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function games(_x) {
        return _games.apply(this, arguments);
      }

      return games;
    }()
  }, {
    key: "info",
    value: function () {
      var _info = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
        var params, url, _yield$axios$get2, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = new URLSearchParams({
                  key: process.env.API_KEY || "",
                  plains: query
                });
                url = "https://api.isthereanydeal.com/v01/game/info/?".concat(params.toString());
                _context2.next = 4;
                return _axios["default"].get(url);

              case 4:
                _yield$axios$get2 = _context2.sent;
                data = _yield$axios$get2.data;
                return _context2.abrupt("return", data.data[query]);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function info(_x2) {
        return _info.apply(this, arguments);
      }

      return info;
    }()
  }, {
    key: "prices",
    value: function () {
      var _prices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
        var params, url, _yield$axios$get3, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = new URLSearchParams({
                  key: process.env.API_KEY || "",
                  region: 'BR2',
                  country: 'BR',
                  shops: 'nuuvem,steam,greenmangaming,humblestore',
                  plains: query
                });
                url = "https://api.isthereanydeal.com/v01/game/prices/?".concat(params.toString());
                _context3.next = 4;
                return _axios["default"].get(url);

              case 4:
                _yield$axios$get3 = _context3.sent;
                data = _yield$axios$get3.data;
                return _context3.abrupt("return", data.data[query].list);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function prices(_x3) {
        return _prices.apply(this, arguments);
      }

      return prices;
    }()
  }]);

  return IsThereAnyDeal;
}();

exports["default"] = IsThereAnyDeal;