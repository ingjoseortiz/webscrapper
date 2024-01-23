import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let counter = 0;
  page.on("response", async (response) => {
    const matches = /jpg/.exec(response.url());
    console.log(matches);
    if (matches && matches.length === 2) {
      const extension = matches[1];
      const buffer = await response.buffer();
      fs.writeFileSync(
        `../images/image-${counter}.${extension}`,
        buffer,
        "base64"
      );
      counter += 1;
    }
  });
  // document.querySelector('h1').innerText
  await page.goto("https://www.promodescuentos.com/");

  await browser.close();
})();
