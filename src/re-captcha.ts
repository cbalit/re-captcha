import { customElement, html, LitElement, property } from "lit-element";

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_TYPE = "image";
const DEFAULT_THEME = "light";
const DEFAULT_TABLEINDEX = 0;
const DEFAULT_LANG = "";

/**
 * State of the re-captcha script tag
 */
let RECAPTCHA_LOADED = false;

/**
 * Detect browser connectivity
 */
const isNavigatorOnline = () =>
  "navigator" in window &&
  "onLine" in window.navigator &&
  window.navigator.onLine;

interface LoadCaptchaOptions {
  lang: string;
}

/**
 * Inject re-captcha script tag in the header
 */
const loadReCaptcha = async (apiUrl: string, opts: LoadCaptchaOptions) => {
  const head = document.getElementsByTagName("head")[0];
  const script = document.createElement("script");

  if (isNavigatorOnline()) {
    script.setAttribute("defer", "");
    script.setAttribute("async", "");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", apiUrl);

    if (!opts.lang) {
      script.setAttribute("src", apiUrl);
    } else {
      script.setAttribute("src", apiUrl + "?hl=" + opts.lang);
    }

    head.appendChild(script);

    await new Promise(resolve => {
      script.onload = () => {
        RECAPTCHA_LOADED = true;
        resolve();
      };
    });

    await new Promise(resolve => {
      grecaptcha.ready(() => {
        resolve();
      });
    });
  } else {
    await new Promise(resolve => {
      const listener = () => {
        if (!RECAPTCHA_LOADED) {
          resolve(loadReCaptcha(apiUrl, opts));
        }
      };

      window.addEventListener("online", listener);
      window.removeEventListener("online", listener);
    });
  }
};

/**
 * Remove re-captcha script tag from the header
 */
const unloadReCaptcha = () => {
  const script = document.querySelector("script#captcha");
  const head = document.getElementsByTagName("head")[0];

  if (script) {
    head.removeChild(script);
    RECAPTCHA_LOADED = false;
  }
};

@customElement("re-captcha")
export class ReCaptchaComponent extends LitElement {
  /**
   * The total time (in milliseconds) to wait for API loading
   */
  @property({ type: Number })
  public timeout = DEFAULT_TIMEOUT;

  /**
   * Your sitekey
   *
   * (Provided on registration -- see https://developers.google.com/recaptcha/intro)
   */
  @property({ type: String })
  public sitekey = "test";

  /**
   * The color theme of the widget (`dark` or `light`)
   */
  @property({ type: String })
  public theme = DEFAULT_THEME;

  /**
   * The type of reCaptcha to serve (`image` or `audio`)
   */
  @property({ type: String })
  public type = DEFAULT_TYPE;

  /**
   * The tabindex of the widget and challenge
   *
   * If other elements in your page use tabindex, this should be set to make user navigation easier.
   */
  @property({ type: Number })
  public tabindex = DEFAULT_TABLEINDEX;

  /**
   * The lang attribute
   */
  @property({ type: String })
  public lang = DEFAULT_LANG;

  /**
   * reCaptcha API URL
   */
  public RECAPTCHA_API_URL = "https://www.google.com/recaptcha/api.js";

  /**
   * Current Captcha session ID
   */
  private captchaId: string = "";

  /**
   * Captcha container
   */
  private captchaContainer: HTMLDivElement = null;

  public async connectedCallback() {
    await loadReCaptcha(this.RECAPTCHA_API_URL, { lang: this.lang });

    this.captchaContainer = document.createElement("div");
    this.captchaContainer.setAttribute("id", "g-recaptcha");

    this.captchaId = await grecaptcha.render(this.captchaContainer, {
      callback: this._responseHandler.bind(this),
      "expired-callback": this._expiredHandler.bind(this),
      sitekey: this.sitekey,
      tabindex: this.tabindex,
      theme: this.theme,
      type: this.type
    });

    super.connectedCallback();
  }

  public attributeChangedCallback(name, oldval, newval) {
    if (this.theme !== "dark" && this.theme !== "light") {
      this.theme = DEFAULT_THEME;
    }

    if (this.type !== "audio" && this.type !== "image") {
      this.type = DEFAULT_TYPE;
    }

    if (isNaN(this.timeout)) {
      this.timeout = DEFAULT_TIMEOUT;
    }

    super.attributeChangedCallback(name, oldval, newval);
  }

  public async disconnectedCallback() {
    unloadReCaptcha();

    super.disconnectedCallback();
  }

  public render() {
    return html`
      ${this.captchaContainer}
    `;
  }

  /**
   * The `reset` method resets the reCaptcha widget.
   */
  public reset() {
    grecaptcha.reset(this.captchaId);
  }

  /**
   * The `response` method gets the response for the reCaptcha widget.
   */
  public get response() {
    return grecaptcha.getResponse(this.captchaId);
  }

  /**
   * The `responseHandler` method will store the response and fire the captcha-response. At least
   * it will dispatch a captcha-response event with the response
   */
  private _responseHandler(response) {
    this.dispatchEvent(
      new CustomEvent("captcha-response", { detail: response })
    );
  }

  /**
   * The `expiredHandler` method fires the captcha-expired event.
   *
   *  @method expiredHandler
   */
  private _expiredHandler() {
    this.dispatchEvent(new CustomEvent("captcha-expired"));
  }
}
