// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env': {} },
  resolve: {
    alias: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      //https://nodejs.dev/en/api/v18/packages/#subpath-imports
      '##': fileURLToPath(new URL('./',import.meta.url)),//might want to try # or @ again
      '#src': fileURLToPath(new URL('./src', import.meta.url)),
      '#docs': fileURLToPath(new URL('./docs', import.meta.url)),//not sure if vite also needs this but yea
    },
    extensions: [
      '.js',
      '.json',
      '.mjs',
      '.vue',
    ],
  },
  /**
   * For experimentation of puppeteer
   */
  build: {
          //https://vitejs.dev/guide/build.html#library-mode
    lib: {
      name: 'material-design-3-import-export-ext',
      formats: ['es', 'cjs'],//('es' | 'cjs' | 'umd' | 'iife')
      entry: [ //"entry" can be a dictionary or array of multiple entry points
        // fileURLToPath(new URL('./src/import-material-theme-pup.mjs', import.meta.url)),
        // resolve('src/import-theme-chrome-pup.mjs'),
        // Ok... cannot use vite to roll it up... just doesnt work
        // resolve('##/lib/pupp-manual-recordings/Recording 6_17_2023 at 3_01_03 PM.js'),
        // resolve('##/src/generate-pupp-json/generate-pupp-json.mjs'),//fixme, this path didnt work?
        fileURLToPath(new URL('./src/generate-pupp-json/generate-pupp-json.mjs', import.meta.url)),
        // "C:\\Users\\Jason\\WebstormProjects\\material-design-3-import-export-ext\\src\\generate-pupp-json\\generate-pupp-json.mjs",
        // resolve('##/src/index.mjs'),
      ]
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['puppeteer',"puppeteer-core"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   vue: 'Vue',//not sure what this means
        // },
      },
    },
  },

})
