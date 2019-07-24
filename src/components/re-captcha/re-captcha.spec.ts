import { ReCaptcha } from "./re-captcha";

describe("properties", () => {
  it("have defaults", async () => {
    const component = new ReCaptcha();
    expect(component.theme).toEqual("light");
    expect(component.type).toEqual("image");
    expect(component.timeout).toEqual(3000);
    expect(component.tabidx).toEqual(0);
    expect(component.language).toEqual("");
  });

  it("set properties", async () => {
    const component = new ReCaptcha();
    expect(component.getProperty("theme")).toEqual("dark");
    expect(component.getProperty("type")).toEqual("audio");
    expect(component.getProperty("timeout")).toEqual(1000);
    expect(component.getProperty("tabidx")).toEqual(5);
    expect(component.getProperty("language")).toEqual("es");
  });

  it("should not throw an error if the sitekey is provided", async () => {
    const page = await newE2EPage({
      html: `<re-captcha sitekey="invalid" />`
    });

    const component = await page.find("re-captcha");
    expect(component.getProperty("sitekey")).toEqual(
      "6LdRcP4SAAAAAJ4Dq1gXcD9AyhzuG77iz7E2Dmu4"
    );
  });
});
