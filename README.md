# material-design-3-import-export-ext
Basic Material Design 3 Import Export Utility. 
# One Liners
* [Material Design Theme Builder](https://m3.material.io/theme-builder#/custom?primary=#cba642)
* Export [README.md](docs%2FREADME.md#export)
```js
function m3ExtractColorBy(o,e){let t=e.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main > root-page > custom-base").shadowRoot.querySelector("main > section.options > article > div:nth-child(2) > core-colors").shadowRoot.querySelector(`section > div.colors > div:nth-child(${o}) > core-color-input`).shadowRoot.querySelector("#root > color-input").shadowRoot.querySelector("div").getAttribute("style");return t.match(/--value: (.+?);/)[1]}const M3KeyToQueryIndex=[{key:"primary",i:1},{key:"secondary",i:2},{key:"tertiary",i:3},{key:"neutral",i:4}],themeColors={};for(const{key:o,i:e}of M3KeyToQueryIndex){let t=m3ExtractColorBy(e,document);themeColors[o]=t}console.log(themeColors);
```
* Import using puppeteer
* Only json is supported for import in the browser...
```js

````

## Background
This is a simple utility to import and export Material Design 3 color palettes.
Figma has a built-in utility to import and export themes, but it's extremely slow or just hangs.

Especially when the builder doesn't allow bookmarking...

* Assuming Chrome console
* Using 'puppeteer-core' to automate the process
  * use 'puppeteer' instead to automate the process if you don't want to link to your profile

# Deploy
* BrowserStack
  * https://automate.browserstack.com/dashboard/v2/public-build/dWxIUFBMNG9hOFI3ZkFNano4bERUd1dvTGJPTmZBMlViVFp1ZjM3M1NFVlVISmxTcEQ3QzB2bmIrLzBEcGUvSE11dmJSZTRKUy9ZcjM1dkFLUjZRT0E9PS0tdFY4N3VNWmdxcmZwNW9DVmswc0lkdz09--c2a743318608e93d35f686e906d4edefb5ad04d0
* https://stackblitz.com/



# Misc. Snippets

## Copy to clipboard
```js
/* For console copy, need to copy from dom */
// Create a new textarea element
const textarea = document.createElement('textarea');
textarea.value = "someText";

// Append the textarea to the page
document.body.appendChild(textarea);

// Select the text within the textarea
textarea.select();

// Copy the selected text to the clipboard
document.execCommand('copy');
```

