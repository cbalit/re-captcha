import {
  Component,
  Prop,
  Element,
  Event,
  Host,
  h,
  EventEmitter
} from "@stencil/core";

@Component({
  tag: "re-captcha"
})
export class ReCaptcha {
  /**
   * The type of re-captcha to serve
   */
  @Prop()
  public type: "image" | "audio" = "image";

  /**
   * Your sitekey
   *
   * (Provided on registration -- see https://developers.google.com/re-captcha/intro)
   */
  @Prop()
  public sitekey = "";

  /**
   * The color theme of the widget
   */
  @Prop()
  public theme: "dark" | "light" = "light";

  /**
   * The total time (in milliseconds) to wait for API loading
   */
  @Prop()
  public timeout = 3000;

  /**
   * re-captcha API URL
   */
  @Prop()
  public src = "https://www.google.com/recaptcha/api.js";

  /**
   * The tabIdx of the widget and challenge
   *
   * If other elements in your page use tabIdx, this should be set to make user navigation easier.
   */
  @Prop()
  public tabIdx = 0;

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

  @Element()
  private el: HTMLElement;

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
      return this.src;
    } else {
      return `${this.src}?hl=${this.language}`;
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
      tabindex: this.tabIdx,
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
