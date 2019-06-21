import { ReCaptcha } from '../src/re-captcha';

describe("<re-captcha> BASIC HTML", () => {
  describe("Properties", () => {
    it("defaults properties", () => {
      const elem = new ReCaptcha();
      expect(elem.sitekey).toEqual(
        "6LdRcP4SAAAAAJ4Dq1gXcD9AyhzuG77iz7E2Dmu4"
      );
      expect(elem.theme).toEqual("light");
      expect(elem.type).toEqual("image");
      expect(elem.timeout).toEqual(3000);
      expect(elem.tabindex).toEqual(0);
      expect(elem.lang).toBe(undefined);
    });

    it("set properties", () => {
      const elem = new ReCaptcha();
      expect(elem.theme).toEqual("dark");
      expect(elem.type).toEqual("audio");
      expect(elem.timeout).toEqual(1000);
      expect(elem.tabindex).toEqual(5);
      expect(elem.lang).toEqual("es");
    });
  });


    // it("should not throw an error if the sitekey is provided", done => {
    //   elem.sitekey = "sitekey";
    //   //wrap in a function to keep 'this' working
    //   var fn = () => {
    //     elem.attached();
    //   };
    //   expect(fn).not.toThrow(Error);
    // });

    // it("should throw an error if the sitekey is not provided", () => {
    //   var fn = () => {
    //     elem.attached();
    //   };
    //   expect(fn).toThrow(/sitekey attribute is mandatory/);
    // });

    // it("set only allow properties", done => {
    //   elem = document.querySelector("re-captcha#invalid");
    //   expect(elem.theme).toEqual("light");
    //   expect(elem.type).toEqual("image");
    //   expect(elem.timeout).toEqual(3000);
    // });

  //   describe("THEME Properties", () => {
  //     it("should save theme attribute if it is light", () => {
  //       elem.setAttribute("theme", "light");
  //       expect(elem.theme).toEqual("light");
  //     });

  //     it("should save theme attribute if it is dark", () => {
  //       elem.setAttribute("theme", "dark");
  //       expect(elem.theme).toEqual("dark");
  //     });

  //     it("should not save theme attribute if it is not dark or light", done => {
  //       elem.setAttribute("theme", "bar");
  //       expect(elem.theme).toEqual("light");
  //     });
  //     it("should not save theme attribute if it is null", done => {
  //       elem.setAttribute("theme", null);
  //       expect(elem.theme).toEqual("light");
  //     });
  //     it("should not save theme attribute if it is undefined", done => {
  //       elem.setAttribute("theme", undefined);
  //       expect(elem.theme).toEqual("light");
  //     });
  //   });

  //   describe("TYPE Properties", () => {
  //     it("should save type attribute if it is image", () => {
  //       elem.setAttribute("type", "image");
  //       expect(elem.type).toEqual("image");
  //     });

  //     it("should save type attribute if it is audio", () => {
  //       elem.setAttribute("type", "audio");
  //       expect(elem.type).toEqual("audio");
  //     });

  //     it("should not save type attribute if it is not image or audio", done => {
  //       elem.setAttribute("type", "bar");
  //       expect(elem.type).toEqual("image");
  //     });

  //     it("should not save type attribute if it is null", done => {
  //       elem.setAttribute("type", null);
  //       expect(elem.type).toEqual("image");
  //     });

  //     it("should not save type attribute if it is undefined", done => {
  //       elem.setAttribute("type", undefined);
  //       expect(elem.type).toEqual("image");
  //     });
  //   });

  //   describe("TIMEOUT Properties", () => {
  //     it("should save type attribute if it is a number", () => {
  //       elem.setAttribute("timeout", "4500");
  //       expect(elem.timeout).toEqual(4500);
  //     });

  //     it("should not save type attribute if it is not a number", done => {
  //       elem.setAttribute("timeout", "notANumber");
  //       expect(elem.timeout).toEqual(3000);
  //     });

  //     it("should not save type attribute if it is null", done => {
  //       elem.setAttribute("timeout", null);
  //       expect(elem.timeout).toEqual(3000);
  //     });

  //     it("should not save type attribute if it is undefined", done => {
  //       elem.setAttribute("timeout", undefined);
  //       expect(elem.timeout).toEqual(3000);
  //     });
  //   });
  // });

  // describe("Events", () => {
  //   it("should save the response", () => {
  //     elem._responseHandler("response");
  //     expect(elem.response).toEqual("response");
  //   });

  //   it("should fire a captcha-response", done => {
  //     elem.addEventListener("captcha-response", function(event) {
  //       expect(event.detail.response).toEqual("response");
  //       elem._responseHandler("response");
  //     });
  //   });
  // });
});
