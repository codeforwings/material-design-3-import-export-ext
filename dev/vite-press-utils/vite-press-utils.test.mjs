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
  const filePath = `dev/vite-press-utils/logs/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
describe('vite-press-utils.test.mjs', function(){
  /**
   * docs/src/public/create-shortcuts/themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png
   * docs/src/public/create-shortcuts/themeM3-#6750A4-#958DA5-#B58392-#939094.json
   * docs/src/public/create-shortcuts/themeM3-#6750A4-#958DA5-#B58392-#939094.light.png
   */
  it('replacePath', function(){
    //assert.strictEqual(1,1);//require assert
    const sampleInput = `docs/src/public/create-shortcuts/themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png
docs/src/public/create-shortcuts/themeM3-#6750A4-#958DA5-#B58392-#939094.json
docs/src/public/create-shortcuts/themeM3-#6750A4-#958DA5-#B58392-#939094.light.png`
    const items = sampleInput.split('\n');
    //quick n dirty - apparently doesnt work for png
    const output = items.map(item => {
      const result = item.replace(/^docs\/src\//,'<<< @/');
      return result;
    });

    console.log(output.join("\n"));
  });
  it('decode url comp',function(){
    /*
    for webstorm when copying... note the relative path
    decodeURIComponent('docs%2Fsrc%2Fpublic%2FpuppJsonReplay%2Fvideo-ac5feafecf40ecdd00dadd4f45403dd8123acc56.mp4')
    'docs/src/public/puppJsonReplay/video-ac5feafecf40ecdd00dadd4f45403dd8123acc56.mp4'
     */
    //can encodeURICOmponent, but the first / must exist
  })
  /**
   <video width="auto" height="auto" controls muted>

   <source src="/puppJsonReplay/video-ac5feafecf40ecdd00dadd4f45403dd8123acc56.mp4" type="video/mp4">

   Your browser does not support the video tag.

   </video>
   */
  it("media assets mp4 img png",function(){
    //assumes /public. so ignore the first part
    //can encodeURICOmponent, but the first / must exist
    /**
     * encodeURIComponent('/viewPortsExamples/16by9_low_rez_1.png')
     * ![16by9_low_rez_1.png](/viewPortsExamples/16by9_low_rez_1.png)
     * ![16by9_low_rez_1.png](/viewPortsExamples%2F16by9_low_rez_1.png)
     * ![16by9_low_rez_1.png]&#40;/viewPortsExamples/16by9_low_rez_1.png&#41;) - this is the one that works
     */
  });
  it('encodeURI',function(){
    const sInput = 'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png';
    // const sInput = 'create-shortcuts/themeM3-#6750A4-#958DA5-#B58392-#939094.light.png';
    // const sInput = 'create-shortcuts/themeM3-6750A4-958DA5-B58392-939094.dark.png';
    const sOutput = '/' + encodeURI(sInput);
    const sOutputComp = '/' + encodeURIComponent(sInput);

    /**
     * Surround with markdown image
     * @param s
     * @return {string}
     */
    function surround(s){
      return `![${s}](${s})`
    }
    console.log(sOutput);
    console.log(sOutputComp);

    console.log(surround(sOutput));
    console.log(surround(sOutputComp));

  });
  it('path to file uri',function() {
    const sInput = import.meta.url;
    console.log(sInput);
    
    
  })
  

});
