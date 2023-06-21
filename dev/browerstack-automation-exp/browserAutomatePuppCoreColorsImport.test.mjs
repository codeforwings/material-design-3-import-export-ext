/**
 * More for experimentation
 * maybe should move to test folder later
 */
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
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

const caps = {
  'browser': 'chrome',  // You can choose `chrome`, `edge` or `firefox` in this capability
  'browser_version': 'latest',  // We support v83 and above. You can choose `latest`, `latest-beta`, `latest-1`, `latest-2` and so on, in this capability
  // 'os': 'os x',
  //     'os_version': 'big sur',
  //https://www.browserstack.com/automate/capabilities
  "os" : "Windows",
  "osVersion" : "11",
  "tz": "America/New_York",
  "resolution": "1920x1080",//leaving this one alone
  'build': 'material-design-3-import-export-ext-build-1',
  'name': 'Import CoreColors From JSON',  // The name of your test and build. See browserstack.com/docs/automate/puppeteer/organize tests for more details
  // 'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  // 'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  'browserstack.username': "codeforwings_hychan48_github",
  'browserstack.accessKey': 'someAPIKey',
};
const expectedWSSForDemo = `wss://cdp.browserstack.com/puppeteer?caps=%7B%22browser%22%3A%22chrome%22%2C%22browser_version%22%3A%22latest%22%2C%22os%22%3A%22Windows%22%2C%22osVersion%22%3A%2211%22%2C%22tz%22%3A%22America%2FNew_York%22%2C%22resolution%22%3A%221920x1080%22%2C%22build%22%3A%22material-design-3-import-export-ext-build-1%22%2C%22name%22%3A%22Import%20CoreColors%20From%20JSON%22%2C%22browserstack.username%22%3A%22codeforwings_hychan48_github%22%2C%22browserstack.accessKey%22%3A%22someAPIKey%22%7D`
import {URLSearchParams} from 'node:url';
import {
  demoDuckDuckGo,
  importJsonCoreColors
} from "##/dev/browerstack-automation-exp/browserAutomatePuppCoreColorsImport.mjs";
describe('wss caps url confirmation', function(){
  it('caps url from demo', function(){
    //assert.strictEqual(1,1);//require assert
    // The BrowserStack CDP endpoint gives you a `browser` instance based on the `caps` that you specified
    let out = `wss://cdp.browserstack.com/puppeteer?caps=${encodeURIComponent(JSON.stringify(caps))}`
    assert.strictEqual(out,expectedWSSForDemo)
  });
    it('URLsearchParams cleaner browser way', function(){
    //assert.strictEqual(1,1);//require assert
    // The BrowserStack CDP endpoint gives you a `browser` instance based on the `caps` that you specified
      /** @type {URLSearchParams} */
      const queryParams = new URLSearchParams(caps)
      let out = `wss://cdp.browserstack.com/puppeteer?caps=${queryParams.toString()}`
      assert.notStrictEqual(out,expectedWSSForDemo);
      //same syntax as chrome. so yea. BrowserStack is literlaly taking a json string
      //okay fails..., different format / escaping... wonder if it would work
  });

});


/**
 * https://automate.browserstack.com/dashboard/v2/builds/cd5c00438b6ba744730d1ad7330dac410e1d9ceb/sessions/9560c91a31388d4f47a41ee45c5e60c3f0313493
 */
describe('browserAutomatePuppCoreColorsImport.test.mjs', function(){
  it.skip('demoDuckDuckGo', async function(){
    this.timeout(30000)
    await demoDuckDuckGo()
  });
  /**
   * it works but it's super slow
   */
  it('importJsonCoreColors browerstack', async function(){
    this.timeout(300000);//todo change the timeout and update the viewports etc. + screenshot
    await importJsonCoreColors()
  });


});
