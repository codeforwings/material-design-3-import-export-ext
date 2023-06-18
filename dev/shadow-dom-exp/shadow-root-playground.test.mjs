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
import {resolve,normalize} from "node:path";
import fs from 'node:fs';
import {
  ChangeMainStep,
  ClickStep, ClickStepDefaults,
  NavigationStep,
  NavigationStepDefaults,
  SetViewportStep,
  SetViewPortStepDefaults, WaitForElementStepDefaults, WaitForElementStepStep
} from "##/src/generate-pupp-json/steps-pupp-json-lookup.mjs";
import {runJsonFile} from "##/src/pupp-replay-runner-json/index.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `lib/samples-test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
const title = "shadow-dom-playground-replay"
const jsonFilePathToRun ='lib/samples-test/shadow-dom-playground-replay.json'
const jsonFileName ='shadow-dom-playground-replay.json'

describe('shadow-root-playground.test.mjs', function(){
  it('shadow-dom-playground-replay.json', function(){
    const outputFilePath =jsonFilePathToRun;
    console.log(jsonFilePathToRun);
    //---
    const viewPorts = {
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
    }
    const url = "file:///C:/Users/Jason/WebstormProjects/material-design-3-import-export-ext/dev/shadow-dom-exp/shadow-dom-playground.html"
    const urlTitle = 'Shadow Dom Playground';
    //--
    const steps = [];
    steps.push(new SetViewportStep(viewPorts).toJSON());//fixme update viewports
    steps.push(new NavigationStep(url,urlTitle).toJSON());

    /* experiment */

    let selector = ``,selectors=[],newValue=``;
    newValue='A';selector = "pierce/input";
    steps.push(new WaitForElementStepStep([selector]).toJSON());
    steps.push(new ChangeMainStep(newValue,[selector]).toJSON());//maybe add verify?

    /**
     * $('#a > div').shadowRoot.querySelector('input')
     * $('#a > div').shadowRoot.querySelector('input').setAttribute('value','asdf')
     * @type {string}
     */
    newValue = 'B';
    selector = "pierce/input >>> input"
    // "# a > div >>> input",//have to seperate the array.
    //exact syntax
    selectors = [
      [
      "#a > div",
      "input",//both work...
      // ">>>input",//works too. without pierce
      ],
    ]
    // selectors=[["pierce/#a > div >> input"]]//nope
    // selectors=[["pierce/#a > div >>> input"]]//nope
    selectors=[["#a > div >>> input"]]//works..., why wasnt it working before? too nested?
    steps.push(new WaitForElementStepStep(selectors).toJSON());
    steps.push(new ChangeMainStep(newValue,selectors).toJSON());//maybe add verify?

    /**
     * document.querySelector("#a > div").shadowRoot.querySelector("div").shadowRoot.querySelector("input")
     * @type {string}
     */
    newValue = 'C';
    selectors=[["#a > div >>> div >>> input"]]//works..., why wasnt it working before? too nested?
    steps.push(new WaitForElementStepStep(selectors).toJSON());
    steps.push(new ChangeMainStep(newValue,selectors).toJSON());//maybe add verify?




    const actual = {
      title,steps
    }
    writeToFile(jsonFileName,actual);

    //assert the files are the same
    // assert.deepStrictEqual(actual,JSON.parse(expected));

  });
  /**
   * waits 5 seconds in browser mode
   */
  it('runs json', async function(){
    this.timeout(100000)
    await runJsonFile(resolve(jsonFilePathToRun));
  })
});


