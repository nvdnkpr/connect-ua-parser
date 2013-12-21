var extend = require('obj-extend');
var uaParser = require('ua-parser');

module.exports = function (settings) {
  settings = extend({
    requestKey: 'useragent',
    ua: true,
    os: true,
    device: true
  }, settings);

  return function uaParserMiddleware (req, res, next) {
    var userAgentHeader = req.headers['user-agent'];
    var parsed = {};

    if (settings.ua) {
      parsed.ua = uaParser.parseUA(userAgentHeader);
    }

    if (settings.os) {
      parsed.os = uaParser.parseOS(userAgentHeader);
    }

    if (settings.device) {
      parsed.device = uaParser.parseDevice(userAgentHeader);
    }

    req[settings.requestKey] = parsed;
    next();
  };
};
