/**
 * Generators for VitePress / markdowns and inserting
 * vite-press-utils.test.mjs
 *
 * basically remove docs/src
 *
 * vitepress docs
 * srcDir: './src
 * so path is docs/src
 *
 * for assets.. it's just
 * without the /public
 */
//https://github.com/antfu/vite-plugin-md
//https://www.w3schools.com/html/html5_video.asp
//convert to webm? using ffmpeg?
/**
 *
 * @param filename {string}
 * @param baseDirPath {string} - abs /baseDirPath/
 * @return {string} - Encoded URI Component
 */
export function encodeURIComponentForVitePress(filename,baseDirPath='/create-shortcuts/'){
  //simple. make smarter later
  // return '/create-shortcuts/'+encodeURIComponent('themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png')
  return baseDirPath+encodeURIComponent(filename)
}