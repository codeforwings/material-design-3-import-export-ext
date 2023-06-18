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
  // "type": Navigation,//apparently bugged
  "type": 'navigate',
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
  type = Navigation;//apparently doesnt work... wth
  // type = 'navigation';//apparently doesnt work... wth
  url = '';
  assertedEvents = [
    {
      type: 'navigation',
      url: '',
      title: '',
      "timeout": 5000,
    }
  ];

  /**
   *
   * @param url {string} - url to navigate to (required)
   * @param title {string} - title of the chrome (required)
   // * @param urlOrOptions {object}
   */
  // constructor(url,title,options={}) {
  constructor(url,title,options={}) {
    Object.assign(this,NavigationStepDefaults, options);
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
            "timeout": 5000,
    // assertedEvents = [
  //   {
  //     type: 'click',
  //     selector: ''
  //   }
  // ];
}
export class ClickStep {

  constructor(selectors,options) {
    Object.assign(this, ClickStepDefaults, {selectors},options);
  }

  toJSON() {
    return {...this};//should be fine
  }
}
export const WaitForElementStepDefaults = {
  "type": "waitForElement",
  "selectors": [".my-class"],
  "timeout": 5000,
}
export class WaitForElementStepStep {
  constructor(selectors,options) {
    Object.assign(this, WaitForElementStepDefaults,{selectors},options);
  }

  toJSON() {
    return {...this};//should be fine
  }
}

export const ChangeMainStepDefaults = {
  type: 'change',
  target: 'main',//not sure what that means
  value: '#cba642',
  selectors: [
    ["input"],
  ],
  //if can validate... great

}
export class ChangeMainStep {

  constructor(value,selectors,options) {
    Object.assign(this, ChangeMainStepDefaults, {value,selectors},options);
  }

  toJSON() {
    return {...this};//should be fine
  }
}
/**
 * todo + scroll into view probably needed
 *  verify with waitForExpression? WaitForExpressionStep
 *  need to call it WaitForExpressionStepStep
 *  "expression": "new Promise(resolve => setTimeout(() => resolve(true),
 * 2000))",
 *  */
//what is target? oh just frame
const WaitForExpressionStepStep = {
  "type": "waitForExpression",
  "expression": "new Promise(resolve => {console.log('hi');return resolve(true);})",//yep this executes js... omg
  //could've just used this for everything lol
}