re-captcha
==========

## See the [component page](http://cbalit.github.io/re-captcha/components/re-captcha/) for more information.

BEWARE: THE re-captcha ELEMENT ONLY WORKS IN THE DOM OR LIGHT DOM OF ANOTHER COMPONENT. IT WON'T BE ABLE TO RESOLVE IN THE SHADOW DOM.
You can add an inbody flag to extract the UI part from the component to the body. 
Like this you will be abble to add the re-captcha inside another element. 
But beware that the ui will always be visible even if you hide the re-captcha component
