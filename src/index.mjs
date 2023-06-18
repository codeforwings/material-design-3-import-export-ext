/**
 * Maybe just for taking a screenshot(s)
 */

/**
 * Basic JSPath to extract the color values from Material Theme Design
 * @param _document {Document}
 * @return themeColors {MaterialThemeCoreColors} @link{MaterialThemeCoreColors}
 * @sample
 * Will be used in chrome... so will be converted to a string
 */
export function exportCoreColorsUsingChrome(_document){
  //quick and dirty check... dont really needed
  // check if document is defined or not (chrome) or use the document passed in
  const windowDocument = document ?? _document;


  //verify document
  /**
   * Copy and paste this into the console of the theme builder
   * or can export to a file... but that's zipped...
   * if it's just seed color i think it's also very different?
   * https://m3.material.io/theme-builder#/custom?primary=#cba642
   * @example
   * export const defaultFromMaterials ={
   *   primary: '#6750A4',
   *   secondary: '#958da4',
   *   tertiary: '#b58392',
   *   neutral: '#938f94',
   * }
   */

  /**
   * Using JSPath from Chrome DevTools to extract the color values
   * @param queryIndex {number} - 1,2,3,4 for primary,secondary,tertiary,neutral
   * @param document {Document} - window.document (chrome)
   * @return {string} - Color Hex Value - Example #6750A4
   * @example
   * const color = m3ExtractColorBy(1,document);
   */
  function m3ExtractColorBy(queryIndex,document){
    const m3AttributeStyle = document.querySelector("body > mio-root > mio-theme-builder > theme-builder")
      .shadowRoot.querySelector("main > root-page > custom-base")
      .shadowRoot.querySelector("main > section.options > article > div:nth-child(2) > core-colors")
      .shadowRoot.querySelector(`section > div.colors > div:nth-child(${queryIndex}) > core-color-input`) //guess and correct
      .shadowRoot.querySelector("#root > color-input")
      .shadowRoot.querySelector("div")
      .getAttribute("style");//--value: #6750A4; --color: #6750A4; --size: 48px; flex-direction: row;
    return m3AttributeStyle.match(/--value: (.+?);/)[1];
  }
  const M3KeyToQueryIndex = [
    { key: 'primary', i: 1 },
    { key: 'secondary', i: 2 },
    { key: 'tertiary', i: 3 },
    { key: 'neutral', i: 4 }
  ];
  const themeColors = {};
  for (const { key, i } of M3KeyToQueryIndex) {
    const color = m3ExtractColorBy(i,windowDocument);
    themeColors[key] = color;
  }
  // console.log(themeColors);
  return themeColors;
}
