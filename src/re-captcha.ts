import { customElement, html, LitElement, property } from "lit-element";

declare var grecaptcha: ReCaptcha;

interface ReCaptcha {
  [key: string]: any;
}

@customElement("re-captcha")
export class MyElement extends LitElement {
  /**
   * The total time (in milliseconds) to wait for API loading
   */
  @property({ type: Number })
  public timeout = 3000;

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
  public theme = "light";

  /**
   * The type of reCaptcha to serve (`image` or `audio`)
   */
  @property({ type: String })
  public type = "image";

  /**
   * The tabindex of the widget and challenge
   *
   * If other elements in your page use tabindex, this should be set to make user navigation easier.
   */
  @property({ type: Number })
  public tabindex = 0;

  /**
   * The lang attribute
   */
  @property({ type: String })
  public lang = "";

  /**
   * Current Captcha session ID
   */
  private _captchaId;

  public async connectedCallback() {
    // Await reCaptcha to load
    await new Promise(resolve => grecaptcha.ready(() => resolve()));

    // Create a drop zone for reCaptcha render
    const element = document.createElement("div");
    element.setAttribute("id", "g-recaptcha");

    // Render reCaptcha
    this._captchaId = await grecaptcha.render(element, {
      callback: this._responseHandler.bind(this),
      "expired-callback": this._expiredHandler.bind(this),
      sitekey: this.sitekey,
      tabindex: this.tabindex,
      theme: this.theme,
      type: this.type
    });

    // Append drop zone
    this.shadowRoot.appendChild(element);
  }

  /**
   * The `reset` method resets the reCaptcha widget.
   */
  public reset() {
    grecaptcha.reset(this._captchaId);
  }

  /**
   * The `response` method gets the response for the reCaptcha widget.
   */
  public get response() {
    return grecaptcha.getResponse(this._captchaId);
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
