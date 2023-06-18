/**
 * Goal is to run the json file in the node environment
 * https://github.com/puppeteer/replay#1-replay-recording
 */
import { PuppeteerRunnerExtension } from '@puppeteer/replay';
import {resolve} from "node:path";
let jsonFilePath = resolve("lib/pupp-manual-recordings/example/example.com.json");
const browser = await puppeteer.launch({
    // headless: 'new',
    headless: false,
});

const [page] = await browser.pages();
// const page = await browser.newPage();

const ext = new PuppeteerRunnerExtension(browser, page,{timeout: 5000});

//-------------------------
import { createRunner, parse } from '@puppeteer/replay';
import fs from 'fs';
import puppeteer from "puppeteer";
// Read recording for a file.
const recordingText = fs.readFileSync(jsonFilePath, 'utf8').toString();
// console.log(recordingText);


// Validate & parse the file.
const recording = parse(JSON.parse(recordingText));
console.log(recording);
// // Create a runner and execute the script.
const runner = await createRunner(recording,ext);//this is the syntax. the run was a lie or very verbose
await runner.run();
await new Promise(resolve => setTimeout(resolve, 5000));
await page.close();
await browser.close();
