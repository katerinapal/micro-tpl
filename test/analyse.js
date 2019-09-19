var _analyse = require("../lib/analyse");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _should = require("should");

var _should2 = _interopRequireDefault(_should);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('analyse', function () {
  it('should able to check no close tempalate', function () {
    _analyse.analyse.bind(null, _fs2.default.readFileSync(_path2.default.join(__dirname, './bad/noclose.html'), { encoding: 'utf8' })).should.throw();
  });
});
