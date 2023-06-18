# material-design-3-import-export-ext
Basic Material Design 3 Import Export Utility. 

# One Liners
* Export [README.md](docs%2FREADME.md#export)
```js
function m3ExtractColorBy(o,e){let t=e.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main > root-page > custom-base").shadowRoot.querySelector("main > section.options > article > div:nth-child(2) > core-colors").shadowRoot.querySelector(`section > div.colors > div:nth-child(${o}) > core-color-input`).shadowRoot.querySelector("#root > color-input").shadowRoot.querySelector("div").getAttribute("style");return t.match(/--value: (.+?);/)[1]}const M3KeyToQueryIndex=[{key:"primary",i:1},{key:"secondary",i:2},{key:"tertiary",i:3},{key:"neutral",i:4}],themeColors={};for(const{key:o,i:e}of M3KeyToQueryIndex){let t=m3ExtractColorBy(e,document);themeColors[o]=t}console.log(themeColors);
```
* Import using puppeteer
```js

````

## Background
[Material Theme Builder](Material Theme Builder)

This is a simple utility to import and export Material Design 3 color palettes.
Figma has a built-in utility to import and export themes, but it's extremely slow or just hangs.

Especially when the builder doesn't allow bookmarking...

* Assuming Chrome console
* Using 'puppeteer-core' to automate the process
  * use 'puppeteer' instead to automate the process if you don't want to link to your profile

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

