import { defineConfig } from 'vitepress'
//todo add icon / os-image
// https://vitepress.dev/reference/site-config
export default defineConfig({
  //https://vitepress.dev/reference/site-config#base
  base:"/material-design-3-import-export-ext/",//should probably just use env
  // base:"/",
  // srcDir: './docs',
  srcDir: './src',//relative to the package.json vitepress dev <dir>
  lang: 'en-ca',
  title: "CodeForWings MDT",
  description: "Automation for importing and exporting Material Design themes. Chrome console and Puppeteer JSON",
  themeConfig: {
    //add better search. https://vitepress.dev/reference/default-theme-search#local-search
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'Demo', link: '/demo' },
      { text: 'Try Me', link: '/demo' },
      { text: 'MTB', link: 'https://m3.material.io/theme-builder#/custom?primary=#cba642' },
      { text: 'CFW', link: 'https://codeforwings.com/index.shtml' },
      // { text: 'Examples', link: '/markdown-examples' },
      // { text: 'Vue', link: '/dev/vue-path-test.md' }
    ],

    sidebar: [
      //todo find better plugin
      {
        text: 'Demo',
        items: [
          { text: 'Demo - Import-Export', link: '/demo' },
          { text: 'Playground', link: '/demos/demo-playground' },
          { text: 'Exported Sample Themes', link: '/demos/create-shortcuts-demo' },//Create Shortcuts
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'References',
        items: [
          { text: "Developer's Notes", link: '/dev/readme_material_design_3_import_export_ext.dev.md' },
          { text: 'Deploy', link: '/dev/deploy' },
          { text: 'Vite Paths', link: '/dev/vue-path-test' },
          { text: 'Cheatsheet', link: '/dev/cheatsheet' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/codeforwings/4material-design-3-import-export-ext' }
    ],
    /** @type {import('vitepress/MarkdownOptions')} */
    markdown:{
      //https://vitepress.dev/reference/site-config#markdown
      lineNumbers: true,
      space_size: 2,//not sure if this works

    }
  }
})
