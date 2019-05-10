import { customElement, html, LitElement, property } from "lit-element";

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
  public sitekey = "";

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
   * The response from the reCaptcha API
   */
  @property({ type: String })
  public response = "";

  /**
   * The lang attribute
   */
  @property({ type: String })
  public lang = "";

  /**
   * Experimental flag to insert the captcha in the body. This will allow to use the captcha in the dom of another component
   * but the captcha (UI) doesn't belong anymore to the component so hiding or moving the recaptcha doesn't affect the ui
   */
  @property({ type: Boolean })
  public inbody = false;

  public render() {
    return html`
      hello re-captcha
    `;
  }
}
