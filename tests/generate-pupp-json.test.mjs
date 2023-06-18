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
  ClickStep, ClickStepDefaults,
  NavigationStep,
  NavigationStepDefaults,
  SetViewportStep,
  SetViewPortStepDefaults, WaitForElementStepDefaults, WaitForElementStepStep
} from "##/src/generate-pupp-json/steps-pupp-json-lookup.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `lib/samples-test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
describe('generate-pupp-json.test.mjs', function(){
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
