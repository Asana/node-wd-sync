// Generated by CoffeeScript 1.3.1
(function() {
  var CoffeeScript, Wd, WdWrap, should, sleep, wd, _ref;

  _ref = require('../../index'), wd = _ref.wd, Wd = _ref.Wd, WdWrap = _ref.WdWrap;

  should = require('should');

  CoffeeScript = require('coffee-script');

  sleep = function(ms) {
    var fiber;
    fiber = Fiber.current;
    setTimeout((function() {
      return fiber.run();
    }), ms);
    return yield();
  };

  describe("wd-sync", function() {
    return describe("method by method tests", function() {
      var browser, capabilities;
      browser = null;
      WdWrap = WdWrap({
        "with": (function() {
          return browser;
        })
      });
      capabilities = null;
      it("wd.remote", function(done) {
        browser = wd.remote({
          mode: 'sync'
        });
        Wd = Wd({
          "with": browser
        });
        return done();
      });
      it("init", WdWrap(function() {
        return this.init({
          browserName: "chrome"
        });
      }));
      it("capabilities", WdWrap(function() {
        capabilities = this.capabilities();
        should.exist(capabilities);
        should.exist(capabilities.browserName);
        return should.exist(capabilities.platform);
      }));
      it("get", WdWrap(function() {
        return this.get("file://" + __dirname + "/assets/test-page.html");
      }));
      it("refresh", WdWrap(function() {
        return this.refresh();
      }));
      it("eval", WdWrap(function() {
        (this["eval"]("1+2")).should.equal(3);
        (this["eval"]("document.title")).should.equal("TEST PAGE");
        (this["eval"]("$('#eval').length")).should.equal(1);
        return (this["eval"]("$('#eval li').length")).should.equal(2);
      }));
      it("execute", WdWrap(function() {
        this.execute("window.wd_sync_execute_test = 'It worked!'");
        return (this["eval"]("window.wd_sync_execute_test")).should.equal('It worked!');
      }));
      it("executeAsync (async mode)", function(done) {
        var scriptAsCoffee, scriptAsJs;
        scriptAsCoffee = "[args...,done] = arguments\ndone \"OK\"              ";
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        return browser.executeAsync(scriptAsJs, function(err, res) {
          res.should.equal("OK");
          return done();
        });
      });
      it("executeAsync (sync mode)", WdWrap(function() {
        var res, scriptAsCoffee, scriptAsJs;
        scriptAsCoffee = "[args...,done] = arguments\ndone \"OK\"              ";
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        res = this.executeAsync(scriptAsJs);
        return res.should.equal("OK");
      }));
      it("setWaitTimeout", WdWrap(function() {
        var scriptAsCoffee, scriptAsJs;
        this.setWaitTimeout(0);
        scriptAsCoffee = 'jQuery ->\n  setTimeout ->\n    $(\'#setWaitTimeout\').html \'<div class="child">a child</div>\'\n  , 1000           ';
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        this.execute(scriptAsJs);
        should.not.exist(this.elementByCss("#setWaitTimeout .child"));
        this.setWaitTimeout(2000);
        should.exist(this.elementByCss("#setWaitTimeout .child"));
        return this.setWaitTimeout(0);
      }));
      it("element", WdWrap(function() {
        should.exist(this.element("name", "elementByName"));
        return should.not.exist(this.element("name", "elementByName2"));
      }));
      it("elementByLinkText", WdWrap(function() {
        should.exist(this.elementByLinkText("click helloByLinkText"));
        return should.not.exist(this.elementByLinkText("click helloByLinkText2"));
      }));
      it("elementById", WdWrap(function() {
        should.exist(this.elementById("elementById"));
        return should.not.exist(this.elementById("elementById2"));
      }));
      it("elementByName", WdWrap(function() {
        should.exist(this.elementByName("elementByName"));
        return should.not.exist(this.elementByName("elementByName2"));
      }));
      it("elementByCss", WdWrap(function() {
        should.exist(this.elementByCss("#elementByCss"));
        return should.not.exist(this.elementByCss("#elementByCss2"));
      }));
      it("getAttribute", WdWrap(function() {
        var testDiv;
        testDiv = this.elementById("getAttribute");
        should.exist(testDiv);
        (this.getAttribute(testDiv, "weather")).should.equal("sunny");
        return should.not.exist(this.getAttribute(testDiv, "timezone"));
      }));
      it("getValue (input)", WdWrap(function() {
        var inputField;
        inputField = this.elementByCss("#getValue input");
        should.exist(inputField);
        return (this.getValue(inputField)).should.equal("Hello getValueTest!");
      }));
      it("getValue (textarea)", WdWrap(function() {
        var inputField;
        inputField = this.elementByCss("#getValue textarea");
        should.exist(inputField);
        return (this.getValue(inputField)).should.equal("Hello getValueTest2!");
      }));
      it("clickElement", WdWrap(function() {
        var anchor, scriptAsCoffee, scriptAsJs;
        anchor = this.elementByCss("#clickElement a");
        (this.text(anchor)).should.equal("not clicked");
        scriptAsCoffee = 'jQuery ->\n  a = $(\'#clickElement a\')\n  a.click ->\n    a.html \'clicked\'              ';
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        this.execute(scriptAsJs);
        (this.text(anchor)).should.equal("not clicked");
        this.clickElement(anchor);
        return (this.text(anchor)).should.equal("clicked");
      }));
      it("moveTo", WdWrap(function() {
        var a1, a2, current, scriptAsCoffee, scriptAsJs;
        a1 = this.elementByCss("#moveTo .a1");
        a2 = this.elementByCss("#moveTo .a2");
        current = this.elementByCss("#moveTo .current");
        should.exist(a1);
        should.exist(a2);
        should.exist(current);
        (this.text(current)).should.equal("");
        scriptAsCoffee = 'jQuery ->\n  a1 = $(\'#moveTo .a1\')\n  a2 = $(\'#moveTo .a2\')\n  current = $(\'#moveTo .current\')\n  a1.hover ->\n    current.html \'a1\'\n  a2.hover ->\n    current.html \'a2\'';
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        this.execute(scriptAsJs);
        (this.text(current)).should.equal("");
        this.moveTo(a1);
        (this.text(current)).should.equal("a1");
        this.moveTo(a2);
        return (this.text(current)).should.equal("a2");
      }));
      /*
          @todo waiting for implementation
          it "scroll", WdWrap ->
      */

      it("buttonDown / buttonUp", WdWrap(function() {
        var a, resDiv, scriptAsCoffee, scriptAsJs;
        a = this.elementByCss("#mouseButton a");
        resDiv = this.elementByCss("#mouseButton div");
        should.exist(a);
        should.exist(resDiv);
        scriptAsCoffee = 'jQuery ->\n  a = $(\'#mouseButton a\')\n  resDiv = $(\'#mouseButton div\')\n  a.mousedown ->\n    resDiv.html \'button down\'\n  a.mouseup ->\n    resDiv.html \'button up\'';
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        this.execute(scriptAsJs);
        (this.text(resDiv)).should.equal('');
        this.moveTo(a);
        this.buttonDown();
        (this.text(resDiv)).should.equal('button down');
        this.buttonUp();
        return (this.text(resDiv)).should.equal('button up');
      }));
      it("click", WdWrap(function() {
        var anchor, scriptAsCoffee, scriptAsJs;
        anchor = this.elementByCss("#click a");
        (this.text(anchor)).should.equal("not clicked");
        scriptAsCoffee = 'jQuery ->\n  a = $(\'#click a\')\n  a.click ->\n    a.html \'clicked\'              ';
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        this.execute(scriptAsJs);
        (this.text(anchor)).should.equal("not clicked");
        this.moveTo(anchor);
        this.click(0);
        (this.text(anchor)).should.equal("clicked");
        return this.click();
      }));
      it("doubleclick", WdWrap(function() {
        var anchor, scriptAsCoffee, scriptAsJs;
        anchor = this.elementByCss("#doubleclick a");
        (this.text(anchor)).should.equal("not clicked");
        scriptAsCoffee = 'jQuery ->\n  a = $(\'#doubleclick a\')\n  a.click ->\n    a.html \'clicked\'              ';
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        this.execute(scriptAsJs);
        (this.text(anchor)).should.equal("not clicked");
        this.moveTo(anchor);
        this.doubleclick(0);
        (this.text(anchor)).should.equal("clicked");
        return this.doubleclick();
      }));
      it("type", WdWrap(function() {
        var inputField;
        inputField = this.elementByCss("#type input");
        should.exist(inputField);
        this.type(inputField, "Hello World");
        (this.getValue(inputField)).should.equal("Hello World");
        this.type(inputField, "\n");
        return (this.getValue(inputField)).should.equal("Hello World");
      }));
      it("clear", WdWrap(function() {
        var inputField;
        inputField = this.elementByCss("#clear input");
        should.exist(inputField);
        (this.getValue(inputField)).should.equal("not cleared");
        this.clear(inputField);
        return (this.getValue(inputField)).should.equal("");
      }));
      it("title", WdWrap(function() {
        return this.title().should.equal("TEST PAGE");
      }));
      it("text", WdWrap(function() {
        var textDiv;
        textDiv = this.elementByCss("#text");
        should.exist(textDiv);
        (this.text(textDiv)).should.include("text content");
        return (this.text(textDiv)).should.not.include("div");
      }));
      it("textPresent", WdWrap(function() {
        var textDiv;
        textDiv = this.elementByCss("#textPresent");
        should.exist(textDiv);
        (this.textPresent('sunny', textDiv)).should.be["true"];
        return (this.textPresent('raining', textDiv)).should.be["false"];
      }));
      it("acceptAlert", WdWrap(function() {
        var a, res, scriptAsCoffee, scriptAsJs;
        a = this.elementByCss("#acceptAlert a");
        should.exist(a);
        scriptAsCoffee = "a = $('#acceptAlert a')\na.click ->\n  alert \"coffee is running out\"";
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        res = this.execute(scriptAsJs);
        this.clickElement(a);
        return this.acceptAlert();
      }));
      it("dismissAlert", WdWrap(function() {
        var a, res, scriptAsCoffee, scriptAsJs;
        a = this.elementByCss("#dismissAlert a");
        should.exist(a);
        scriptAsCoffee = "a = $('#dismissAlert a')\na.click ->\n  alert \"coffee is running out\"";
        scriptAsJs = CoffeeScript.compile(scriptAsCoffee, {
          bare: 'on'
        });
        res = this.execute(scriptAsJs);
        this.clickElement(a);
        if (!(capabilities.platform === 'MAC' && capabilities.browserName === 'chrome')) {
          return this.dismissAlert();
        } else {
          return this.acceptAlert();
        }
      }));
      it("active", WdWrap(function() {
        var i1, i2;
        i1 = this.elementByCss("#active .i1");
        i2 = this.elementByCss("#active .i2");
        this.clickElement(i1);
        this.active().should.equal(i1);
        this.clickElement(i2);
        return this.active().should.equal(i2);
      }));
      it("url", WdWrap(function() {
        return this.url().should.include("/test/unit/assets/test-page.html");
      }));
      return it("close", WdWrap(function() {
        return this.close();
      }));
      /*
          it "quit", WdWrap ->        
            @quit()
      */

    });
  });

}).call(this);