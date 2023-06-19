# Import Export Cheatsheet
* [Material Design Theme Builder](https://m3.material.io/theme-builder#/custom?primary=#cba642)

# Export
```js
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
    const color = m3ExtractColorBy(i,document);
    themeColors[key] = color;
  }
  console.log(themeColors);
```

## Puppeteer Chrome - Template
```js
// const puppeteer = require('puppeteer'); // v13.0.0 or later
const puppeteer = require('puppeteer-core'); // v13.0.0 or later

(async () => {
    let browser;
    let executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if(process.platform === 'win32'){
        executablePath = "/Program\ Files/Google/Chrome/Application/chrome.exe"//works..
    }
    browser = await puppeteer.launch({
        headless:false,
        executablePath,
        userDataDir:"/c/selenium/ChromeProfile",
        profileDirectory:"Profile 1",
        ignoreDefaultArgs: ["--disable-extensions"],//this seems to be good. not sure what --enable-automation is though
        args: [
            "--load-extension=/selenium/ChromeProfile/Profile\ 1/Extensions/cjpalhdlnbpafiamejdnhcphjbkeiagm/1.48.4_0",
        ]
    });


    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1920,
            height: 937
        })
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('https://m3.material.io/theme-builder#/custom');
        await Promise.all(promises);
    }

    /**
     * start section
     * 1. click on the primary color
     * 2. type / replace the color
     * 3. close
     * ... repeat
     * todo check
     *
     */
    // const timeout = 5000;

    async function openDomPicker(targetPage,colorIndex=1){
        // const selector = 'body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(1) > core-color-input >>> #root > color-input >>> #source-color';
        const selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #source-color`;

        await scrollIntoViewIfNeeded([selector], targetPage, timeout);
        const element = await targetPage.waitForSelector(selector, targetPage,{ visible: true, timeout });
        await element.click();
        // document.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main > root-page > custom-base").shadowRoot.querySelector("main > section.options > article > div:nth-child(2) > core-colors").shadowRoot.querySelector("section > div.colors > div:nth-child(1) > core-color-input").shadowRoot.querySelector("#root > color-input").shadowRoot.querySelector("#source-color")
    }
    async function setDialogValue (targetPage, colorIndex=1,value) {
        //change the (1)
        // const selector = 'body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(1) > core-color-input >>> #root > color-input >>> #source-hex';
        const selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #source-hex`;
        await scrollIntoViewIfNeeded([selector], targetPage, timeout);
        const element = await targetPage.waitForSelector(selector, targetPage,{ visible: true, timeout });
        await typeIntoElement(element, value);
        //co-pilot ftw
        if(await element.evaluate(el => el.value) !== value) {
            await changeElementValue(element, value);
        }
        //spam enter. i think these functions can be all be combined into one
        if(await element.evaluate(el => el.value) === value) {
            {
                const targetPage = page;
                await targetPage.keyboard.down('Enter');
            }
            {
                const targetPage = page;
                await targetPage.keyboard.up('Enter');
            }
        }
    }
    async function closeDialogBox(targetPage,colorIndex=1){
        // const selector = 'body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(1) > core-color-input >>> #root > color-input >>> #modal-dialog > div.actions > button';
        const selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #modal-dialog > div.actions > button`;
        await scrollIntoViewIfNeeded([selector], targetPage, timeout);
        const element = await targetPage.waitForSelector(selector, targetPage,{ visible: true, timeout });
        await element.click();
    }
    //1. click on the primary color
    await openDomPicker(page,1);
    //2. set the color
    await setDialogValue(page, 1,'#837e76');
    //3. close
    await closeDialogBox(page,1)
  
    /**
     * Close section breakpoint... if you want the browser to close
     */
    //dev timeout before closing
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();

    /**
     * Template functions generated from chrome puppeteer:
     */

    async function waitForSelectors(selectors, frame, options) {
        for (const selector of selectors) {
            try {
                return await waitForSelector(selector, frame, options);
            } catch (err) {
                console.error(err);
            }
        }
        throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function scrollIntoViewIfNeeded(selectors, frame, timeout) {
        const element = await waitForSelectors(selectors, frame, { visible: false, timeout });
        if (!element) {
            throw new Error(
              'The element could not be found.'
            );
        }
        await waitForConnected(element, timeout);
        const isInViewport = await element.isIntersectingViewport({threshold: 0});
        if (isInViewport) {
            return;
        }
        await element.evaluate(element => {
            element.scrollIntoView({
                block: 'center',
                inline: 'center',
                behavior: 'auto',
            });
        });
        await waitForInViewport(element, timeout);
    }

    async function waitForConnected(element, timeout) {
        await waitForFunction(async () => {
            return await element.getProperty('isConnected');
        }, timeout);
    }

    async function waitForInViewport(element, timeout) {
        await waitForFunction(async () => {
            return await element.isIntersectingViewport({threshold: 0});
        }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
        if (!Array.isArray(selector)) {
            selector = [selector];
        }
        if (!selector.length) {
            throw new Error('Empty selector provided to waitForSelector');
        }
        let element = null;
        for (let i = 0; i < selector.length; i++) {
            const part = selector[i];
            if (element) {
                element = await element.waitForSelector(part, options);
            } else {
                element = await frame.waitForSelector(part, options);
            }
            if (!element) {
                throw new Error('Could not find element: ' + selector.join('>>'));
            }
            if (i < selector.length - 1) {
                element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            }
        }
        if (!element) {
            throw new Error('Could not find element: ' + selector.join('|'));
        }
        return element;
    }

    async function waitForElement(step, frame, timeout) {
        const {
            count = 1,
            operator = '>=',
            visible = true,
            properties,
            attributes,
        } = step;
        const compFn = {
            '==': (a, b) => a === b,
            '>=': (a, b) => a >= b,
            '<=': (a, b) => a <= b,
        }[operator];
        await waitForFunction(async () => {
            const elements = await querySelectorsAll(step.selectors, frame);
            let result = compFn(elements.length, count);
            const elementsHandle = await frame.evaluateHandle((...elements) => {
                return elements;
            }, ...elements);
            await Promise.all(elements.map((element) => element.dispose()));
            if (result && (properties || attributes)) {
                result = await elementsHandle.evaluate(
                  (elements, properties, attributes) => {
                      for (const element of elements) {
                          if (attributes) {
                              for (const [name, value] of Object.entries(attributes)) {
                                  if (element.getAttribute(name) !== value) {
                                      return false;
                                  }
                              }
                          }
                          if (properties) {
                              if (!isDeepMatch(properties, element)) {
                                  return false;
                              }
                          }
                      }
                      return true;

                      function isDeepMatch(a, b) {
                          if (a === b) {
                              return true;
                          }
                          if ((a && !b) || (!a && b)) {
                              return false;
                          }
                          if (!(a instanceof Object) || !(b instanceof Object)) {
                              return false;
                          }
                          for (const [key, value] of Object.entries(a)) {
                              if (!isDeepMatch(value, b[key])) {
                                  return false;
                              }
                          }
                          return true;
                      }
                  },
                  properties,
                  attributes
                );
            }
            await elementsHandle.dispose();
            return result === visible;
        }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
        for (const selector of selectors) {
            const result = await querySelectorAll(selector, frame);
            if (result.length) {
                return result;
            }
        }
        return [];
    }

    async function querySelectorAll(selector, frame) {
        if (!Array.isArray(selector)) {
            selector = [selector];
        }
        if (!selector.length) {
            throw new Error('Empty selector provided to querySelectorAll');
        }
        let elements = [];
        for (let i = 0; i < selector.length; i++) {
            const part = selector[i];
            if (i === 0) {
                elements = await frame.$$(part);
            } else {
                const tmpElements = elements;
                elements = [];
                for (const el of tmpElements) {
                    elements.push(...(await el.$$(part)));
                }
            }
            if (elements.length === 0) {
                return [];
            }
            if (i < selector.length - 1) {
                const tmpElements = [];
                for (const el of elements) {
                    const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
                    if (newEl) {
                        tmpElements.push(newEl);
                    }
                }
                elements = tmpElements;
            }
        }
        return elements;
    }

    async function waitForFunction(fn, timeout) {
        let isActive = true;
        const timeoutId = setTimeout(() => {
            isActive = false;
        }, timeout);
        while (isActive) {
            const result = await fn();
            if (result) {
                clearTimeout(timeoutId);
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        throw new Error('Timed out');
    }

    async function changeSelectElement(element, value) {
        await element.select(value);
        await element.evaluateHandle((e) => {
            e.blur();
            e.focus();
        });
    }

    async function changeElementValue(element, value) {
        await element.focus();
        await element.evaluate((input, value) => {
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }, value);
    }

    async function typeIntoElement(element, value) {
        const textToType = await element.evaluate((input, newValue) => {
            if (
              newValue.length <= input.value.length ||
              !newValue.startsWith(input.value)
            ) {
                input.value = '';
                return newValue;
            }
            const originalValue = input.value;
            input.value = '';
            input.value = originalValue;
            return newValue.substring(originalValue.length);
        }, value);
        await element.type(textToType);
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});

````