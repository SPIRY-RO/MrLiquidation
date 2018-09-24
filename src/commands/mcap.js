
var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('./../config.js');

var _keys = require('./../keys');
var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SITE_BASE_URL = 'https://coinmarketcap.com';
var API_BASE_URL = 'https://pro-api.coinmarketcap.com';

_axios2.default.defaults.headers.common['X-CMC_PRO_API_KEY'] = _keys.COINMARKETCAP.API_KEY;

    var chatId, data, marketCap, bitcoinDominance, ethereumDominance, reply;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            chatId = message.chat.id;
            _context.next = 3;
            return _axios2.default.get(API_BASE_URL + '/v1/global-metrics/quotes/latest').then(function (response) {
              return response.data;
            });

          case 3:
            data = _context.sent;
            marketCap = '_$' + parseFloat(data.data.quote.USD.total_market_cap).toLocaleString('en') + '_';
            bitcoinDominance = '_' + parseFloat(data.data.btc_dominance).toFixed(2) + '%_';
            ethereumDominance = '_' + parseFloat(data.data.eth_dominance).toFixed(2) + '%_';
            reply = '*Total Est. Market Cap (USD):* ' + marketCap + '\n*Bitcoin Dominance:* ' + bitcoinDominance + '\n*Ethereum Dominance:* ' + ethereumDominance;


            _config.bot.sendMessage(chatId, reply, { parse_mode: 'markdown' }).then(function () {
              return console.info('Total Market Cap in USD');
            }).catch(function (error) {
              return console.error(error);
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
