import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  //https://vitepress.dev/reference/site-config#base
  base:"/material-design-3-import-export-ext/",
  // srcDir: './docs',
  srcDir: './src',//relative to the package.json vitepress dev <dir>
  lang: 'en-ca',
  title: "Material Design Theme Import Export",
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
      // { text: 'Examples', link: '/markdown-examples' },
      // { text: 'Vue', link: '/dev/vue-path-test.md' }
    ],

    sidebar: [
      //todo find better plugin
      {
        text: 'Demo',
        items: [
          { text: 'Demo - Import-Export', link: '/demo' },
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'References',
        items: [
          { text: 'Deploy', link: '/dev/deploy' },
          { text: 'Vite Paths', link: '/dev/vue-path-test' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/codeforwings/material-design-3-import-export-ext' }
    ]
  }
})
