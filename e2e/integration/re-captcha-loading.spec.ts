var myEl;

describe("<re-captcha> LOADING", function() {
  afterEach(function() {
    myEl._resetScriptLoaded();
    document.body.removeChild(myEl);
    myEl = null;
  });

  describe("SCRIPT TAG", function() {
    beforeEach(function() {
      sinon.spy(Recaptcha.prototype, "_generateScriptApiTag");
      myEl = Utils.createReCaptcha();
    });

    afterEach(function() {
      Recaptcha.prototype._generateScriptApiTag.restore();
    });

    it("should call _generateScriptApiTag when creating the first instance", function() {
      expect(Recaptcha.prototype._generateScriptApiTag.calledOnce).to.be.true;
    });

    it("should not call _generateScriptApiTag more the once", function() {
      myEl = Utils.createReCaptcha();
      expect(Recaptcha.prototype._generateScriptApiTag.calledOnce).to.be.true;
    });

    it("should add the script tag", function() {
      var script = Utils.getReCaptchaScriptTag();
      expect(script).not.to.be.null;
    });
  });

  describe("DIV CHILD", function() {
    beforeEach(function() {
      myEl = Utils.createReCaptcha();
    });

    it("should create a single div child", function() {
      expect(Polymer.dom(myEl).childNodes).to.have.length(1);
      var div = Polymer.dom(myEl).childNodes[0];
      expect(div).not.to.be.null;
    });

    it("should generate container once", function() {
      expect(Polymer.dom(myEl).childNodes).to.have.length(1);
      var div1 = Polymer.dom(myEl).childNodes[0];
      myEl._generateContainer();
      expect(Polymer.dom(myEl).childNodes).to.have.length(1);
      expect(div1).to.equal(Polymer.dom(myEl).childNodes[0]);
    });
  });
});
