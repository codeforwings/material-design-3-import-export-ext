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
import {
  CreateScreenshots,
  generateScreenshotsFileNames, getCoreColorFromFileNames
} from "#src/create-screenshots/create-screenshots.mjs";
import {ViewPort1080p, ViewPort8k} from "##/lib/pupp-consts/viewPortsConstants.mjs";
import {DefaultCoreColors, sampleCoreColorsTheme} from "##/lib/materialDesignThemeColorConstants.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

/**
 * Very similar to import-material-theme-pup.test.mjs
 *
 * mkdir temp/create-screenshots
 * mkdir -p temp/create-screenshots
 */
describe('create-screenshots.test.mjs', function(){
  /* Inputs */
  let coreColors=[];
  let browser;
  /*-*/
  let createScreenshots;
  before(function(){

    createScreenshots = new CreateScreenshots(coreColors,browser)
  });
  it('CreateScreenshots validate before()', async function(){
    this.timeout(100000);
    console.log(createScreenshots);
  });
});


/**
 * Just Testing and checking default settings needed
 */
describe('create-screenshots.test.mjs constructor', function(){
  it('CreateScreenshots defaults', async function(){
    //this.timeout(500);
    const createScreenshots = new CreateScreenshots([],null)
    assert.deepStrictEqual(createScreenshots.viewPort, ViewPort8k);
    console.log(createScreenshots);
  });
  it('CreateScreenshots viewport 1080p', async function(){
    //this.timeout(500);
    const inputViewPort = ViewPort1080p;
    const createScreenshots = new CreateScreenshots([],null, inputViewPort)
    assert.deepStrictEqual(createScreenshots.viewPort, inputViewPort);
  });
});
describe('create-screenshots.test.mjs generic tests', function(){

  /**
   * based on color scheme... have dark mode and light mode
   */
  it('generateScreenshotsFileNames', function(){
    //this.timeout(500);
    let inputColor = DefaultCoreColors
    let expected = {
      light:'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png',
      dark:'themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png',
    };
    const actual = generateScreenshotsFileNames(inputColor);
    assert.deepStrictEqual(actual, expected);

  });
  it('generateScreenshotsFileNames custom', function(){
    //this.timeout(500);
    let inputColor = sampleCoreColorsTheme;
    let expected = {
      light:'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png',
      dark:'themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png',
    };
    const actual = generateScreenshotsFileNames(inputColor);
    //lazy assert
    assert.notDeepStrictEqual(actual, expected);

  });
  it('getCoreColorFromFileNames', function(){
    //this.timeout(500);
    let inputObj = {
      light:'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png',
      dark:'themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png',
    };
    const expected = DefaultCoreColors;
    /** @type {MaterialThemeCoreColors} */
    let actual
    actual = getCoreColorFromFileNames(inputObj);
    assert.deepStrictEqual(actual, expected);
    actual = getCoreColorFromFileNames(inputObj.dark);
    assert.deepStrictEqual(actual, expected);
    actual = getCoreColorFromFileNames(inputObj.light);
    assert.deepStrictEqual(actual, expected);

  });

});