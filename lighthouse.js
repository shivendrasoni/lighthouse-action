const lighthouse = require('lighthouse');
const constants = lighthouse.ge
const chromeLauncher = require('chrome-launcher');
const csvWriter = require('csv-write-stream');
const fs = require('fs');
const config = require('./config')
const {parseArgs} = require("lighthouse/third-party/download-content-shell/utils");

// URL to run Lighthouse on
//parameterise this
const url = 'https://www.google.com';

// Number of Lighthouse runs to average
const numRuns = 1;
let lhrConfig = null;
const device = process.argv.slice(2)[0];

if ( device === 'desktop') {
  lhrConfig = config.desktop
}
else if (device === 'mobile'){
  lhrConfig = config.mobile
}

// Array to store Lighthouse results
const results = [];

// Launch Chrome
const launchChrome = async () => {
  return await chromeLauncher.launch({chromeFlags: ['--disable-gpu']});
};

// Run Lighthouse
const runLighthouse = async (chrome) => {
  const opts = {
    output: 'json',
    port: chrome.port
  };
  const report = await lighthouse(url, opts, lhrConfig);
  return report.lhr;
};

// Average the scores of all Lighthouse runs
const averageScores = (scores) => {
  const averageScores = {};
  const scoreKeys = Object.keys(scores[0]);
  for (const key of scoreKeys) {
    let total = 0;
    for (const score of scores) {
      total += score[key]['score'];
    }
    averageScores[key] = (total / scores.length)*100;
  }
  return averageScores;
};

// Save results to CSV
const saveResults = (scores) => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('lighthouse-results.csv'));
  writer.write({
    'Performance': scores.performance,
    'Accessibility': scores.accessibility,
    'Best Practices': scores['best-practices'],
    'SEO': scores.seo,
    'PWA': scores.pwa
  });
  writer.end();
};

(async () => {
  for (let i = 0; i < numRuns; i++) {
    const chrome = await launchChrome();
    const report = await runLighthouse(chrome);
    results.push(report.categories);
    await chrome.kill();
  }
  const average = averageScores(results);
  saveResults(average);
})();
