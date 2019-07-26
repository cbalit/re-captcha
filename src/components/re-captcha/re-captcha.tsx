import {
  Component,
  Prop,
  Element,
  Event,
  Watch,
  Host,
  h,
  EventEmitter
} from "@stencil/core";

@Component({
  tag: "re-captcha"
})
export class ReCaptcha {
  /**
   * The type of re-captcha to serve (`image` or `audio`)
   */
  @Prop()
  public type = "image";

  /**
   * Your sitekey
   *
   * (Provided on registration -- see https://developers.google.com/re-captcha/intro)
   */
  @Prop()
  public sitekey = "";

  /**
   * The color theme of the widget (`dark` or `light`)
   */
  @Prop()
  public theme = "light";

  /**
   * The total time (in milliseconds) to wait for API loading
   */
  @Prop()
  public timeout = 3000;

  /**
   * re-captcha API URL
   */
  @Prop()
  public href = "https://www.google.com/recaptcha/api.js";

  /**
   * The tabidx of the widget and challenge
   *
   * If other elements in your page use tabidx, this should be set to make user navigation easier.
   */
  @Prop()
  public tabidx = 0;

  /**
   * The language attribute
   */
  @Prop()
  public language = "";

  /**
   * Captcha response
   */
  @Event()
  public onResponse: EventEmitter;

  /**
   * Captcha expiration
   */
  @Event()
  public onExpire: EventEmitter;

  @Watch("type")
  public async validateType(newValue: string, oldValue: string) {
    try {
      if (newValue !== "audio" && newValue !== "image") {
        throw new TypeError(`property "type" must be either audio or image`);
      }
    } catch (e) {
      this.type = oldValue;
      throw e;
    }
  }

  @Watch("sitekey")
  public async validateSiteKey(newValue: string, oldValue: string) {
    try {
      if (newValue === "") {
        throw new Error(
          "sitekey attribute is mandatory for re-captcha element"
        );
      } else if (newValue.length !== 40) {
        throw new TypeError(`property "sitekey" must be valid`);
      }
    } catch (e) {
      this.sitekey = oldValue;
      throw e;
    }
  }

  @Watch("theme")
  public async validateTheme(newValue: string, oldValue: string) {
    try {
      if (newValue !== "dark" && newValue !== "light") {
        throw new TypeError(`property "theme" must be either dark or light`);
      }
    } catch (e) {
      this.theme = oldValue;
      throw e;
    }
  }

  @Watch("timeout")
  public async validateTimeout(newValue: number, oldValue: number) {
    try {
      const timeout = Number(newValue);
      if (!Number.isFinite(timeout)) {
        throw new TypeError(`property "timeout" must be of type number`);
      }
      this.timeout = timeout;
    } catch (e) {
      this.timeout = oldValue;
      throw e;
    }
  }

  @Watch("href")
  public async validateHref(newValue: string, oldValue: string) {
    try {
      try {
        new URL(newValue);
      } catch (_e) {
        throw new TypeError(`property "href" must be valid URL`);
      }
    } catch (e) {
      this.href = oldValue;
      throw e;
    }
  }

  @Watch("tabidx")
  public async validateTabidx(newValue: number, oldValue: number) {
    try {
      const tabidx = Number(newValue);
      if (!Number.isFinite(tabidx)) {
        throw new TypeError(`property "tabidx" must be of type number`);
      }
      this.tabidx = tabidx;
    } catch (e) {
      this.tabidx = oldValue;
      throw e;
    }
  }

  @Element()
  private el: HTMLElement;

  public async componentWillLoad() {
    this.validateType(this.type, "image");
    this.validateSiteKey(this.sitekey, "");
    this.validateTheme(this.theme, "light");
    this.validateTimeout(this.timeout, 3000);
    this.validateHref(this.href, "https://www.google.com/re-captcha/api.js");
    this.validateTabidx(this.tabidx, 0);
  }

  public async componentDidLoad() {
    await this.loadReCaptchaScript();
    await this.loadReCaptchaContainer();
  }

  public async componentWillUpdate() {
    await this.loadReCaptchaScript();
    await this.loadReCaptchaContainer();
  }

  public render() {
    return (
      <Host>
        <script />
        <div />
      </Host>
    );
  }

  // Helpers

  /**
   * Create and inject script dependency
   */
  private async loadReCaptchaScript() {
    const url = this.buildReCaptchaURL();
    const script = document.createElement("script");
    script.setAttribute("defer", "");
    script.setAttribute("async", "");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    this.el.replaceChild(script, this.el.children[0]);
    await this.waitReCaptchaScript(script);
  }

  private buildReCaptchaURL() {
    if (!this.language) {
      return this.href;
    } else {
      return `${this.href}?hl=${this.language}`;
    }
  }

  /**
   * Wait for the ReCatcha to finish async load
   */
  private async waitReCaptchaScript(script: HTMLScriptElement) {
    if (this.isNavigatorOnline()) {
      await this.waitReCaptchaScriptLoad(script);
      await this.waitReCaptchaReadiness();
    } else {
      await this.rescheduleReCaptchaScriptLoad(script);
    }
  }

  /**
   * Detect browser connectivity
   */
  private isNavigatorOnline() {
    return (
      "navigator" in window &&
      "onLine" in window.navigator &&
      window.navigator.onLine
    );
  }

  /**
   * Wait for thes async script load
   */
  private async waitReCaptchaScriptLoad(script: HTMLScriptElement) {
    await new Promise(resolve => {
      script.onload = () => {
        resolve();
      };
    });
    script.onload = () => {};
  }

  /**
   * Wait for the lib to load
   */
  private async waitReCaptchaReadiness() {
    await new Promise(resolve => {
      window["grecaptcha"].ready(() => {
        resolve();
      });
    });
  }

  /**
   * Reschedule load for next reconnection
   */
  private async rescheduleReCaptchaScriptLoad(script: HTMLScriptElement) {
    await new Promise(resolve => {
      const listener = () => {
        resolve();
      };

      window.addEventListener("online", listener, {
        once: true
      });
    });
    this.waitReCaptchaScript(script);
  }

  /**
   * Inject Captcha into the component DOM
   */
  private async loadReCaptchaContainer() {
    const elm = document.createElement("div");
    await window["grecaptcha"].render(elm, {
      callback: this.responseHandler.bind(this),
      "expired-callback": this.expiredHandler.bind(this),
      sitekey: this.sitekey,
      tabindex: this.tabidx,
      theme: this.theme,
      type: this.type
    });
    this.el.replaceChild(elm.children[0], this.el.children[1]);
  }

  /**
   * The `responseHandler` method will store the response and fire the captcha-response. At least
   * it will dispatch a captcha-response event with the response
   */
  private responseHandler(response: unknown) {
    this.onResponse.emit(response);
  }

  /**
   * The `expiredHandler` method fires the captcha-expired event.
   *
   *  @method expiredHandler
   */
  private expiredHandler() {
    this.onExpire.emit();
  }
}
