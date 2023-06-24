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
import {CreateScreenshots} from "#src/create-screenshots/create-screenshots.mjs";
import {ViewPort1080p} from "##/lib/pupp-consts/viewPortsConstants.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

/**
 * Very similar to import-material-theme-pup.test.mjs
 */
describe('create-screenshots.test.mjs', function(){
  it('CreateScreenshots constructor', async function(){
    //this.timeout(500);
    const createScreenshots = new CreateScreenshots([],null)
    console.log(createScreenshots);
  });
});

describe('create-screenshots.test.mjs constructor', function(){
  it('CreateScreenshots defaults', async function(){
    //this.timeout(500);
    const createScreenshots = new CreateScreenshots([],null)
    console.log(createScreenshots);
  });
  it('CreateScreenshots viewport 1080p', async function(){
    //this.timeout(500);
    const createScreenshots = new CreateScreenshots([],null, ViewPort1080p)
    // console.log(createScreenshots);
    assert.deepStrictEqual(createScreenshots.viewPort, ViewPort1080p);
  });
});