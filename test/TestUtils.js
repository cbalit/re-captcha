/**
 * Created by adzs637 on 03/12/2014.
 */
var Utils={
  createReCaptcha : function (options, noKey) {
    var options = options || {};
    if (!noKey) {
      options.sitekey = "6LdRcP4SAAAAAJ4Dq1gXcD9AyhzuG77iz7E2Dmu4";
    }
    var recaptcha = new Recaptcha();
    for (var name in options) {
      recaptcha.setAttribute(name, options[name]);
    }
    document.body.appendChild(recaptcha);
    return recaptcha;
  },
  getReCaptchaScriptTag : function () {
    var script = document.querySelector("script[src='" + Recaptcha.prototype._API_URL + "']");
    return script;
  }
};
