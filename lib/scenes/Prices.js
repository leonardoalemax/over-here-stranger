"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _telegraf = require("telegraf");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PricesScene = function PricesScene(title, game) {
  var _this = this;

  _classCallCheck(this, PricesScene);

  this.title = title;
  this.game = game;
  this.base = new _telegraf.BaseScene(this.title);
  var list = this.game.prices.map(function (price) {
    return price.shop.name;
  });
  this.base.enter( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var options, answer;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(_this.title);
              options = _telegraf.Markup.keyboard(list).oneTime().resize().extra();
              answer = 'Achei os precos nessa lojas: \n\n';

              _this.game.prices.forEach(function (price) {
                answer += "<b>".concat(price.shop.name, " - R$ ").concat(price.price_new);
                if (price.price_old != price.price_new) answer += " (<s>R$ ".concat(price.price_old, "</s>)");
                answer += "</b>\n\n";
              });

              ctx.replyWithHTML(answer, options);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  this.game.prices.forEach(function (price) {
    _this.base.hears(price.shop.name, /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return ctx.reply(price.url);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
};

exports["default"] = PricesScene;