var _ = require("../");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _should = require("should");

var _should2 = _interopRequireDefault(_should);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function call(foo, it, opt) {
  return eval('(' + foo + ')(it, opt)');
}

describe('micro-tpl', function () {
  it('should able to build a template have a variable "it"', function () {
    var foo = (0, _.tpl)(_fs2.default.readFileSync(_path2.default.join(__dirname, './tpl/it.html'), { encoding: 'utf8' }));
    call(foo, { say: 'Hello, world!' }).should.equal('<p>Hello, world!</p>');
  });

  it('should able to build a template have a variable "say"', function () {
    var foo = (0, _.tpl)(_fs2.default.readFileSync(_path2.default.join(__dirname, './tpl/render.html'), { encoding: 'utf8' }));
    call(foo, { say: 'Hello, world!' }).should.equal('<p>Hello, world!</p>');
  });

  it('should able to use loop', function () {
    var foo = (0, _.tpl)(_fs2.default.readFileSync(_path2.default.join(__dirname, './tpl/loop.html'), { encoding: 'utf8' }));
    call(foo, { l: 3 }).should.equal('<p>1</p><p>2</p><p>3</p>');
  });

  it('should able to include other template', function () {
    var p = _path2.default.join(__dirname, './tpl/include.html'),
        foo = (0, _.tpl)(_fs2.default.readFileSync(p, { encoding: 'utf8' }), { path: p });
    call(foo, { items: [{ say: 'hello' }, { say: 'tencent' }, { say: 'qqedu' }] }).should.equal('<p>hello</p><p>tencent</p><p>qqedu</p>');
  });

  it('should able to deep include', function () {
    var p = _path2.default.join(__dirname, './tpl/deepInclude.html'),
        foo = (0, _.tpl)(_fs2.default.readFileSync(p, { encoding: 'utf8' }), { path: p });
    call(foo, { items: [{ say: 'hello' }, { say: 'tencent' }, { say: 'qqedu' }] }).should.equal('<p>hello</p><p>tencent</p><p>qqedu</p>');
  });

  it('should throw a error if trying circular reference', function () {
    var p = _path2.default.join(__dirname, './tpl/circle1.html');
    _.tpl.bind(null, _fs2.default.readFileSync(p, { encoding: 'utf8' }), { path: p }).should.throw(/circular reference/);
  });

  it('should able to build a template have a variable "it" strict mode', function () {
    var foo = (0, _.tpl)(_fs2.default.readFileSync(_path2.default.join(__dirname, './tpl/it.html'), { encoding: 'utf8' }), { strict: true });
    call(foo, { say: 'Hello, world!' }).should.equal('<p>Hello, world!</p>');
  });

  it('should not able to build a template have a variable "say" strict mode', function () {
    var foo = (0, _.tpl)(_fs2.default.readFileSync(_path2.default.join(__dirname, './tpl/render.html'), { encoding: 'utf8' }), { strict: true });
    call.bind(null, foo, { say: 'Hello, world!' }).should.throw(/say is not defined/);
  });

  it('should throw a error when render a bad template in safe mod', function () {
    var file = _path2.default.join(__dirname, './bad/noclose.html'),
        foo = _.tpl.bind(null, _fs2.default.readFileSync(file, { encoding: 'utf8' }), { safe: true, path: file }).should.throw();
  });

  it('should throw a error when use ";" in interpolation', function () {
    var file = _path2.default.join(__dirname, './bad/semicolon.html'),
        foo = _.tpl.bind(null, _fs2.default.readFileSync(file, { encoding: 'utf8' }), { safe: true, path: file }).should.throw();
  });

  it('should throw a error when use multi-lines in interpolation', function () {
    var file = _path2.default.join(__dirname, './bad/multiline.html'),
        foo = _.tpl.bind(null, _fs2.default.readFileSync(file, { encoding: 'utf8' }), { safe: true, path: file }).should.throw();
  });

  it('should throw a error when finding unexpected token', function () {
    var file1 = _path2.default.join(__dirname, './bad/error.html'),
        file2 = _path2.default.join(__dirname, './bad/errorEval.html');
    _.tpl.bind(null, _fs2.default.readFileSync(file1, { encoding: 'utf8' }), { safe: true, path: file1 }).should.throw();

    _.tpl.bind(null, _fs2.default.readFileSync(file2, { encoding: 'utf8' }), { safe: true, path: file2 }).should.throw();
  });

  it('should able to build just function content', function () {
    var foo = (0, _.tpl)(_fs2.default.readFileSync(_path2.default.join(__dirname, './tpl/it.html'), { encoding: 'utf8' }), { strict: true, ret: 'function' });
  });

  // it('should return a function when find a error in the source in `unthrow` model', function () {
  //   var file = path.join(__dirname, './bad/error.html')
  //     , foo = tpl(
  //       fs.readFileSync(
  //         file,
  //         { encoding: 'utf8' }
  //       ),
  //       { safe: true, path: file, unthrow: true  }
  //     );

  //   fs.writeFileSync('1.js', foo);
  // });
});
