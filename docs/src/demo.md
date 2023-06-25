# Demo Import Export
## Export - Chrome Console
1. Launch and open console: [Material Design Theme Builder](https://m3.material.io/theme-builder#/custom?primary=#cba642)
2. Copy and paste the following into the browser console. Grab the output
:::code-group
<<< @/components/consoleExport.min.js

<<< @/components/consoleExport.js
```js [sampleOutput.json]
/* Chrome console output */
const sampleOutput = { 
  primary: '#6750A4',
  secondary: '#958DA5',
  tertiary: '#B58392',
  neutral: '#939094'
}
```
:::
![chrome-console-export.png](/puppJsonReplay/chrome-console-export.png)

## Import - Chrome Recorder JSON
1. Open Chrome Console
2. Upload <a target="_blank" href="/puppJsonReplay/import-colors.json" download>import-colors.json</a>
3. `Recorder` -> `Import recording` -> `Replay`

<video width="auto" height="auto" controls muted preload="auto">
  <source src="/puppJsonReplay/material_theme_design_json_2023-06-21 23-57-51.mp4" 
    type="video/mp4" alt="Material Theme Import JSON with Puppeteer Windows Chrome">
  Your browser does not support the video tag.
</video>

[//]: # (66)
:::details Details - import-colors.json - lines: [66, 170, 274, 378]
:::code-group
<<< @/public/puppJsonReplay/import-colors.json {66,170,274,378 json:line-numbers}

``` [Material Design Bugs]
Updating Neutral Color is Currently bugged for Dark-Theme
```
:::

Related Links
---
## Playground
* [Playground](demos/create-shortcuts-demo.md)
## Sample Themes
* [Exported Sample Themes](demos/create-shortcuts-demo.md)

## Stackblitz 
1. [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-vuurgm?file=index.mjs)
2. Custom Core Colors
3. Download JSON / Import into Chrome Puppeteer and Run!
   <!-- * todo inject the vue code () -->
   <!-- https://vitepress.dev/guide/markdown#import-code-snippets -->
   <!-- * generatePuppeteerJSON() -->

![StackBlitz Demo](/puppJsonReplay/stackblitz-generate-json.png)

[//]: # (      [stackblitz-starters-vuurgm.zip]&#40;public%2FpuppJsonReplay%2Fstackblitz-starters-vuurgm.zip&#41;)

## BrowserStack Dashboard
* [BrowserStack Dashboard](https://automate.browserstack.com/dashboard/v2/public-build/d0gyUE5NTisySlV2OFVBeEFMQXBTMlJ1WkdmdU5VUUFuWVBrRlpSZGwyVGN2UHIwMEg3WTBpMEFQQTNoRDFwbisvSWFiSlQ3UitRcVFNS1AzZW5xTWc9PS0tSDRzTkRFbzk3N3hwZ0x2OGlyRFhJQT09--df19d14ce04bca38050f297c9e441722fdd10504)
* [BrowserStack Demo Session](https://automate.browserstack.com/dashboard/v2/builds/cd5c00438b6ba744730d1ad7330dac410e1d9ceb/sessions/ac5feafecf40ecdd00dadd4f45403dd8123acc56)

<video width="auto" height="auto" controls muted preload="auto" alt="BrowserStack Demo Video MacOS Chrome">
  <source src="/puppJsonReplay/video-ac5feafecf40ecdd00dadd4f45403dd8123acc56.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

[//]: # (should generate the thumbnail video as the dashboard...)
[//]: # (* [ViewPorts]&#40;/dev/readme_material_design_3_import_export_ext.dev.html#viewports-for-screenshot&#41;)
