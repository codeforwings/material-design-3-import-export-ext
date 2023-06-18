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
import {resolve} from "node:path";
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
describe('generate-pupp-json.test.mjs', function(){
  it('gen import colors', function(){
    // const expected = fs
    //   .readFileSync('lib/pupp-manual-recordings/example/example.com.json','utf8')
    //   .toString();
    //assert.strictEqual(1,1);//require assert
    const outputFilePath = "import-colors.jsonc";
    const title = "import-colors";
    //---
    const viewPorts = {
      //arg viewport. fix when done

      width: 1024, height: 728, deviceScaleFactor: 1,//higher density, looks odd though
      // width: 3840, height: 2400, deviceScaleFactor: 2,//higher density, looks odd though
    }
    const url = 'https://m3.material.io/theme-builder#/custom';
    const urlTitle = 'Material Design';
    //--
    const steps = [];
    steps.push(new SetViewportStep(viewPorts).toJSON());//fixme update viewports
    steps.push(new NavigationStep(url,urlTitle).toJSON());

    let colorIndex,selector,hexValue='#c2185b'
    colorIndex= 1;
    /* 1. Open Dialog */
    //wasnt working eaerlier... so weird
    selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #source-color`
    steps.push(new WaitForElementStepStep([selector.split('>>>')],{visible:true}).toJSON());
    steps.push(new ClickStep([selector.split('>>>')]).toJSON());
    //maybe verify
    /* 2 Set Value */
    selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #source-hex`;
    steps.push(new WaitForElementStepStep([selector.split('>>>')],{visible:true}).toJSON());
    steps.push(new ChangeMainStep(hexValue,[selector.split('>>>')]).toJSON());
    /* press enter */
    steps.push({
      "type": "keyDown",//keyUp
      "key": "Enter"
    })
    steps.push({
      "type": "keyUp",//keyDown
      "key": "Enter"
    })
    /* 3. Close Dialog - added 10 pixels and it worked? */
    // document.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main > root-page > custom-base").shadowRoot.querySelector("main > section.options > article > div:nth-child(2) > core-colors").shadowRoot.querySelector("section > div.colors > div:nth-child(1) > core-color-input").shadowRoot.querySelector("#root > color-input").shadowRoot.querySelector("#modal-dialog > div.actions > button")
    selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #modal-dialog > div.actions > button`;
    steps.push(new WaitForElementStepStep([selector.split('>>>')],{visible:true}).toJSON());
    steps.push(new ClickStep([selector.split('>>>')]).toJSON());



    const actual = {
      title,steps
    }
    writeToFile(outputFilePath,actual);

    //assert the files are the same
    // assert.deepStrictEqual(actual,JSON.parse(expected));

  });
  /**
   * waits 5 seconds in browser mode
   */
  it('runs json', async function(){
    this.timeout(100000)
    // await runJsonFile(resolve("lib/pupp-manual-recordings/example/example.com.json"));
    await runJsonFile(resolve("lib/samples-test/import-colors.jsonc"));
  })
});
describe('validate basics', function(){
  it('Generate and test basic navigation', function(){
    const expected = fs
      .readFileSync('lib/pupp-manual-recordings/example/example.com.json','utf8')
      .toString();
    //assert.strictEqual(1,1);//require assert
    const title = "example.com";
    const steps = [];
    steps.push(new SetViewportStep().toJSON());
    steps.push(new NavigationStep('https://example.com/','Example Domain').toJSON());
    const actual = {
      title,steps
    }
    writeToFile("basic-navigation-example.json",actual);

    //assert the files are the same
    assert.deepStrictEqual(actual,JSON.parse(expected));

  });
});


describe('steps-pupp-json-lookup.mjs', function(){
  it('SetViewport', function(){
    //assert.strictEqual(1,1);//require assert
    const setViewport = new SetViewportStep();
    assert.deepStrictEqual(setViewport.toJSON(),SetViewPortStepDefaults)
  });
  it('NavigationStep', function(){
    //assert.strictEqual(1,1);//require assert
    const url = 'https://m3.material.io/theme-builder#/custom?primary=#cba642'
    const title = 'Material Design'
    const navigation = new NavigationStep(url,title);
    assert.deepStrictEqual(navigation.toJSON(),NavigationStepDefaults)
    assert.strictEqual(navigation.assertedEvents[0].title,title)
    assert.strictEqual(navigation.assertedEvents[0].type,'navigation')
  });
  it('Click', function(){
    //assert.strictEqual(1,1);//require assert
    const clickStep = new ClickStep();
    assert.deepStrictEqual(clickStep.toJSON(),ClickStepDefaults)
  });
  it('WaitForElementStepStep', function(){
    //assert.strictEqual(1,1);//require assert
    const waitForElementStepStep = new WaitForElementStepStep();
    assert.deepStrictEqual(waitForElementStepStep.toJSON(),WaitForElementStepDefaults)
  });
});
