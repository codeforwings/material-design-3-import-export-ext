/**
 * Converts the coreColor to a string file name
 * @param coreColor {MaterialThemeCoreColors}
 * @param fileNamePrefix {string}
 * @return {{light: string, dark: string, prefix: string}} - file names
 * @example
 * const inputColor = DefaultCoreColors
 * const {light,dark} = generateScreenshotsFileNames(inputColor)
 * console.log({light,dark,prefix});
 * // {
 * //   light: 'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png',
 * //   dark: 'themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png'
 * //   prefix: 'themeM3-#6750A4-#958DA5-#B58392-#939094'
 * // }
 */
export function generateScreenshotsFileNames(coreColor,fileNamePrefix="themeM3"){
  const sJoined = Object.values(coreColor).map(val => val.toUpperCase()).join('-');
  const prefix = `${fileNamePrefix}-${sJoined}`;
  /** @type {string} */
  let light = `${prefix}.light.png`;
  /** @type {string} */
  let dark= `${prefix}.dark.png`;
  return {light,dark,prefix}
}
export default {generateScreenshotsFileNames}