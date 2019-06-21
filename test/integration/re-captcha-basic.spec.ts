describe("<re-captcha> BASIC HTML", () => {
  let defaultElm;
  let customElm;

  beforeEach(() => {
    cy.visit("localhost:1234");
    defaultElm = cy.get("re-captcha#default");
    customElm = cy.get("re-captcha#custom");
  });

  describe("Properties", () => {
    it("defaults properties", () => {
      defaultElm
        .its("sitekey")
        .should("be", "6LdRcP4SAAAAAJ4Dq1gXcD9AyhzuG77iz7E2Dmu4");
      defaultElm.its("theme").should("be", "light");
      defaultElm.its("type").should("be", "image");
      defaultElm.its("timeout").should("be", 3000);
      defaultElm.its("tabindex").should("be", 0);
      defaultElm.its("lang").should("be", null);
    });

    it("set properties", () => {
      customElm.its("theme").should("be", "dark");
      customElm.its("type").should("be", "audio");
      customElm.its("timeout").should("be", 1000);
      customElm.its("tabindex").should("be", 5);
      customElm.its("lang").should("be", "es");
    });

    it("should not throw an error if the sitekey is provided", () => {
      defaultElm.sitekey = "sitekey";
      //wrap in a function to keep 'this' working
      var fn = () => {
        defaultElm.connectedCallback();
      };
      expect(fn).not.to.throw(Error);
    });

    it("should throw an error if the sitekey is not provided", () => {
      var fn = () => {
        defaultElm.connectedCallback();
      };
      expect(fn).to.throw(/sitekey attribute is mandatory/);
    });

    it("set only allow properties", () => {
      defaultElm = cy.get("re-captcha#invalid");
      defaultElm.its("theme").should("be", "light");
      defaultElm.its("type").should("be", "image");
      defaultElm.its("timeout").should("be", 3000);
    });

    describe("THEME Properties", () => {
      it("should save theme attribute if it is light", () => {
        defaultElm.setAttribute("theme", "light");
        defaultElm.its("theme").should("be", "light");
      });

      it("should save theme attribute if it is dark", () => {
        defaultElm.setAttribute("theme", "dark");
        defaultElm.its("theme").should("be", "dark");
      });

      it("should not save theme attribute if it is not dark or light", () => {
        defaultElm.setAttribute("theme", "bar");
        defaultElm.its("theme").should("be", "light");
      });
      it("should not save theme attribute if it is null", () => {
        defaultElm.setAttribute("theme", null);
        defaultElm.its("theme").should("be", "light");
      });
      it("should not save theme attribute if it is undefined", () => {
        defaultElm.setAttribute("theme", undefined);
        defaultElm.its("theme").should("be", "light");
      });
    });

    describe("TYPE Properties", () => {
      it("should save type attribute if it is image", () => {
        defaultElm.setAttribute("type", "image");
        defaultElm.its("type").should("be", "image");
      });

      it("should save type attribute if it is audio", () => {
        defaultElm.setAttribute("type", "audio");
        defaultElm.its("type").should("be", "audio");
      });

      it("should not save type attribute if it is not image or audio", () => {
        defaultElm.setAttribute("type", "bar");
        defaultElm.its("type").should("be", "image");
      });

      it("should not save type attribute if it is null", () => {
        defaultElm.setAttribute("type", null);
        defaultElm.its("type").should("be", "image");
      });

      it("should not save type attribute if it is undefined", () => {
        defaultElm.setAttribute("type", undefined);
        defaultElm.its("type").should("be", "image");
      });
    });

    describe("TIMEOUT Properties", () => {
      it("should save type attribute if it is a number", () => {
        defaultElm.setAttribute("timeout", "4500");
        defaultElm.its("timeout").should("be", 4500);
      });

      it("should not save type attribute if it is not a number", () => {
        defaultElm.setAttribute("timeout", "notANumber");
        defaultElm.its("timeout").should("be", 3000);
      });

      it("should not save type attribute if it is null", () => {
        defaultElm.setAttribute("timeout", null);
        defaultElm.its("timeout").should("be", 3000);
      });

      it("should not save type attribute if it is undefined", () => {
        defaultElm.setAttribute("timeout", undefined);
        defaultElm.its("timeout").should("be", 3000);
      });
    });
  });

  describe("Events", () => {
    it("should save the response", () => {
      defaultElm._responseHandler("response");
      defaultElm.its("response").should("be", "response");
    });

    it("should fire a captcha-response", () => {
      defaultElm.addEventListener("captcha-response", event => {
        expect(event.detail.response).to.equal("response");
        defaultElm._responseHandler("response");
      });
    });
  });
});
