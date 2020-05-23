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

    this.params = new URLSearchParams({
      key: "c8e51362710ae7456836a3aba5949a47d55dba52",
      region: 'BR2',
      country: 'BR'
    });
  }

  _createClass(IsThereAnyDeal, [{
    key: "find",
    value: function () {
      var _find = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
        var url, _yield$axios$get, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.params.append('q', query);
                this.params.append('shops', 'nuuvem,steam,greenmangaming,humblestore');
                url = "https://api.isthereanydeal.com/v01/search/search/?".concat(this.params.toString());
                _context.next = 5;
                return _axios["default"].get(url);

              case 5:
                _yield$axios$get = _context.sent;
                data = _yield$axios$get.data;
                console.log(data.data.list[0]);
                return _context.abrupt("return", data.data.list[0]);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function find(_x) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "prices",
    value: function () {
      var _prices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
        var game, url, _yield$axios$get2, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.find(query);

              case 2:
                game = _context2.sent;

                if (!(typeof game === 'undefined')) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", undefined);

              case 5:
                this.params.append('plains', game.plain);
                url = "https://api.isthereanydeal.com/v01/game/prices/?".concat(this.params.toString());
                console.log(url);
                _context2.next = 10;
                return _axios["default"].get(url);

              case 10:
                _yield$axios$get2 = _context2.sent;
                data = _yield$axios$get2.data;
                game.prices = data.data[game.plain].list;
                return _context2.abrupt("return", game);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function prices(_x2) {
        return _prices.apply(this, arguments);
      }

      return prices;
    }()
  }]);

  return IsThereAnyDeal;
}();

exports["default"] = IsThereAnyDeal;