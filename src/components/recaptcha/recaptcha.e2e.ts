import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("re-captcha", () => {
  let defaultPage: E2EPage;
  let defaultElm: E2EElement;

  let customPage: E2EPage;
  let customElm: E2EElement;

  let invalidPage: E2EPage;
  let invalidElm: E2EElement;

  beforeEach(async () => {
    [defaultPage, customPage, invalidPage] = await Promise.all([
      newE2EPage({
        html: `
          <re-captcha
            id="default"
            sitekey="6LdRcP4SAAAAAJ4Dq1gXcD9AyhzuG77iz7E2Dmu4"
          ></re-captcha>
        `
      }),
      newE2EPage({
        html: `
          <re-captcha
            id="custom"
            language="es"
            theme="dark"
            type="audio"
            timeout="1000"
            tabidx="5"
            sitekey="6LdRcP4SAAAAAJ4Dq1gXcD9AyhzuG77iz7E2Dmu4"
          ></re-captcha>
        `
      }),
      newE2EPage({
        html: `
          <re-captcha
            id="invalid"
            theme="foo"
            type="bar"
            timeout="notanumber"
            sitekey="6LdRcP4SAAAAAJ4Dq1gXcD9AyhzuG77iz7E2Dmu4"
          ></re-captcha>
        `
      })
    ]);

    [defaultElm, customElm, invalidElm] = await Promise.all([
      defaultPage.find("re-captcha"),
      customPage.find("re-captcha"),
      invalidPage.find("re-captcha")
    ]);
  });

  it("renders", async () => {
    expect(defaultElm).toHaveClass("hydrated");
    expect(customElm).toHaveClass("hydrated");
    expect(invalidElm).toHaveClass("hydrated");
  });

  describe("Properties", () => {
    it("have defaults", async () => {
      const properties = await Promise.all([
        defaultElm.getProperty("theme"),
        defaultElm.getProperty("type"),
        defaultElm.getProperty("timeout"),
        defaultElm.getProperty("tabidx"),
        defaultElm.getProperty("language")
      ]);
      expect(properties[0]).toEqual("light");
      expect(properties[1]).toEqual("image");
      expect(properties[2]).toEqual(3000);
      expect(properties[3]).toEqual(0);
      expect(properties[4]).toEqual("");
    });

    it("set properties", async () => {
      const properties = await Promise.all([
        customElm.getProperty("theme"),
        customElm.getProperty("type"),
        customElm.getProperty("timeout"),
        customElm.getProperty("tabidx"),
        customElm.getProperty("language")
      ]);
      expect(properties[0]).toEqual("dark");
      expect(properties[1]).toEqual("audio");
      expect(properties[2]).toEqual(1000);
      expect(properties[3]).toEqual(5);
      expect(properties[4]).toEqual("es");
    });

    it("should set default empty string if the sitekey is not provided", async () => {
      const page = await newE2EPage({
        html: "<re-captcha></re-captcha>"
      });
      const component = await page.find("re-captcha");
      expect(await component.getProperty("sitekey")).toEqual("");
    });

    it("set only allow properties", async () => {
      const properties = await Promise.all([
        invalidElm.getProperty("theme"),
        invalidElm.getProperty("type"),
        invalidElm.getProperty("timeout")
      ]);
      expect(properties[0]).toEqual("light");
      expect(properties[1]).toEqual("image");
      expect(properties[2]).toEqual(3000);
    });
  });

  describe("Theme properties", () => {
    it("should save theme attribute if it is light", async () => {
      defaultElm.setAttribute("theme", "light");
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("theme")).toEqual("light");
    });

    it("should save theme attribute if it is dark", async () => {
      defaultElm.setAttribute("theme", "dark");
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("theme")).toEqual("dark");
    });

    it("should not save theme attribute if it is not dark or light", async () => {
      defaultElm.setAttribute("theme", "bar");
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("theme")).toEqual("light");
    });

    it("should not save theme attribute if it is null", async () => {
      defaultElm.setAttribute("theme", null);
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("theme")).toEqual("light");
    });

    it("should not save theme attribute if it is undefined", async () => {
      defaultElm.setAttribute("theme", undefined);
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("theme")).toEqual("light");
    });
  });

  describe("Timeout properties", () => {
    it("should save type attribute if it is a number", async () => {
      defaultElm.setAttribute("timeout", "4500");
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("timeout")).toEqual(4500);
    });

    it("should not save type attribute if it is not a number", async () => {
      defaultElm.setAttribute("timeout", "notANumber");
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("timeout")).toEqual(3000);
    });

    it("should not save type attribute if it is null", async () => {
      defaultElm.setAttribute("timeout", null);
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("timeout")).toEqual(3000);
    });

    it("should not save type attribute if it is undefined", async () => {
      defaultElm.setAttribute("timeout", undefined);
      await defaultPage.waitForChanges();
      expect(await defaultElm.getProperty("timeout")).toEqual(3000);
    });
  });
});
