/**
 * Trying from their tutorial
 * https://www.npmjs.com/package/@puppeteer/replay
 */
import url from 'url';
import { createRunner } from '@puppeteer/replay';
import { PuppeteerRunnerExtension } from '@puppeteer/replay';
import puppeteer from 'puppeteer';

/**
 * I dont need to extend this i believe
 */
class Extension extends PuppeteerRunnerExtension {
  async beforeAllSteps(flow) {
    await super.beforeAllSteps(flow);
    console.log('starting');
  }

  async beforeEachStep(step, flow) {
    await super.beforeEachStep(step, flow);
    console.log('before', step);
  }

  async afterEachStep(step, flow) {
    await super.afterEachStep(step, flow);
    console.log('after', step);
  }

  async afterAllSteps(flow) {
    await super.afterAllSteps(flow);
    console.log('done');
  }
}

/**
 *
 * @param extension {PuppeteerRunnerExtension}
 * @return {Promise<void>}
 */
export async function run(extension) {
    const runner = await createRunner(extension);

    await runner.runBeforeAllSteps();

    await runner.runStep({
        type: 'setViewport',
        width: 1920,
        height: 937,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
    });
    await runner.runStep({
        type: 'navigate',
        url: 'https://example.com/',
        assertedEvents: [
            {
                type: 'navigation',
                url: 'https://example.com/',
                title: 'Example Domain'
            }
        ]
    });

    await runner.runAfterAllSteps();
}

if (process && import.meta.url === url.pathToFileURL(process.argv[1]).href) {
    const browser = await puppeteer.launch({
        // headless: 'new',
        headless: false,
    });

const page = await browser.newPage();
    const ext = new Extension(browser, page,{timeout: 5000});
    await run(ext)
    // run()
}
