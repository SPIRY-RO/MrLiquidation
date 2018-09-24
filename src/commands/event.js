'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _keys = require('./../keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _config = require('./config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CAL_BASE_URL = 'https://api.coinmarketcal.com';

var accessToken = void 0,
    coinList = void 0;

var auth = function auth() {
  var params = {
    grant_type: 'client_credentials',
    client_id: _keys2.default.COINMARKETCAL.CLIENT_ID,
    client_secret: _keys2.default.COINMARKETCAL.CLIENT_SECRET
  };

  return _axios2.default.get(CAL_BASE_URL + '/oauth/v2/token', { params: params });
};

auth().then(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accessToken = response.data.access_token;
            _context.next = 3;
            return getCoinList();

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var getCoinList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var params;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = { access_token: accessToken };
            _context2.next = 3;
            return _axios2.default.get(CAL_BASE_URL + '/v1/coins', { params: params }).then(function (response) {
              return response.data;
            }).catch(function (error) {
              return console.error(error);
            });

          case 3:
            coinList = _context2.sent;


            console.log('Coinmarketcal data has been assigned to the global variable.');

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getCoinList() {
    return _ref2.apply(this, arguments);
  };
}();

_config.bot.onText(RegExp(_config.prefix + 'events'), function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(message) {
    var chatId, strEvent, maxEvents, params, events;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            chatId = message.chat.id;
            strEvent = void 0;
            maxEvents = 3;
            params = {
              access_token: accessToken,
              max: maxEvents
            };
            _context3.next = 6;
            return _axios2.default.get(CAL_BASE_URL + '/v1/events', { params: params }).then(function (response) {
              return response.data;
            }).catch(function (error) {
              return console.error(error);
            });

          case 6:
            events = _context3.sent;


            strEvent = '\uD83D\uDCC5 Here are the latest <i>' + maxEvents + '</i> events:\n\n';

            events.forEach(function (event) {
              var coinName = event.coins[0].name;
              var coinSymbol = event.coins[0].symbol;

              strEvent += '<b>' + coinName + ' (' + coinSymbol + ')</b>\n<b>Title:</b> ' + event.title + '\n<b>Date:</b> ' + new Date(event.date_event).toLocaleDateString() + '\n<b>Details:</b> ' + event.source + '\n\n';
            });

            _config.bot.sendMessage(chatId, strEvent, {
              parse_mode: 'html',
              disable_web_page_preview: true
            }).then(function () {
              return console.log('Found events. Returning the ' + maxEvents + ' latest events.');
            });

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}());

_config.bot.onText(RegExp(_config.prefix + 'event (.+)'), function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(message, match) {
    var chatId, inputSymbol, coin, reply, params, event, _reply;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            chatId = message.chat.id;
            inputSymbol = match[1].toUpperCase();
            coin = coinList.find(function (list) {
              return list.symbol.includes(inputSymbol);
            });

            if (!coin) {
              _context4.next = 13;
              break;
            }

            reply = void 0;
            params = {
              access_token: accessToken,
              coins: coin.id
            };
            _context4.next = 8;
            return _axios2.default.get(CAL_BASE_URL + '/v1/events', { params: params }).then(function (response) {
              return response.data[0];
            }).catch(function (error) {
              return console.log(error);
            });

          case 8:
            event = _context4.sent;


            if (event) {
              reply = '\uD83D\uDCC5 Here is an upcoming event for <b>' + coin.name + ' (' + coin.symbol + ')</b>:\n\n<b>Title:</b> ' + event.title + '\n<b>Date:</b> ' + new Date(event.date_event).toLocaleDateString() + '\n<b>Description:</b> ' + event.description + '\n\n<b>Source:</b> ' + event.source;
            } else {
              reply = 'There are no event(s) for <b>' + coin.name + ' (' + coin.symbol + ')</b>.';
            }

            _config.bot.sendMessage(chatId, reply, { parse_mode: 'html' }).then(function () {
              return console.log('Event found for ' + inputSymbol + '.');
            }).catch(function (error) {
              return console.log(error);
            });
            _context4.next = 15;
            break;

          case 13:
            _reply = 'Unable to find *' + inputSymbol + '*.';


            _config.bot.sendMessage(chatId, _reply, { parse_mode: 'markdown' }).then(function () {
              return console.log('Unable to find ' + inputSymbol + '.');
            }).catch(function (error) {
              return console.log(error);
            });

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}());