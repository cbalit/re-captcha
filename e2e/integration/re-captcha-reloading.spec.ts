var myEl;

describe("<re-captcha> RELOADING", function() {
  beforeEach(function() {
    myEl = Utils.createReCaptcha();
  });

  afterEach(function() {
    document.body.removeChild(myEl);
    myEl = null;
  });

  describe("REMOVE CAPTCHA ELEMENTS", function() {
    it("should remove the script tag when reloading", function() {
      myEl.removeCaptcha();
      var script = Utils.getReCaptchaScriptTag();
      expect(script).to.be.null;
    });

    it("should not consider that widget is loaded", function() {
      myEl.removeCaptcha();
      expect(myEl.isWidgetLoaded()).to.be.false;
    });

    it("should remove the _container property", function() {
      myEl.removeCaptcha();
      expect(myEl._container).to.be.null;
    });

    it("should remove div containner", function() {
      myEl.removeCaptcha();
      expect(Polymer.dom(myEl).childNodes).to.be.empty;
    });
  });

  describe("RELOADING CAPTCHA ELEMENTS", function() {
    it("should re-add the script tag when reloading", function() {
      myEl.reload();
      var script = Utils.getReCaptchaScriptTag();
      expect(script).not.to.be.null;
    });

    it("should set the _container property", function() {
      myEl.reload();
      expect(myEl._container).not.to.be.null;
    });

    it("should have div containner", function() {
      myEl.reload();
      expect(Polymer.dom(myEl).childNodes.length).to.equal(1);
    });
  });
});
