"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _telegraf = require("telegraf");

var _IsThereAnyDeal = _interopRequireDefault(require("./apis/IsThereAnyDeal"));

var _Games = _interopRequireDefault(require("./scenes/Games"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Merchant = /*#__PURE__*/function () {
  function Merchant(env) {
    _classCallCheck(this, Merchant);

    this.env = env;
    this.bot = new _telegraf.Telegraf(this.env.telegramToken);
  }

  _createClass(Merchant, [{
    key: "start",
    value: function start() {
      this.bot.use((0, _telegraf.session)());
      var stage = new _telegraf.Stage([]);
      this.bot.use(stage.middleware());
      this.bot.start(function (ctx) {
        ctx.reply('Ola estranho, estou aqui pra te ajudar com o melhor preço dos jogos, escreva um jogo, que eu acho o melhor preço pra você.');
      });
      this.bot.help(function (ctx) {
        ctx.reply('Me diga um jogo, que eu acho o melhor preço.');
      });
      this.bot.on('text', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
          var _ctx$message;

          var query, key, games, gamesScene;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  query = ((_ctx$message = ctx.message) === null || _ctx$message === void 0 ? void 0 : _ctx$message.text) || "";
                  key = "games:".concat(query);
                  _context.next = 4;
                  return _IsThereAnyDeal["default"].games(query);

                case 4:
                  games = _context.sent;

                  if (!(games.length <= 0)) {
                    _context.next = 7;
                    break;
                  }

                  return _context.abrupt("return", ctx.reply('nao achei esse jogo'));

                case 7:
                  gamesScene = new _Games["default"](key, games, stage);
                  stage.register(gamesScene.base);
                  ctx.scene.enter(key);

                case 10:
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
      this.bot.launch();
    }
  }]);

  return Merchant;
}();

exports["default"] = Merchant;