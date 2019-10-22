var _gulp = require("gulp");

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpJscs = require("gulp-jscs");

var _gulpJscs2 = _interopRequireDefault(_gulpJscs);

var _gulpMocha = require("gulp-mocha");

var _gulpMocha2 = _interopRequireDefault(_gulpMocha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('mocha', function () {
  return _gulp2.default.src('./test/*.js', { read: false }).pipe((0, _gulpMocha2.default)({ reporter: 'list' }));
});

_gulp2.default.task('default', ['mocha'], function () {
  return _gulp2.default.src(['index.js', './lib/**/*.js']).pipe((0, _gulpJscs2.default)());
});
