"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _telegraf = require("telegraf");

var _extra = _interopRequireDefault(require("telegraf/extra"));

var _IsThereAnyDeal = _interopRequireDefault(require("./IsThereAnyDeal"));

var _mustache = _interopRequireDefault(require("mustache"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Merchant = /*#__PURE__*/function () {
  function Merchant(token) {
    _classCallCheck(this, Merchant);

    this.bot = new _telegraf.Telegraf(token);
    this.helloTemplate = _fs["default"].readFileSync("src/messages/hello.html", 'utf-8');
    this.errorTemplate = _fs["default"].readFileSync("src/messages/error.html", 'utf-8');
    this.pricesTemplate = _fs["default"].readFileSync("src/messages/prices.html", 'utf-8');
  }

  _createClass(Merchant, [{
    key: "answer",
    value: function () {
      var _answer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
        var api, game;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                api = new _IsThereAnyDeal["default"]();
                _context.next = 3;
                return api.prices(query);

              case 3:
                game = _context.sent;

                if (!(typeof game === "undefined")) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", this.errorTemplate);

              case 6:
                return _context.abrupt("return", _mustache["default"].render(this.pricesTemplate, game));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function answer(_x) {
        return _answer.apply(this, arguments);
      }

      return answer;
    }()
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.bot.start(function (ctx) {
        ctx.replyWithMarkdown(_this.helloTemplate);
      });
      this.bot.help(function (ctx) {
        var markup = _extra["default"].markdown();

        ctx.replyWithMarkdown('What are ya’ buyin!?', markup);
      });
      this.bot.on('text', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
          var answer;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(ctx.message && ctx.message.text)) {
                    _context2.next = 6;
                    break;
                  }

                  _context2.next = 3;
                  return _this.answer(ctx.message.text);

                case 3:
                  answer = _context2.sent;
                  ctx.replyWithHTML(answer);
                  ctx.reply('is that all stranger?');

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }());
      this.bot.launch();
    }
  }]);

  return Merchant;
}();

exports["default"] = Merchant;