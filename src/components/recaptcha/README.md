# re-captcha



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                           | Type                 | Default                                     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| `language` | `language` | The language attribute                                                                                                                | `string`             | `""`                                        |
| `sitekey`  | `sitekey`  | Your sitekey  (Provided on registration -- see https://developers.google.com/re-captcha/intro)                                        | `string`             | `""`                                        |
| `src`      | `src`      | re-captcha API URL                                                                                                                    | `string`             | `"https://www.google.com/recaptcha/api.js"` |
| `tabIdx`   | `tab-idx`  | The tabIdx of the widget and challenge  If other elements in your page use tabIdx, this should be set to make user navigation easier. | `number`             | `0`                                         |
| `theme`    | `theme`    | The color theme of the widget                                                                                                         | `"dark" \| "light"`  | `"light"`                                   |
| `timeout`  | `timeout`  | The total time (in milliseconds) to wait for API loading                                                                              | `number`             | `3000`                                      |
| `type`     | `type`     | The type of re-captcha to serve                                                                                                       | `"audio" \| "image"` | `"image"`                                   |


## Events

| Event        | Description        | Type               |
| ------------ | ------------------ | ------------------ |
| `onExpire`   | Captcha expiration | `CustomEvent<any>` |
| `onResponse` | Captcha response   | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
