import {
  ChangeMainStep,
  ClickStep,
  NavigationStep,
  SetViewportStep,
  WaitForElementStepStep
} from "#src/generate-pupp-json/steps-pupp-json-lookup.mjs";
import {M3KeyToQueryIndex} from "##/lib/materialDesignThemeColorConstants.mjs";
/**
 * Based on m3-click-one.json
 *
 */

/**
 * Tested and works
 * @param hexCoreColors
 * @param viewPortStep {SetViewportStep}
 * @return {{title: string, steps: *[]}} - Puppeteer JSON Runner for browser / and replay
 */
export function generatePuppeteerJSON(hexCoreColors,viewPortStep=null,title="import-colors"){
  // const title = "import-colors";
  //---

  const url = 'https://m3.material.io/theme-builder#/custom';
  const urlTitle = 'Material Design';
  //--
  const steps = [];
  if(viewPortStep)steps.push(new SetViewportStep(viewPortStep).toJSON());
  steps.push(new NavigationStep(url,urlTitle).toJSON());

  let colorIndex,selector,hexValue

  for (const { key, i } of M3KeyToQueryIndex) {
    colorIndex = i;//primary is 1
    hexValue = hexCoreColors[key];//i.e. #c2185b
    /* 1. Open Dialog */
    selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #source-color`
    steps.push(new WaitForElementStepStep([selector.split('>>>')],{visible:true}).toJSON());
    steps.push(new ClickStep([selector.split('>>>')]).toJSON());
    //maybe verify
    /* 2 Set Value */
    selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #source-hex`;
    steps.push(new WaitForElementStepStep([selector.split('>>>')],{visible:true}).toJSON());
    steps.push(new ChangeMainStep(hexValue,[selector.split('>>>')]).toJSON());
    /* press enter */
    steps.push({
      "type": "keyDown",//keyUp
      "key": "Enter"
    })
    steps.push({
      "type": "keyUp",//keyDown
      "key": "Enter"
    })
    /* 3. Close Dialog - added 10 pixels and it worked? */
    // document.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main > root-page > custom-base").shadowRoot.querySelector("main > section.options > article > div:nth-child(2) > core-colors").shadowRoot.querySelector("section > div.colors > div:nth-child(1) > core-color-input").shadowRoot.querySelector("#root > color-input").shadowRoot.querySelector("#modal-dialog > div.actions > button")
    selector = `body > mio-root > mio-theme-builder > theme-builder >>> main > root-page > custom-base >>> main > section.options > article > div:nth-child(2) > core-colors >>> section > div.colors > div:nth-child(${colorIndex}) > core-color-input >>> #root > color-input >>> #modal-dialog > div.actions > button`;
    steps.push(new WaitForElementStepStep([selector.split('>>>')],{visible:true}).toJSON());
    steps.push(new ClickStep([selector.split('>>>')]).toJSON());
  }


  const actual = {
    title,steps
  }
  return actual;
}