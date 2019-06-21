import { customElement, LitElement, property } from "lit-element";

@customElement("re-captcha")
export class ReCaptchaComponent extends LitElement {
  /**
   * The total time (in milliseconds) to wait for API loading
   */
  @property({ type: Number })
  timeout = 3000;

  /**
   * Your sitekey
   *
   * (Provided on registration -- see https://developers.google.com/recaptcha/intro)
   */
  @property({ type: String })
  sitekey = "test";

  /**
   * The color theme of the widget (`dark` or `light`)
   */
  @property({ type: String })
  theme = "light";

  /**
   * The type of reCaptcha to serve (`image` or `audio`)
   */
  @property({ type: String })
  type = "image";

  /**
   * The tabindex of the widget and challenge
   *
   * If other elements in your page use tabindex, this should be set to make user navigation easier.
   */
  @property({ type: Number })
  tabindex = 0;

  /**
   * The language attribute
   */
  @property({ type: String })
  language = "";

  /**
   * reCaptcha API URL
   */
  RECAPTCHA_API_URL = "https://www.google.com/recaptcha/api.js";

  /**
   * Current Captcha session ID
   */
  private captchaId: string = "";

  // Behaviour implementation

  async connectedCallback() {
    await this.loadReCaptcha();
    await this.loadCaptchaContainer();
    super.connectedCallback();
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    switch (name) {
      case "type":
        if (newval !== "audio" && newval !== "image") {
          throw new TypeError("property 'type' must be either audio or image");
        }
        break;

      case "sitekey":
        if (newval === "") {
          throw new Error(
            "sitekey attribute is mandatory for recaptcha element"
          );
        }
        break;

      case "theme":
        if (newval !== "dark" && newval !== "light") {
          throw new TypeError("property 'theme' must be either dark or light");
        }
        break;

      case "timeout":
        if (Number.isFinite(Number(newval))) {
          throw new TypeError("property 'timeout' must be of type number");
        }
        break;

      default:
        break;
    }
    super.attributeChangedCallback(name, oldval, newval);
  }

  async disconnectedCallback() {
    this.maybeUnloadReCaptcha();
    super.disconnectedCallback();
  }

  protected createRenderRoot() {
    return this;
  }

  // Public interface

  /**
   * The `reset` method resets the reCaptcha widget.
   */
  reset() {
    grecaptcha.reset(this.captchaId);
  }

  /**
   * The `response` method gets the response for the reCaptcha widget.
   */
  get response() {
    return grecaptcha.getResponse(this.captchaId);
  }

  // Helpers

  /**
   * Create and inject script dependency
   */
  private async loadReCaptcha() {
    const url = this.buildReCaptchaURL();

    const script = document.createElement("script");
    script.setAttribute("defer", "");
    script.setAttribute("async", "");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    this.appendChild(script);

    await this.waitReCaptcha(script);
  }

  private buildReCaptchaURL() {
    if (!this.language) {
      return this.RECAPTCHA_API_URL;
    } else {
      return `${this.RECAPTCHA_API_URL}?hl=${this.language}`;
    }
  }

  /**
   * Wait for the ReCatcha to finish async load
   */
  private async waitReCaptcha(script: HTMLScriptElement) {
    if (this.isNavigatorOnline()) {
      await this.waitScriptLoad(script);
      await this.waitReCaptchaLoad();
    } else {
      await this.rescheduleReCaptchaLoad(script);
    }
  }

  /**
   * Detect browser connectivity
   */
  private isNavigatorOnline() {
    return (
      "navigator" in window &&
      "onLine" in (window as any).navigator &&
      (window as any).navigator.onLine
    );
  }

  /**
   * Wait for thes async script load
   */
  private async waitScriptLoad(script: HTMLScriptElement) {
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
  private async waitReCaptchaLoad() {
    await new Promise(resolve => {
      grecaptcha.ready(() => {
        resolve();
      });
    });
  }

  /**
   * Reschedule load for next reconnection
   */
  private async rescheduleReCaptchaLoad(script: HTMLScriptElement) {
    await new Promise(resolve => {
      const listener = () => {
        resolve(this.waitReCaptcha(script));
      };

      window.addEventListener("online", listener, {
        once: true
      });
    });
  }

  /**
   * Inject Captcha into the component DOM
   */
  private async loadCaptchaContainer() {
    const elm = document.createElement("div");
    this.captchaId = await grecaptcha.render(elm, {
      callback: this.responseHandler.bind(this),
      "expired-callback": this.expiredHandler.bind(this),
      sitekey: this.sitekey,
      tabindex: this.tabindex,
      theme: this.theme,
      type: this.type
    });
    this.appendChild(elm);
  }

  /**
   * The `responseHandler` method will store the response and fire the captcha-response. At least
   * it will dispatch a captcha-response event with the response
   */
  private responseHandler(response) {
    this.dispatchEvent(
      new CustomEvent("captcha-response", { detail: response })
    );
  }

  /**
   * The `expiredHandler` method fires the captcha-expired event.
   *
   *  @method expiredHandler
   */
  private expiredHandler() {
    this.dispatchEvent(new CustomEvent("captcha-expired"));
  }

  /**
   * Remove re-captcha script tag from the header
   */
  private maybeUnloadReCaptcha() {
    const script = this.getElementsByTagName("script")[0];
    if (script) {
      this.removeChild(script);
    }
  }
}
