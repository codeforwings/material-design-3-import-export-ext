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
    run()
}
