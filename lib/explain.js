Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = explainError;

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function explainError(error, colorize) {
  var lineNumber = error.line - 1,
      lines = error.lines,
      result = [renderLine(lineNumber, lines[lineNumber], colorize), renderPointer(error.column, colorize)],
      i = lineNumber - 1,
      linesAround = 2;
  while (i >= 0 && i >= lineNumber - linesAround) {
    result.unshift(renderLine(i, lines[i], colorize));
    i--;
  }
  i = lineNumber + 1;
  while (i < lines.length && i <= lineNumber + linesAround) {
    result.push(renderLine(i, lines[i], colorize));
    i++;
  }
  result.unshift(formatErrorMessage(error.message, error.filename, colorize));
  return result.join('\n');
}

function formatErrorMessage(message, filename, colorize) {
  return (colorize ? _colors2.default.bold(message) : message) + ' at ' + (colorize ? _colors2.default.green(filename) : filename) + ' :';
}

function prependSpaces(s, len) {
  while (s.length < len) {
    s = ' ' + s;
  }
  return s;
}

function renderLine(n, line, colorize) {
  line = line.replace(/\t/g, ' ');

  var lineNumber = prependSpaces((n + 1).toString(), 5) + ' |';
  return ' ' + (colorize ? _colors2.default.grey(lineNumber) : lineNumber) + line;
}

function renderPointer(column, colorize) {
  var res = new Array(column + 9).join('-') + '^';
  return colorize ? _colors2.default.grey(res) : res;
}
module.exports = exports.default;
