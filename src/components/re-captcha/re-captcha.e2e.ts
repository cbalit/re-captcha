import { newE2EPage } from "@stencil/core/testing";
import { ReCaptcha } from "./re-captcha";

describe("re-captcha", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<re-captcha></re-captcha>");
    const element = await page.find("re-captcha");
    expect(element).toHaveClass("hydrated");
  });
});
