# Demo Import Export
## Export
1. [Material Design Theme Builder](https://m3.material.io/theme-builder#/custom?primary=#cba642)
<!-- todo make the code tag block to toggle between the two instead. i.e. json / yaml / js -->
2. Copy and paste the following into the browser console
    * [Export Full Example](/dev/cheatsheet#export)
<!-- todo save to clipboard in one liner? -->
<<< @/components/consoleExportOneLiner.js
```js
const sampleOuput = { /* by pasting in chrome console */
  primary: '#cba642', secondary: '#8b90a5',
  tertiary: '#7a93b0', neutral: '#837e76'}
```

## Import
1. Custom Core Colors
2. Download JSON / Import into Chrome Puppeteer and Run!
   * todo inject the vue code ()
   <!-- https://vitepress.dev/guide/markdown#import-code-snippets -->
   * generatePuppeteerJSON()
      * [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-vuurgm?file=index.mjs)
```js
const customCoreColors = { /* 1. Input Custom Colors */
  primary: '#cba642', secondary: '#c9a642',
  tertiary: '#c99e42', neutral: '#c9a642'
}
```
<!-- hardcoded for now -->
<!-- <<< @/public/puppJsonReplay/import-colors.json#snippet{1} -->
<details>
  <summary>import-color.json (expand)</summary>

  <<< @/public/puppJsonReplay/import-colors.json
</details>


## Screenshot
* [BrowserStack](https://automate.browserstack.com/dashboard/v2/public-build/dWxIUFBMNG9hOFI3ZkFNano4bERUd1dvTGJPTmZBMlViVFp1ZjM3M1NFVlVISmxTcEQ3QzB2bmIrLzBEcGUvSE11dmJSZTRKUy9ZcjM1dkFLUjZRT0E9PS0tdFY4N3VNWmdxcmZwNW9DVmswc0lkdz09--c2a743318608e93d35f686e906d4edefb5ad04d0)
* [ViewPorts](/dev/readme_material_design_3_import_export_ext.dev.html#viewports-for-screenshot)

