"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _telegraf = require("telegraf");

var _IsThereAnyDeal = _interopRequireDefault(require("../apis/IsThereAnyDeal"));

var _Game = _interopRequireDefault(require("./Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GamesScene = /*#__PURE__*/function () {
  function GamesScene(title, games, stage) {
    var _this = this;

    _classCallCheck(this, GamesScene);

    this.title = title;
    this.games = games;
    this.stage = stage;
    this.base = new _telegraf.BaseScene(this.title);
    this.base.enter( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(_this.title);

                if (!(_this.games.length > 1)) {
                  _context.next = 5;
                  break;
                }

                _this.choose(ctx);

                _context.next = 7;
                break;

              case 5:
                _context.next = 7;
                return _this.enterGame(ctx, _this.games[0]);

              case 7:
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
    this.games.forEach(function (game) {
      _this.base.hears(game.title, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this.enterGame(ctx, game);

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
  }

  _createClass(GamesScene, [{
    key: "choose",
    value: function choose(ctx) {
      var list = this.games.map(function (game) {
        return "".concat(game.title);
      });

      var options = _telegraf.Markup.keyboard(list).oneTime().resize().extra();

      ctx.reply('Eu achei esses jogos, qual você vai querer?', options);
    }
  }, {
    key: "enterGame",
    value: function () {
      var _enterGame = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, game) {
        var key, info, gamesScene;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                key = "game:".concat(game.plain);
                _context3.next = 3;
                return _IsThereAnyDeal["default"].info(game.plain);

              case 3:
                info = _context3.sent;
                game.image = info.image;
                gamesScene = new _Game["default"](key, game, this.stage);
                this.stage.register(gamesScene.base);
                ctx.scene.enter(key);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function enterGame(_x3, _x4) {
        return _enterGame.apply(this, arguments);
      }

      return enterGame;
    }()
  }]);

  return GamesScene;
}();

exports["default"] = GamesScene;