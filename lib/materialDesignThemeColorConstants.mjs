/**
 * @typedef {string} HexColor
 * @description A hexadecimal color value (e.g., "#6750A4").
 */

/**
 * Default colors defined from materials.
 * @typedef {Object.<string, HexColor>} MaterialThemeCoreColors
 * @property {HexColor} primary - The primary color.
 * @property {HexColor} secondary - The secondary color.
 * @property {HexColor} tertiary - The tertiary color.
 * @property {HexColor} neutral - The neutral color.
 *
 * @description The default colors defined from materials.
 * primary: '#6750A4',secondary: '#958da4',tertiary: '#b58392',neutral: '#938f94',
 * As of 2021-05-05, these are the default colors from the material design theme builder
 * https://m3.material.io/theme-builder#/custom?primary=#cba642
 * used for validation
 */
/**
 * @type {MaterialThemeCoreColors}
 */
export const defaultFromMaterials = {
  primary: '#6750A4',//fixme maybe
  secondary: '#958da4',//weird... a4 vs a5
  tertiary: '#b58392',
  neutral: '#938f94',//
};
/**
 * @type {MaterialThemeCoreColors}
 */
export const DefaultCoreColors = {
  primary: '#6750A4',
  secondary: '#958DA5',
  tertiary: '#B58392',
  neutral: '#939094',//weird... did this change?
};

/**
 * @type {MaterialThemeCoreColors}
 */
export const sampleCoreColorsTheme = {
  primary: '#cba642',
  secondary: '#8b90a5',
  tertiary: '#426cba',
  neutral: '#959088',
};
const NeutralBug = {
  ourNeutral: '#837e76',
  neutral: '#959088'
}
/**
todo
   ourNeutral: '#837e76', currently m3 cannot change neutral color without breaking...
   neutral: '#959088',//close enough to our version

 */
export const oldCoreColorsThemeV0 = {
  primary: '#cba642',
  secondary: '#8b90a5',
  tertiary: '#7a93b0',
  neutral: '#837e76',
};
/**
 * lazy mapping, basically i + 1 of the index
 * @type {[{i: number, key: string},{i: number, key: string},{i: number, key: string},{i: number, key: string}]}
 */
export const M3KeyToQueryIndex = [
  { key: 'primary', i: 1 },
  { key: 'secondary', i: 2 },
  { key: 'tertiary', i: 3 },
  { key: 'neutral', i: 4 }
];
  /**
   * @typedef {Object} MaterialThemeCoreColorsIndex
   * @enum {number}
   */

  /**
   * Enum-like object for M3KeyToQueryIndex.
   * @type {MaterialThemeCoreColorsIndex}
   */
export const CCI = {
  primary: 1,
  secondary: 2,
  tertiary: 3,
  neutral: 4
};

/**
 * Just for reference. shows how to convert shadowroot to >>> selector for puppeteer
 * @param page
 * @return {Promise<void>}
 */
async function workingPathPure(page){
      const selector = 'body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(1) > core-color-input >>> #root > color-input >>> div';
      const hexElement = await page.$(selector);
      const styleAttr = await hexElement.evaluate((element) => element.getAttribute('style'));
      // console.log(styleAttr); --value: #6750A4; --color: #6750A4; --size: 48px; flex-direction: row;
      return styleAttr; //#6750A4
}