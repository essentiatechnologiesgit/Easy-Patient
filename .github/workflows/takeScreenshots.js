const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const KnownDevices = puppeteer.KnownDevices;
const iPhone = KnownDevices['iPhone 14'];

(async () => {
  // Launch a browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Emulate iPhone 14
  await page.emulate(iPhone);

  // File paths for local HTML files
  const filePaths = [path.resolve(__dirname, 'page1.html')];

  // Array to store screenshot file names
  const screenshots = [];

  // Loop through each file and take a screenshot
  for (let i = 0; i < filePaths.length; i++) {
    // Use 'file://' protocol to load local HTML files
    await page.goto(`file://${filePaths[i]}`, { waitUntil: 'networkidle0' });

    // Screenshot file name
    const screenshotFileName = `screenshot-iphone14-${i + 1}.png`;
    await page.screenshot({ path: screenshotFileName });

    // Save the file name to the array
    screenshots.push(screenshotFileName);
  }

  // Close the browser
  await browser.close();

  console.log('Screenshots taken successfully!');
})();
