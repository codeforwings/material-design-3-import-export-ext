# Dev Notes
* Personally just hope they'll integrate it into the Material Theme Builder...
* Chrome Ext may follow
  * Open source / free to use
* Other colors etc.
  * "Extended Colors"
  * Dynamic Colors
* Puppeteer
  * should add cheatsheet or template for shadow dom...
* Add workflow / browserify
* Review modern 'copy to clipboard' best practices / security
* can technical use headless to just take screenshots...???

# Puppeteer
* https://yarnpkg.com/package/@puppeteer/replay
  * for import / export?
  * can i combine them?
  * to think about later
```js

```

# Links
[Minifier](https://www.toptal.com/developers/javascript-minifier)
* private project with more notes:
  * [material3-theme-builder-helper-ext](..%2F..%2Fmaterial3-theme-builder-helper-ext)

## BrowserStack automation puppeteer ci/cd
* BROWSERSTACK_ACCESS_KEY
* https://www.browserstack.com/
  * https://www.browserstack.com/docs/automate/puppeteer
  * chai vs mocha?
  * https://automate.browserstack.com/dashboard/v2/builds/4b2df68f639c826c54d5e783aa1af13e3e2172f6
  * https://automate.browserstack.com/dashboard/v2/public-build/dWxIUFBMNG9hOFI3ZkFNano4bERUd1dvTGJPTmZBMlViVFp1ZjM3M1NFVlVISmxTcEQ3QzB2bmIrLzBEcGUvSE11dmJSZTRKUy9ZcjM1dkFLUjZRT0E9PS0tdFY4N3VNWmdxcmZwNW9DVmswc0lkdz09--c2a743318608e93d35f686e906d4edefb5ad04d0

# Xpath Expermients
```js
// Example XPath expression
var xpathExpression = '/html/body/mio-root/mio-theme-builder/theme-builder//main/root-page/custom-base//main/section[1]/article/div[2]/core-colors//section/div[1]/h2';

// Retrieve the first matching element
var element = $x(xpathExpression)[0];

console.log(element);
console.log(element.textContent);

$x('/html/body/mio-root/mio-theme-builder/theme-builder')
$x('/html/body/mio-root/mio-theme-builder/theme-builder').shadowRoot

$('body > mio-root > mio-theme-builder > theme-builder')
$('pierce/body > mio-root > mio-theme-builder > theme-builder')
// weird how relay doesnt handle it
document.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main")

// "main > header > div.section.header-left > span"
//differene between [[ and [?
// document.querySelectorAll([
document.querySelector([
  "body > mio-root > mio-theme-builder > theme-builder",
  "main > header > div.section.header-left > span"
])
```