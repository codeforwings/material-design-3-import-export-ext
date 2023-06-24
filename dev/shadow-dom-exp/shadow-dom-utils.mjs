/**
 *
 */

/**
 * Simple Util because Chrome doesn't do it for us
 * todo maybe submit a pull request to Chrome, chromium, or puppeteer. so simple
 * @param sDocumentSelector {string} - Example: document.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main")
 *  @return {string[]} - Example: ["body > mio-root > mio-theme-builder > theme-builder","main"]
 *  @example
 *  //should be used as double AoA
 */
export function shadowDomJSPathToAoA(sDocumentSelector){
  /* validate shadow root */
  /* regex to extract all (".*") */
  let querys = [];//maybe add some other quotes shrugs
  const regex = /(?<=[\"\']).*?(?=[\"\'])/g;
  let m;


  while ((m = regex.exec(sDocumentSelector)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // console.log('m.index',m.index,m.length);
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      // console.log('m.index',m.index);
      // console.log(`Found match, group ${groupIndex}: ${match}`);
      /* quick and dirty ignore if strats with ')' */
      if(!match.startsWith(')')){
        querys.push(match);
      }
    });
  }
  return [querys];
}
export default {shadowDomJSPathToAoA}