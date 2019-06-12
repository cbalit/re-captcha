var myEl;

describe("<re-captcha> BASIC HTML", function() {
  beforeEach(function() {
    cy.visit("/");
    myEl = cy.get("re-captcha#default");
  });

  afterEach(function() {
    myEl = null;
  });

  describe("Properties", function() {
    it("defaults properties", function() {
      expect(myEl.sitekey).to.equal("6LdRcP4SAAAAAJ4Dq1gXcD9AyhzuG77iz7E2Dmu4");
      expect(myEl.theme).to.equal("light");
      expect(myEl.type).to.equal("image");
      expect(myEl.timeout).to.equal(3000);
      expect(myEl.tabindex).to.equal(0);
      expect(myEl.lang).to.be.empty;
    });

    it("set properties", function() {
      myEl = cy.get("re-captcha#custom");
      expect(myEl.theme).to.equal("dark");
      expect(myEl.type).to.equal("audio");
      expect(myEl.timeout).to.equal(1000);
      expect(myEl.tabindex).to.equal(5);
      expect(myEl.lang).to.equal("es");
    });

    it("should not throw an error if the sitekey is provided", function(done) {
      myEl = new Recaptcha();
      myEl.sitekey = "sitekey";
      //wrap in a function to keep 'this' working
      var fn = function() {
        myEl.attached();
      };
      //flush(function () {
      expect(fn).not.to.throw(Error);
      done();
      //})
    });

    it("should throw an error if the sitekey is not provided", function() {
      myEl = new Recaptcha();
      var fn = function() {
        myEl.attached();
      };
      expect(fn).to.throw(/sitekey attribute is mandatory/);
    });

    it("set only allow properties", function(done) {
      myEl = cy.get("re-captcha#invalid");
      flush(function() {
        expect(myEl.theme).to.equal("light");
        expect(myEl.type).to.equal("image");
        expect(myEl.timeout).to.equal(3000);
        done();
      });
    });

    describe("THEME Properties", function() {
      it("should save theme attribute if it is light", function() {
        myEl.setAttribute("theme", "light");
        expect(myEl.theme).to.equal("light");
      });

      it("should save theme attribute if it is dark", function() {
        myEl.setAttribute("theme", "dark");
        expect(myEl.theme).to.equal("dark");
      });

      it("should not save theme attribute if it is not dark or light", function(done) {
        myEl.setAttribute("theme", "bar");
        flush(function() {
          expect(myEl.theme).to.equal("light");
          done();
        });
      });
      it("should not save theme attribute if it is null", function(done) {
        myEl.setAttribute("theme", null);
        flush(function() {
          expect(myEl.theme).to.equal("light");
          done();
        });
      });
      it("should not save theme attribute if it is undefined", function(done) {
        myEl.setAttribute("theme", undefined);
        flush(function() {
          expect(myEl.theme).to.equal("light");
          done();
        });
      });
    });

    describe("TYPE Properties", function() {
      it("should save type attribute if it is image", function() {
        myEl.setAttribute("type", "image");
        expect(myEl.type).to.equal("image");
      });

      it("should save type attribute if it is audio", function() {
        myEl.setAttribute("type", "audio");
        expect(myEl.type).to.equal("audio");
      });

      it("should not save type attribute if it is not image or audio", function(done) {
        myEl.setAttribute("type", "bar");
        flush(function() {
          expect(myEl.type).to.equal("image");
          done();
        });
      });

      it("should not save type attribute if it is null", function(done) {
        myEl.setAttribute("type", null);
        flush(function() {
          expect(myEl.type).to.equal("image");
          done();
        });
      });

      it("should not save type attribute if it is undefined", function(done) {
        myEl.setAttribute("type", undefined);
        flush(function() {
          expect(myEl.type).to.equal("image");
          done();
        });
      });
    });

    describe("TIMEOUT Properties", function() {
      it("should save type attribute if it is a number", function() {
        myEl.setAttribute("timeout", "4500");
        expect(myEl.timeout).to.equal(4500);
      });

      it("should not save type attribute if it is not a number", function(done) {
        myEl.setAttribute("timeout", "notANumber");
        flush(function() {
          expect(myEl.timeout).to.equal(3000);
          done();
        });
      });

      it("should not save type attribute if it is null", function(done) {
        myEl.setAttribute("timeout", null);
        flush(function() {
          expect(myEl.timeout).to.equal(3000);
          done();
        });
      });

      it("should not save type attribute if it is undefined", function(done) {
        myEl.setAttribute("timeout", undefined);
        flush(function() {
          expect(myEl.timeout).to.equal(3000);
          done();
        });
      });
    });
  });

  describe("Events", function() {
    it("should save the response", function() {
      myEl._responseHandler("response");
      expect(myEl.response).to.equal("response");
    });

    it("should fire a captcha-response", function(done) {
      myEl.addEventListener("captcha-response", function(event) {
        expect(event.detail.response).to.equal("response");
        done();
      });
      myEl._responseHandler("response");
    });
  });
});
