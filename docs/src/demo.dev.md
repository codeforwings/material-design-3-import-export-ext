# Demo Import Export
## Exported List
* [create-shortcuts-demo.md](demos/create-shortcuts-demo.md)
## Export
1. [Material Design Theme Builder](https://m3.material.io/theme-builder#/custom?primary=#cba642)
<!-- todo make the code tag block to toggle between the two instead. i.e. json / yaml / js -->
2. Copy and paste the following into the browser console
    * [Export Full Example](/dev/cheatsheet#export)
<!-- todo save to clipboard in one liner? -->
<<< @/components/consoleExport.min.js
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

### Test
```bash
pnpm run test:browserstack
```

## Screenshot
* [BrowserStack](https://automate.browserstack.com/dashboard/v2/public-build/d0gyUE5NTisySlV2OFVBeEFMQXBTMlJ1WkdmdU5VUUFuWVBrRlpSZGwyVGN2UHIwMEg3WTBpMEFQQTNoRDFwbisvSWFiSlQ3UitRcVFNS1AzZW5xTWc9PS0tSDRzTkRFbzk3N3hwZ0x2OGlyRFhJQT09--df19d14ce04bca38050f297c9e441722fdd10504)
    * https://automate.browserstack.com/dashboard/v2/builds/cd5c00438b6ba744730d1ad7330dac410e1d9ceb
* [ViewPorts](/dev/readme_material_design_3_import_export_ext.dev.html#viewports-for-screenshot)

a[download] {
  /* Add your desired styling for the download link */
  color: blue;
  font-weight: bold;
  text-decoration: underline;
}
