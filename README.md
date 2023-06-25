# material-design-3-import-export-ext
Basic Material Design 3 Import Export Utility.
# Docs
* [Docs](https://codeforwings.github.io/material-design-3-import-export-ext/)
* [Demo - Import-Export](https://codeforwings.github.io/material-design-3-import-export-ext/demo.html)
<!--
* [Live Demo BrowserStack](https://automate.browserstack.com/dashboard/v2/public-build/VWthWVl2ZUZxc1VHcHdRaFRPRkMyZDM1ZFhna3pZUEF3dE1KS090OGJSYmtUWFgva01TVHA0blE4ajFicTVxM3BtRzJhd01VaXJFa1kwN1hCS0oxWnc9PS0tZlVNM0ZRS2F0UkZPOVJuUER2WnJwUT09--44835d1c307a4abbcbf6f94120ff51b3b569da35)
* [video.mp4](docs%2Fsrc%2Fpublic%2FpuppJsonReplay%2Fvideo-ac5feafecf40ecdd00dadd4f45403dd8123acc56.mp4) -->
# Export - One Liner
1. [Material Design Theme Builder](https://m3.material.io/theme-builder#/custom?primary=#cba642)
2. Open Chrome Console and Copy/Paste the following code
```js
{function o(o,e){return e.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main > root-page > custom-base").shadowRoot.querySelector("main > section.options > article > div:nth-child(2) > core-colors").shadowRoot.querySelector(`section > div.colors > div:nth-child(${o}) > core-color-input`).shadowRoot.querySelector("#root > color-input").shadowRoot.querySelector("div").getAttribute("style").match(/--value: (.+?);/)[1]}let e=[{key:"primary",i:1},{key:"secondary",i:2},{key:"tertiary",i:3},{key:"neutral",i:4}];var t={};for(let{key:r,i:i}of e){let l=o(i,document);t[r]=l}t;}
```
<!-- * [Export Details](https://codeforwings.github.io/material-design-3-import-export-ext/demo.html#export) -->

# Preview
https://github.com/codeforwings/material-design-3-import-export-ext/assets/6209340/3120800d-a682-4697-954e-45fae1a6fe6e

https://github.com/codeforwings/material-design-3-import-export-ext/assets/6209340/615e3456-6b76-482f-8928-5037c8fcbce5




## Background
This is a simple utility to import and export Material Design 3 color palettes.
Figma has a built-in utility to import and export themes, but it's extremely slow or just hangs.

Especially when the builder doesn't allow bookmarking...

* Assuming Chrome console
* Using 'puppeteer-core' to automate the process
  * use 'puppeteer' instead to automate the process if you don't want to link to your profile

<!-- todo add back the rest -->
# Related Links
* [Related Links](https://codeforwings.github.io/material-design-3-import-export-ext/demo.html#related-links)
  * BrowserStack
  <!-- * https://automate.browserstack.com/dashboard/v2/public-build/dWxIUFBMNG9hOFI3ZkFNano4bERUd1dvTGJPTmZBMlViVFp1ZjM3M1NFVlVISmxTcEQ3QzB2bmIrLzBEcGUvSE11dmJSZTRKUy9ZcjM1dkFLUjZRT0E9PS0tdFY4N3VNWmdxcmZwNW9DVmswc0lkdz09--c2a743318608e93d35f686e906d4edefb5ad04d0 -->
  * Stackblitz
  <!-- * https://stackblitz.com/ -->



<!-- # Misc. Snippets

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
``` -->

