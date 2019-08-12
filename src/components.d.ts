/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface ReCaptcha {
    /**
    * The language attribute
    */
    'language': string;
    /**
    * Your sitekey  (Provided on registration -- see https://developers.google.com/re-captcha/intro)
    */
    'sitekey': string;
    /**
    * re-captcha API URL
    */
    'src': string;
    /**
    * The tabIdx of the widget and challenge  If other elements in your page use tabIdx, this should be set to make user navigation easier.
    */
    'tabIdx': number;
    /**
    * The color theme of the widget
    */
    'theme': "dark" | "light";
    /**
    * The total time (in milliseconds) to wait for API loading
    */
    'timeout': number;
    /**
    * The type of re-captcha to serve
    */
    'type': "image" | "audio";
  }
}

declare global {


  interface HTMLReCaptchaElement extends Components.ReCaptcha, HTMLStencilElement {}
  var HTMLReCaptchaElement: {
    prototype: HTMLReCaptchaElement;
    new (): HTMLReCaptchaElement;
  };
  interface HTMLElementTagNameMap {
    're-captcha': HTMLReCaptchaElement;
  }
}

declare namespace LocalJSX {
  interface ReCaptcha extends JSXBase.HTMLAttributes<HTMLReCaptchaElement> {
    /**
    * The language attribute
    */
    'language'?: string;
    /**
    * Captcha expiration
    */
    'onOnExpire'?: (event: CustomEvent<any>) => void;
    /**
    * Captcha response
    */
    'onOnResponse'?: (event: CustomEvent<any>) => void;
    /**
    * Your sitekey  (Provided on registration -- see https://developers.google.com/re-captcha/intro)
    */
    'sitekey'?: string;
    /**
    * re-captcha API URL
    */
    'src'?: string;
    /**
    * The tabIdx of the widget and challenge  If other elements in your page use tabIdx, this should be set to make user navigation easier.
    */
    'tabIdx'?: number;
    /**
    * The color theme of the widget
    */
    'theme'?: "dark" | "light";
    /**
    * The total time (in milliseconds) to wait for API loading
    */
    'timeout'?: number;
    /**
    * The type of re-captcha to serve
    */
    'type'?: "image" | "audio";
  }

  interface IntrinsicElements {
    're-captcha': ReCaptcha;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


