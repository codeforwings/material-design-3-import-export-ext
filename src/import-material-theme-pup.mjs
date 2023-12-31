// const puppeteer = require('puppeteer'); // v13.0.0 or later
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const puppeteer = require('puppeteer-core'); // v13.0.0 or later
// const {Browser} = puppeteer;
//oh right... it was constant...
//oh right... i might be able to build the json file using vite or something
//todo main
import {Browser,Page} from "puppeteer";
// import {Browser,Page} from "puppeteer-core";

/**
 *
 * @param coreColors {MaterialThemeCoreColors}
 * @param browser {Browser}
 * @param timeout {number} - 5000 ms or 5 seconds is the default from puppeteer
 * @param viewPort {object} - Viewport of the page.. so dont think it's needed?
 * add other configs later.
 * @return {Promise<Page>}
 * @example
 * Screenshot of the colors
 */
export async function runPuppeteerWithBrowser(coreColors,browser,viewPort={},
                                              timeout=5000){
  const page = await browser.newPage();
  /* init browser default settings from puppeteer */
  page.setDefaultTimeout(timeout);
  {
    const targetPage = page;
    // await targetPage.setViewport({
    //   width: 1920,
    //   height: 937
    // })
    // https://en.wikipedia.org/wiki/Display_aspect_ratio
    //16:9
    // await page.setViewport({
    //   width: 4096,
    //   height: 2160,
    //   deviceScaleFactor: 1,
    //   // deviceScaleFactor: 2,//higher density? honesty looks the same defn looks better
    //   //when zoomed
    // });
    //16:10 i think... yep mac is 16:10
    const defaultViewport = {
      //i think this is zoom on the page? oh that's why
      width: 3840,//this takes a while to run though...
      height: 2400,
      // deviceScaleFactor: 1,
      deviceScaleFactor: 2,//higher density, looks odd though
      // deviceScaleFactor: 0.5,//1920x1200... oddd
    }
    await page.setViewport({...defaultViewport,...viewPort});

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
   * todo check and extract functions. make more generic instead of using >>> as well
   *
   */
  /**
   * Click
   * @param targetPage
   * @param colorIndex {MaterialThemeCoreColorsIndex}
   * @return {Promise<Page>}
   */
  async function openDomPicker(targetPage,colorIndex=1){
    const selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #source-color`;
    await scrollIntoViewIfNeeded([selector], targetPage, timeout);
    const element = await targetPage.waitForSelector(selector, targetPage,{ visible: true, timeout });
    await element.click();
  }
  async function setDialogValue (targetPage, colorIndex=1,value) {
    const selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #source-hex`;
    await scrollIntoViewIfNeeded([selector], targetPage, timeout);
    const element = await targetPage.waitForSelector(selector, targetPage,{ visible: true, timeout });
    /**
     * fixme. remove this after material theme builder is fixed
     * workaround for material theme builder. neutral color  specifically
     */
    if(await element.evaluate(el => el.value) === value) {
      return //no change. exit
    }
    /* set value */
    await typeIntoElement(element, value);
    if(await element.evaluate(el => el.value) !== value) {
      await changeElementValue(element, value);
    }
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
    const selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #modal-dialog > div.actions > button`;
    await scrollIntoViewIfNeeded([selector], targetPage, timeout);
    const element = await targetPage.waitForSelector(selector, targetPage,{ visible: true, timeout });
    await element.click();
  }
  const M3KeyToQueryIndex = [
    { key: 'primary', i: 1 },
    { key: 'secondary', i: 2 },
    { key: 'tertiary', i: 3 },
    // { key: 'neutral', i: 4 }//fixme. return this after material theme builder is fixed
  ];
  for (const { key, i } of M3KeyToQueryIndex) {
    await openDomPicker(page,i);
    await setDialogValue(page, i,coreColors[key]);
    await closeDialogBox(page,i);
  }
  //returning page for our purposes
  return page;
  // await browser.close();

  /**
   * most likely the js is built from vite or alt.
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
}

/**
 * Current theme of Material Design. evaluate...
 * todo maybe get the jsPath Shadowroot converter kinda thing
 * @param {Document} _document
 * @return {string|string} light_mode or dark_mode
 */
export function getCurrentTheme(_document=undefined) {
  // const document = _document || window.document;
  const document = window.document || _document;
  const btnEle = document.querySelector("body > mio-root > mio-theme-builder > theme-builder")
    .shadowRoot.querySelector("main > root-page").shadowRoot.querySelector("main > header > div.row.section.header-right > mwc-icon-button:nth-child(2)")
    .shadowRoot.querySelector("button > i")
  const reversedTheme = btnEle.innerText;//light_mode or dark_mode. but reversed
  return reversedTheme==='light_mode'?'dark_mode':'light_mode';
}

/**
 * Just going to click and return the new theme
 * repeated until have some js builder
 * @param _document
 * @return {string}
 */
export function puppClick(_document=undefined) {
  // const document = _document || window.document;
  const document = window.document || _document;
  const btnEle = document.querySelector("body > mio-root > mio-theme-builder > theme-builder")
    .shadowRoot.querySelector("main > root-page").shadowRoot.querySelector("main > header > div.row.section.header-right > mwc-icon-button:nth-child(2)")
    .shadowRoot.querySelector("button > i")
  btnEle.click();
  //wait?
  const reversedTheme = btnEle.innerText;//light_mode or dark_mode. but reversed
  return reversedTheme==='light_mode'?'dark_mode':'light_mode';
}
