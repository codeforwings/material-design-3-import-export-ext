/**
 * JSON References
 * https://github.com/puppeteer/replay/blob/main/src/Schema.ts
 * StepType
 */
import {StepType} from "@puppeteer/replay";
const {SetViewport,Navigation} = StepType;
/**
 *
 */
export const SetViewPortStepDefaults ={
  "type": SetViewport,
  // "type": "setViewport",
  "width": 1920,
  "height": 937,
  "deviceScaleFactor": 1,
  "isMobile": false,
  "hasTouch": false,
  "isLandscape": false
}

/**
 * fixme maybe just use the interface from puppeteer/replay / make generic class
 */
export class SetViewportStep{
  /* defaults */
  type = SetViewport;
  width = 1920;
  height = 937;
  deviceScaleFactor = 1;
  isMobile = false;
  hasTouch = false;
  isLandscape = false;
  /* end defaults */
  constructor(options){
    //fixme use defaults intstead
    Object.assign(this,options);
  }
  toJSON() {
    return {
      type: this.type,
      width: this.width,
      height: this.height,
      deviceScaleFactor: this.deviceScaleFactor,
      isMobile: this.isMobile,
      hasTouch: this.hasTouch,
      isLandscape: this.isLandscape,
    };
  }
}

export const NavigationStepDefaults = {
  "type": Navigation,
  "url": "https://m3.material.io/theme-builder#/custom?primary=#cba642",
  "assertedEvents": [
    {
      "type": "navigation",
      "url": "https://m3.material.io/theme-builder#/custom?primary=#cba642",
      "title": "Material Design"
    }
  ]
}
export class NavigationStep {
  type = Navigation;
  url = '';
  assertedEvents = [
    {
      type: 'navigation',
      url: '',
      title: ''
    }
  ];

  /**
   *
   * @param url {string} - url to navigate to (required)
   * @param title {string} - title of the chrome (required)
   // * @param urlOrOptions {object}
   */
  // constructor(url,title,options={}) {
  constructor(url,title) {
    // Object.assign(this,NavigationStepDefaults, options);
    this.url = url;
    this.assertedEvents[0].url = url;
    this.assertedEvents[0].title = title;

  }

  toJSON() {
    return {
      type: this.type,
      url: this.url,
      assertedEvents: this.assertedEvents
    };
  }
}

export const ClickStepDefaults = {
            "type": "click",
            "target": "main",
            "selectors":[".btn"],
            "offsetY": 0,
            "offsetX": 0,
            "duration": 300, //hold time ms
    // assertedEvents = [
  //   {
  //     type: 'click',
  //     selector: ''
  //   }
  // ];
}
export class ClickStep {

  constructor(options) {
    Object.assign(this, ClickStepDefaults,options);
  }

  toJSON() {
    return {...this};//should be fine
  }
}
export const WaitForElementStepDefaults = {
  "type": "waitForElement",
  "selectors": [".my-class"],
}
export class WaitForElementStepStep {
  constructor(options) {
    Object.assign(this, WaitForElementStepDefaults,options);
  }

  toJSON() {
    return {...this};//should be fine
  }
}