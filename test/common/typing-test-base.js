// Generated by CoffeeScript 1.3.3
(function() {
  var CoffeeScript, Wd, WdWrap, altKey, altKeyTracking, browser, clearAndCheck, click, enterKey, express, inputAndCheck, keysAndCheck, nullKey, preventDefault, returnKey, should, test, testMethod, typeAndCheck, unbind, wd, _, _ref;

  should = require('should');

  CoffeeScript = require('coffee-script');

  express = require('express');

  _ = require('underscore');

  _ref = require('../../index'), wd = _ref.wd, Wd = _ref.Wd, WdWrap = _ref.WdWrap;

  altKey = wd.SPECIAL_KEYS['Alt'];

  nullKey = wd.SPECIAL_KEYS['NULL'];

  returnKey = wd.SPECIAL_KEYS['Return'];

  enterKey = wd.SPECIAL_KEYS['Enter'];

  click = function(sel) {
    var field;
    field = wd.current().elementByCssOrNull(sel);
    return wd.current().clickElement(field);
  };

  keysAndCheck = function(sel, entered, expected) {
    var field;
    field = wd.current().elementByCssOrNull(sel);
    if (!((entered === "") || (_.isEqual(entered, [])))) {
      wd.current().moveTo(field);
      wd.current().keys(entered);
    }
    return (wd.current().getValue(field)).should.equal(expected);
  };

  typeAndCheck = function(sel, entered, expected) {
    var field;
    field = wd.current().elementByCssOrNull(sel);
    wd.current().type(field, entered);
    return (wd.current().getValue(field)).should.equal(expected);
  };

  inputAndCheck = function(method, sel, entered, expected) {
    switch (method) {
      case 'type':
        return typeAndCheck(sel, entered, expected);
      case 'keys':
        return keysAndCheck(sel, entered, expected);
    }
  };

  clearAndCheck = function(sel) {
    var field;
    field = wd.current().elementByCssOrNull(sel);
    wd.current().clear(field);
    return (wd.current().getValue(field)).should.equal("");
  };

  preventDefault = function(_sel, eventType) {
    var scriptAsCoffee, scriptAsJs;
    scriptAsCoffee = "$('" + _sel + "')." + eventType + " (e) ->\n  e.preventDefault()";
    scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
      bare: 'on'
    });
    return wd.current().execute(scriptAsJs);
  };

  unbind = function(_sel, eventType) {
    var scriptAsCoffee, scriptAsJs;
    scriptAsCoffee = "$('" + _sel + "').unbind '" + eventType + "' ";
    scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
      bare: 'on'
    });
    return wd.current().execute(scriptAsJs);
  };

  altKeyTracking = function(_sel) {
    var scriptAsCoffee, scriptAsJs;
    scriptAsCoffee = "f = $('" + _sel + "')\nf.keydown (e) ->\n  if e.altKey\n    f.val 'altKey on'\n  else\n    f.val 'altKey off'\n  e.preventDefault()";
    scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
      bare: 'on'
    });
    return wd.current().execute(scriptAsJs);
  };

  browser = null;

  WdWrap = WdWrap({
    "with": (function() {
      return browser;
    })
  });

  testMethod = function(method, sel, browserName) {
    it("0/ click", WdWrap(function() {
      return click(sel);
    }));
    it("1/ typing nothing", WdWrap(function() {
      return inputAndCheck(method, sel, "", "");
    }));
    it("2/ typing []", WdWrap(function() {
      return inputAndCheck(method, sel, [], "");
    }));
    it("3/ typing 'Hello'", WdWrap(function() {
      return inputAndCheck(method, sel, 'Hello', 'Hello');
    }));
    it("4/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    it("5/ typing ['Hello']", WdWrap(function() {
      return inputAndCheck(method, sel, ['Hello'], 'Hello');
    }));
    it("6/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    it("7/ typing ['Hello',' ','World','!']", WdWrap(function() {
      return inputAndCheck(method, sel, ['Hello', ' ', 'World', '!'], 'Hello World!');
    }));
    it("8/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    it("9/ typing 'Hello\\n'", WdWrap(function() {
      return inputAndCheck(method, sel, 'Hello\n', (sel.match(/input/) ? 'Hello' : 'Hello\n'));
    }));
    it("10/ typing '\\r'", WdWrap(function() {
      switch (browserName) {
        case 'chrome':
          return inputAndCheck(method, sel, [returnKey], (sel.match(/input/) ? 'Hello' : 'Hello\n\n'));
        default:
          return inputAndCheck(method, sel, '\r', (sel.match(/input/) ? 'Hello' : 'Hello\n\n'));
      }
    }));
    it("11/ typing [returnKey]", WdWrap(function() {
      return inputAndCheck(method, sel, [returnKey], (sel.match(/input/) ? 'Hello' : 'Hello\n\n\n'));
    }));
    it("12/ typing [enterKey]", WdWrap(function() {
      return inputAndCheck(method, sel, [enterKey], (sel.match(/input/) ? 'Hello' : 'Hello\n\n\n\n'));
    }));
    it("13/ typing ' World!'", WdWrap(function() {
      return inputAndCheck(method, sel, ' World!', (sel.match(/input/) ? 'Hello World!' : 'Hello\n\n\n\n World!'));
    }));
    it("14/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    it("15/ preventing default on keydown", WdWrap(function() {
      return preventDefault(sel, 'keydown');
    }));
    it("16/ typing 'Hello'", WdWrap(function() {
      return inputAndCheck(method, sel, 'Hello', '');
    }));
    it("17/ unbinding keydown", WdWrap(function() {
      return unbind(sel, 'keydown');
    }));
    it("18/ typing 'Hello'", WdWrap(function() {
      return inputAndCheck(method, sel, 'Hello', 'Hello');
    }));
    it("19/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    it("20/ preventing default on keypress", WdWrap(function() {
      return preventDefault(sel, 'keypress');
    }));
    it("21/ typing 'Hello'", WdWrap(function() {
      return inputAndCheck(method, sel, 'Hello', '');
    }));
    it("22/ unbinding keypress", WdWrap(function() {
      return unbind(sel, 'keypress');
    }));
    it("23/ typing 'Hello'", WdWrap(function() {
      return inputAndCheck(method, sel, 'Hello', 'Hello');
    }));
    it("24/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    it("25/ preventing default on keyup", WdWrap(function() {
      return preventDefault(sel, 'keyup');
    }));
    it("26/ typing 'Hello'", WdWrap(function() {
      return inputAndCheck(method, sel, 'Hello', 'Hello');
    }));
    it("27/ unbinding keypress", WdWrap(function() {
      return unbind(sel, 'keyup');
    }));
    it("28/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    it("29/ adding alt key tracking", WdWrap(function() {
      return altKeyTracking(sel);
    }));
    it("30/ typing ['a']", WdWrap(function() {
      return inputAndCheck(method, sel, ['a'], 'altKey off');
    }));
    it("31/ typing [altKey,nullKey,'a']", WdWrap(function() {
      return inputAndCheck(method, sel, [altKey, nullKey, 'a'], 'altKey off');
    }));
    it("32/ typing [altKey,'a']", WdWrap(function() {
      return inputAndCheck(method, sel, [altKey, 'a'], 'altKey on');
    }));
    it("33/ typing ['a']", WdWrap(function() {
      return inputAndCheck(method, sel, ['a'], (function() {
        switch (method) {
          case 'keys':
            return 'altKey on';
          default:
            return 'altKey off';
        }
      })());
    }));
    it("34/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    it("35/ typing [nullKey]", WdWrap(function() {
      return inputAndCheck(method, sel, [nullKey], '');
    }));
    it("36/ typing ['a']", WdWrap(function() {
      return inputAndCheck(method, sel, ['a'], 'altKey off');
    }));
    it("37/ clear", WdWrap(function() {
      return clearAndCheck(sel);
    }));
    return it("38/ unbinding keydown", WdWrap(function() {
      return unbind(sel, 'keydown');
    }));
  };

  test = function(type, browserName) {
    return describe('typing', function() {
      before(function(done) {
        this.app = express.createServer();
        this.app.use(express["static"](__dirname + '/assets'));
        this.app.listen(8181);
        return done(null);
      });
      after(function(done) {
        this.app.close();
        return done(null);
      });
      describe('wd initialization', function() {
        it("wd.remote or wd.headless", function(done) {
          switch (type) {
            case 'remote':
              browser = wd.remote();
              browser.on("status", function(info) {
                return console.log("\u001b[36m%s\u001b[0m", info);
              });
              browser.on("command", function(meth, path) {
                return console.log(" > \u001b[33m%s\u001b[0m: %s", meth, path);
              });
              Wd = Wd({
                "with": browser
              });
              return done(null);
            case 'headless':
              browser = wd.headless();
              Wd = Wd({
                "with": browser
              });
              return done(null);
          }
        });
        it("init", WdWrap(function() {
          return this.init({
            browserName: browserName
          });
        }));
        return it("get", WdWrap(function() {
          return this.get("http://127.0.0.1:8181/typing-test-page.html");
        }));
      });
      describe('input', function() {
        describe('type', function() {
          return testMethod('type', "#type input", browserName);
        });
        return describe('keys', function() {
          return testMethod('keys', "#type input", browserName);
        });
      });
      describe('textarea', function() {
        describe('type', function() {
          return testMethod('type', "#type textarea", browserName);
        });
        return describe('keys', function() {
          return testMethod('keys', "#type textarea", browserName);
        });
      });
      return describe('clean', function() {
        return it("quit", WdWrap(function() {
          return this.quit();
        }));
      });
    });
  };

  exports.test = test;

}).call(this);