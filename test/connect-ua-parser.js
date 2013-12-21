var connect = require('connect');
var expect = require('chai').expect;
var request = require('request');
var connectUaParser = require('../lib/connect-ua-parser');

describe('A connect server with the connect-ua-parser middleware', function () {
  function startServer (options) {
    options = options || {};
    before(function () {
      var self = this;
      var app = connect();
      var connectUaParserMiddleware = connectUaParser(options);
      app.use(connectUaParserMiddleware);
      app.use(function (req, res, next) {
        res.end(JSON.stringify(req[options.requestKey || 'useragent']));
      });
      self.server = app.listen(9999);
    });
    after(function () {
      this.server.close();
    });
  }

  function saveRequest () {
    before(function (done) {
      var self = this;
      request('http://localhost:9999', function (err, res, body) {
        self.body = JSON.parse(body);
        done(err);
      });
    });
  }

  describe('with no options', function () {
    startServer();
    saveRequest();

    it('should add parsed user agent info onto the request object', function () {
      expect(this.body).to.be.an('object');
      expect(this.body).to.have.property('ua');
      expect(this.body).to.have.property('os');
      expect(this.body).to.have.property('device');
    });
  });

  describe('with requestKey option set', function () {
    startServer({ requestKey: 'ua' });
    saveRequest();

    it('should attach user agent info onto the req object at the specified key', function () {
      expect(this.body).to.be.an('object');
    });
  });

  describe('with only ua setting set to true', function () {
    startServer({ ua: true, os: false, device: false });
    saveRequest();

    it('should only add ua info onto the request object', function () {
      expect(this.body).to.be.an('object');
      expect(this.body).to.have.property('ua');
      expect(this.body).to.not.have.property('os');
      expect(this.body).to.not.have.property('device');
    });
  });

  describe('with only os setting set to true', function () {
    startServer({ ua: false, os: true, device: false });
    saveRequest();

    it('should only add os info onto the request object', function () {
      expect(this.body).to.be.an('object');
      expect(this.body).to.have.property('os');
      expect(this.body).to.not.have.property('ua');
      expect(this.body).to.not.have.property('device');
    });
  });

  describe('with only device setting set to true', function () {
    startServer({ ua: false, os: false, device: true });
    saveRequest();

    it('should only add device info onto the request object', function () {
      expect(this.body).to.be.an('object');
      expect(this.body).to.have.property('device');
      expect(this.body).to.not.have.property('ua');
      expect(this.body).to.not.have.property('os');
    });
  });
});
