/**
 yarn add mocha -D

 package.json
 "imports": {
    "##/*": {
      "default": "./*"
    },
  },
 "type": "module",

 jsconfig.json
 {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "##/*": ["./*"]
    }
  },
  "exclude": ["node_modules", ".nuxt", "dist"]
}



 */
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const assert = require('assert');
// const {describe,it} = require('mocha');
import assert from 'node:assert';
import { describe, it} from 'mocha';
/*
1.
yarn add mocha @babel/polyfill @babel/register @babel/preset-env babel-plugin-module-resolver --dev
yarn add @babel/core --dev
2.
-r @babel/register -r babel-plugin-module-resolver

3.
.babelrc
{

  "presets": ["@babel/preset-env"],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "test": "./test",
        "underscore": "lodash",

        "~": "./"
      }
    }]
  ]

}
test specific timeout
this.timeout(500);//500ms
*/
/**
 * Should put this somewhere safe
 * todo filepath needs to be initialized as well...
 * @param fileName .json
 * @param data will automatically be changed
 */
import fs from 'node:fs';
import {CoreColorsScreenShotList} from "##/lib/MaterialDesignThemeColorsList.mjs";
import {generateScreenshotsFileNames} from "#src/create-screenshots/generateScreenshotsFileNames.mjs";
import {encodeURIComponentForVitePress} from "##/dev/vite-press-utils/index.mjs";
import {DefaultCoreColors} from "##/lib/materialDesignThemeColorConstants.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/vite-press-utils/logs/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

/**
 *
 * @param coreColor {MaterialThemeCoreColors}
 * @param templateFile {string} - probably better to make a class or w/e to cache the file
 * @returns - writes to file
 * filename might be needed. but maybe later / or factory function / closure
 */
function createOneMdSection(coreColor,templateFile){
    let prefix = generateScreenshotsFileNames(coreColor).prefix;
    let copy = templateFile
      .replace(/TERTIARY_COLOR/g,coreColor.tertiary)
      .replace(/ENCODED_PATH/g,encodeURIComponentForVitePress(prefix))
      .replace(/PREFIX/g,prefix)
      .replace(/CORE_COLORS_JSON/g,JSON.stringify(coreColor))
    ;
    return copy;
}
/**
 * Note the anchor
 */
describe('create-shortcuts-generate-md.test.mjs', function(){

  //small enough not to matter
  let templateFile = fs
    .readFileSync("dev/vite-press-utils/create-shortcuts-generate-md/create-shortcuts-template.md")
    .toString();
  /**
   * Since we're only changing Tertiary colors, we can just use the default colors
   <a target="_blank" href="/puppJsonReplay/import-colors.json" download><span>import-colors.json<svg class="feather feather-download downloadIcon icon" id="dlIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >  <path d="M21 15v4.5c0 .8-.7 1.5-1.5 1.5h-15c-.8 0-1.5-.7-1.5-1.5V15" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg></span></a>
   <a target="_blank" href="/puppJsonReplay/import-colors.json" download><span>import-colors.json<svg class="feather feather-download downloadIcon icon"><use xlink:href="#dlIcon"></use></svg></span></a>
   */

  /**
   * Replace
   * 1. TERTIARY_COLOR
   * 2. ENCODED_PATH
   * 3. PREFIX
   * 4. CORE_COLORS_JSON - JSON of all the colors
   */
  it('replace 1',function() {
    /** @type {MaterialThemeCoreColors} */
    // const coreColor = CoreColorsScreenShotList[0];
    const coreColor = DefaultCoreColors;
    const copy = createOneMdSection(coreColor,templateFile);
    assert.strictEqual(copy,fs.readFileSync("dev/vite-press-utils/create-shortcuts-generate-md/samples/create-shortcuts-template-1.md").toString())
    // writeToFile('create-shortcuts-template-1.md',templateFile)
    writeToFile('create-shortcuts-template-1.md',copy)

    
    
  })
  it('create all others',function() {
    /** @type {string[]} */
    const lazyStringArr = [];
    //skipping first(custom) and last(default)
    for (let i = 1; i < CoreColorsScreenShotList.length - 1; i++) {
    /** @type {MaterialThemeCoreColors} */
      const coreColor = CoreColorsScreenShotList[i];
      const copy = createOneMdSection(coreColor,templateFile);
      lazyStringArr.push(copy);

    }

    writeToFile('create-shortcuts-template-others.md',lazyStringArr.join('\n'));

  })
  

});
