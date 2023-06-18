/**
 *
 */
/**
 * Goal is to run the json file in the node environment
 * https://github.com/puppeteer/replay#1-replay-recording
 */
import { PuppeteerRunnerExtension } from '@puppeteer/replay';
// import {resolve} from "node:path";
import { createRunner, parse } from '@puppeteer/replay';
import fs from 'fs';
// import puppeteer from "puppeteer";
import {launch} from "puppeteer";
// let jsonFilePath = resolve("lib/pupp-manual-recordings/example/example.com.json");
/**
 * For Testing
 * @param jsonFilePath {string | URL | PathLike}
 * @return {Promise<void>}
 */
export async function runJsonFile(jsonFilePath,headless=false){
  const browser = await launch({
    headless,
    // headless: 'new',
    // headless: false,
  });
  await runJsonFileWithBrowser(jsonFilePath,browser);

  //pseudotimeout for testing
  return
  await new Promise(resolve => setTimeout(resolve, 5000));
  const [page] = await browser.pages();
  await page.close();
  await browser.close();
}
export async function runJsonFileWithBrowser(jsonFilePath,browser){
  const [page] = await browser.pages();//assuming has new page for now
// const page = await browser.newPage();

  const ext = new PuppeteerRunnerExtension(browser, page,{timeout: 5000});

//-------------------------

// Read recording for a file.
  const recordingText = fs.readFileSync(jsonFilePath, 'utf8').toString();
// console.log(recordingText);


// Validate & parse the file.
  const recording = parse(JSON.parse(recordingText));
// console.log(recording);
// // Create a runner and execute the script.
  const runner = await createRunner(recording,ext);//this is the syntax. the run was a lie or very verbose
  // return await runner.run();
  return runner.run();
}
