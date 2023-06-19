# Developer Notes
## Outstanding
1. push to codepen / stackblitz
2. Send Link
   1. json import creator
   2. export cli maybe clipboard
3. Icon / Logo

* Append / Clean up other notes. especially about this code
* Link to other repo
4. Add tree folder for vitepress...
* really need consolidate a cheatsheet repo
5. shadowDom / refactor to it's own repo or something


## Dev Notes
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

## Puppeteer
* https://yarnpkg.com/package/@puppeteer/replay
  * for import / export?
  * can i combine them?
  * to think about later

## Links
* [Minifier](https://www.toptal.com/developers/javascript-minifier)
  * for chrome. console.log wont show. just need to print t;
* [beautifier](https://beautifier.io/)
  * Expand JS for easier reading
 
* private project with more notes:

[//]: # (  * [material3-theme-builder-helper-ext]&#40;..%2F..%2Fmaterial3-theme-builder-helper-ext&#41;)

## BrowserStack automation puppeteer ci/cd
* BROWSERSTACK_ACCESS_KEY
* https://www.browserstack.com/
  * https://www.browserstack.com/docs/automate/puppeteer
  * chai vs mocha?
  * https://automate.browserstack.com/dashboard/v2/builds/4b2df68f639c826c54d5e783aa1af13e3e2172f6
  * https://automate.browserstack.com/dashboard/v2/public-build/dWxIUFBMNG9hOFI3ZkFNano4bERUd1dvTGJPTmZBMlViVFp1ZjM3M1NFVlVISmxTcEQ3QzB2bmIrLzBEcGUvSE11dmJSZTRKUy9ZcjM1dkFLUjZRT0E9PS0tdFY4N3VNWmdxcmZwNW9DVmswc0lkdz09--c2a743318608e93d35f686e906d4edefb5ad04d0

## Xpath Experiments
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

## ViewPorts for screenshot
* 16by10 seems to be the best (Devs probably using Macs)
```js
/* should only use it for the screenshots */
const viewPorts = {
  width: 3840, height: 2400, deviceScaleFactor: 2,//higher density, looks odd though
};
```
### high rez
![16by9_1.png](/viewPortsExamples/16by10_2.png)
### low rez
![16by9_low_rez_1.png](/viewPortsExamples/16by9_low_rez_1.png)