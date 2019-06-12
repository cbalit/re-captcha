var myEl, clock, grecaptchaMock, widgetId;

describe("<re-captcha> Widegt API", function() {
  beforeEach(function() {
    widgetId = "WidgetId";
    clock = sinon.useFakeTimers();
    myEl = new Recaptcha();
    grecaptchaMock = sinon.stub({
      render: function(options) {},
      reset: function(id) {},
      getResponse: function(id) {}
    });
    grecaptchaMock.render.returns(widgetId);
  });

  afterEach(function() {
    myEl = null;
    grecaptchaMock = null;
  });

  describe("Time out", function() {
    beforeEach(function() {
      sinon.spy(Recaptcha.prototype, "_renderWhenApiReady");
      sinon.spy(Recaptcha.prototype, "_render");
    });

    afterEach(function() {
      Recaptcha.prototype._renderWhenApiReady.restore();
      Recaptcha.prototype._render.restore();
    });

    it("should call render when window.grecaptcha exist", function() {
      window.grecaptcha = grecaptchaMock;
      myEl._renderWhenApiReady();
      expect(Recaptcha.prototype._render.called).to.be.true;
    });

    it("should no call render until when window.grecaptcha not exist", function() {
      window.grecaptcha = null;
      myEl._renderWhenApiReady();
      clock.tick(myEl.timeout);
      expect(Recaptcha.prototype._render.called).not.to.be.true;
    });

    it("should call render when window.grecaptcha appear before timeout", function() {
      window.grecaptcha = null;
      setTimeout(function() {
        window.grecaptcha = grecaptchaMock;
      }, myEl.timeout - 10);
      myEl._renderWhenApiReady();
      clock.tick(myEl.timeout);
      expect(Recaptcha.prototype._render.called).to.be.true;
    });

    it("should not call render when window.grecaptcha appear after timeout", function() {
      window.grecaptcha = null;
      setTimeout(function() {
        window.grecaptcha = grecaptchaMock;
      }, myEl.timeout + 10);
      myEl._renderWhenApiReady();
      clock.tick(myEl.timeout);
      expect(Recaptcha.prototype._render.called).not.to.be.true;
    });
  });

  describe("Rendering", function() {
    beforeEach(function() {
      window.grecaptcha = grecaptchaMock;
      sinon.spy(Recaptcha.prototype, "_renderWhenApiReady");
      sinon.spy(Recaptcha.prototype, "_render");
    });

    afterEach(function() {
      Recaptcha.prototype._renderWhenApiReady.restore();
      Recaptcha.prototype._render.restore();
    });

    it("should call window.grecaptcha.render with the correct options", function() {
      myEl._render();
      expect(grecaptchaMock.render.called).to.be.true;
    });

    it("should call window.grecaptcha.render with the container as first arg", function() {
      myEl._container = document.createElement("div");
      myEl._render();
      var args = grecaptchaMock.render.args[0];
      expect(args[0]).to.equal(myEl._container);
    });

    it("should call window.grecaptcha.render with an option containing the sitekey", function() {
      myEl.sitekey = "sitekey";
      myEl._render();
      var args = grecaptchaMock.render.args[0];
      var options = args[1];
      expect(options.sitekey).to.equal(myEl.sitekey);
    });

    it("should call window.grecaptcha.render with an option containing the theme", function() {
      myEl.theme = "theme";
      myEl._render();
      var args = grecaptchaMock.render.args[0];
      var options = args[1];
      expect(options.theme).to.equal(myEl.theme);
    });

    it("should call window.grecaptcha.render with an option containing the type", function() {
      myEl.type = "type";
      myEl._render();
      var args = grecaptchaMock.render.args[0];
      var options = args[1];
      expect(options.type).to.equal(myEl.type);
    });

    it("should store the widget id return by window.grecaptcha.render in captchaId", function() {
      myEl._captchaId = null;
      myEl._render();
      expect(myEl._captchaId).to.equal(widgetId);
    });

    it("should fire a render event", function(done) {
      myEl.addEventListener("captcha-rendered", function(event) {
        expect(event.detail).to.be.empty;
        done();
      });
      myEl._render();
    });

    it("should not regenerate the internal container if we re attached the element in another element", function() {
      window.grecaptcha = grecaptchaMock;
      myEl = Utils.createReCaptcha();
      var newdiv = document.querySelector("#newcont");
      newdiv.appendChild(myEl);
      expect(Recaptcha.prototype._renderWhenApiReady.calledOnce).to.be.true;
    });
  });
});
