# re-captcha



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute  | Description                                                                                    | Type                 | Default                                     |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| `language`             | `language` | The language attribute                                                                         | `string`             | `"en"`                                      |
| `sitekey` _(required)_ | `sitekey`  | Your sitekey  (Provided on registration -- see https://developers.google.com/re-captcha/intro) | `string`             | `undefined`                                 |
| `src`                  | `src`      | re-captcha API URL                                                                             | `string`             | `"https://www.google.com/recaptcha/api.js"` |
| `theme`                | `theme`    | The color theme of the widget                                                                  | `"dark" \| "light"`  | `"light"`                                   |
| `timeout`              | `timeout`  | The total time (in milliseconds) to wait for API loading                                       | `number`             | `3000`                                      |
| `type`                 | `type`     | The type of re-captcha to serve                                                                | `"audio" \| "image"` | `"image"`                                   |


## Events

| Event      | Description        | Type               |
| ---------- | ------------------ | ------------------ |
| `expire`   | Captcha expiration | `CustomEvent<any>` |
| `response` | Captcha response   | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
