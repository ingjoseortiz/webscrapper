const puppeteer = require("puppeteer");
const { JSDOM } = require("jsdom");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto("https://example.com");

  // Get the HTML content of the page
  const htmlContent = await page.content();

  // Use JSDOM to parse the HTML
  const dom = new JSDOM(htmlContent);

  // Extract information from the DOM
  const titles = [dom.window.document.querySelector("title").textContent];
  const imgSrcs = [
    dom.window.document.querySelector("img").getAttribute("src"),
  ];
  const descriptions = [
    dom.window.document
      .querySelector('meta[name="description"]')
      .getAttribute("content"),
  ];

  // You can add more elements to the arrays if needed

  // Scroll down to trigger lazy-loaded content
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });

  // Wait for some time to let the content load (you may need to adjust this)
  await page.waitForTimeout(2000);

  // Extract additional information after scrolling
  const additionalTitles = await page.evaluate(() => {
    // Modify this to extract additional titles
    const titleElements = document.querySelectorAll(
      ".additional-title-selector"
    );
    return Array.from(titleElements, (element) => element.textContent);
  });

  const additionalImgSrcs = await page.evaluate(() => {
    // Modify this to extract additional image sources
    const imgElements = document.querySelectorAll(".additional-img-selector");
    return Array.from(imgElements, (element) => element.getAttribute("src"));
  });

  const additionalDescriptions = await page.evaluate(() => {
    // Modify this to extract additional descriptions
    const descriptionElements = document.querySelectorAll(
      ".additional-description-selector"
    );
    return Array.from(descriptionElements, (element) =>
      element.getAttribute("content")
    );
  });

  // Concatenate the additional information to the existing arrays
  titles.push(...additionalTitles);
  imgSrcs.push(...additionalImgSrcs);
  descriptions.push(...additionalDescriptions);

  // You can perform more actions here, such as extracting other elements or interacting with the page.

  // Create a single object
  const scrapedData = {
    titles,
    imgSrcs,
    descriptions,
  };

  console.log("Scraped Data:", scrapedData);

  await browser.close();
}

run();
