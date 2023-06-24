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
// /**
//  * Should put this somewhere safe
//  * todo filepath needs to be initialized as well...
//  * @param fileName .json
//  * @param data will automatically be changed
//  */
import fs from 'node:fs';
import path from 'node:path';
import {rmAllFilesFromDir} from "##/lib/node-file-utils/index.mjs";
// function writeToFile(fileName,data,space=2){
//   const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
//   const filePath = `dev/pbs/test/${sFileName}`
//   fs.writeFileSync(filePath,
//     typeof data === 'string' ? data :JSON.stringify(data,null,+space)
//   );
// }

const pathToTestDir = 'temp/node-file-utils-test';
describe('node-file-utils.test.mjs', function(){
  before(function(){
    fs.rmSync(pathToTestDir, { recursive: true,force: true})
    fs.mkdirSync(pathToTestDir, { recursive: true});
    /* generate test files - no folders yet*/
    fs.writeFileSync(path.join(pathToTestDir,'test1.txt'),'test1');
    assert.ok(fs.existsSync(path.join(pathToTestDir,'test1.txt')));
    fs.writeFileSync(path.join(pathToTestDir,'test2.txt'),'test2');
    assert.ok(fs.existsSync(path.join(pathToTestDir,'test2.txt')));
  });
  it('rmAllFilesFromDir', function(){
    //assert.strictEqual(1,1);//require assert
    assert.ok(fs.existsSync(path.join(pathToTestDir,'test1.txt')));
    assert.ok(fs.existsSync(path.join(pathToTestDir,'test2.txt')));
    rmAllFilesFromDir(pathToTestDir);
    assert.ok(!fs.existsSync(path.join(pathToTestDir,'test1.txt')));
    assert.ok(!fs.existsSync(path.join(pathToTestDir,'test2.txt')));
  });
  after(function(){
    fs.rmSync(pathToTestDir, { recursive: true,force: true})
  })

});
