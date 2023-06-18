import url from 'url';
import { createRunner } from '@puppeteer/replay';

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
        url: 'https://m3.material.io/theme-builder#/custom?primary=#cba642',
        assertedEvents: [
            {
                type: 'navigation',
                url: 'https://m3.material.io/theme-builder#/custom?primary=#cba642',
                title: 'Material Design'
            }
        ]
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'theme-builder',
                'custom-base',
                'core-colors',
                'div:nth-of-type(1) > core-color-input',
                'color-input',
                'div > div'
            ],
            [
                'xpath//html/body/mio-root/mio-theme-builder/theme-builder',
                'xpath//main/root-page/custom-base',
                'xpath//main/section[1]/article/div[2]/core-colors',
                'xpath//section/div[2]/div[1]/core-color-input',
                'xpath///*[@id="root"]/color-input',
                'xpath//div/div'
            ],
            [
                'pierce/div:nth-of-type(1) > core-color-input',
                'pierce/color-input',
                'pierce/div > div'
            ]
        ],
        offsetY: 22.5,
        offsetX: 28,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/[role="dialog"]',
                'aria/[role="textbox"]'
            ],
            [
                'theme-builder',
                'custom-base',
                'core-colors',
                'div:nth-of-type(1) > core-color-input',
                'color-input',
                '#source-hex'
            ],
            [
                'xpath//html/body/mio-root/mio-theme-builder/theme-builder',
                'xpath//main/root-page/custom-base',
                'xpath//main/section[1]/article/div[2]/core-colors',
                'xpath//section/div[2]/div[1]/core-color-input',
                'xpath///*[@id="root"]/color-input',
                'xpath///*[@id="source-hex"]'
            ],
            [
                'pierce/div:nth-of-type(1) > core-color-input',
                'pierce/#source-hex'
            ]
        ],
        offsetY: 6.5,
        offsetX: 23.5,
        duration: 896.1000000238419,
    });
    await runner.runStep({
        type: 'change',
        value: '#cba642',
        selectors: [
            [
                'aria/[role="dialog"]',
                'aria/[role="textbox"]'
            ],
            [
                'theme-builder',
                'custom-base',
                'core-colors',
                'div:nth-of-type(1) > core-color-input',
                'color-input',
                '#source-hex'
            ],
            [
                'xpath//html/body/mio-root/mio-theme-builder/theme-builder',
                'xpath//main/root-page/custom-base',
                'xpath//main/section[1]/article/div[2]/core-colors',
                'xpath//section/div[2]/div[1]/core-color-input',
                'xpath///*[@id="root"]/color-input',
                'xpath///*[@id="source-hex"]'
            ],
            [
                'pierce/div:nth-of-type(1) > core-color-input',
                'pierce/#source-hex'
            ]
        ],
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Close'
            ],
            [
                'theme-builder',
                'custom-base',
                'core-colors',
                'div:nth-of-type(1) > core-color-input',
                'color-input',
                'button'
            ],
            [
                'xpath//html/body/mio-root/mio-theme-builder/theme-builder',
                'xpath//main/root-page/custom-base',
                'xpath//main/section[1]/article/div[2]/core-colors',
                'xpath//section/div[2]/div[1]/core-color-input',
                'xpath///*[@id="root"]/color-input',
                'xpath///*[@id="modal-dialog"]/div[3]/button'
            ],
            [
                'pierce/div:nth-of-type(1) > core-color-input',
                'pierce/button'
            ]
        ],
        offsetY: 24,
        offsetX: 35.171875,
    });

    await runner.runAfterAllSteps();
}

if (process && import.meta.url === url.pathToFileURL(process.argv[1]).href) {
    run()
}
