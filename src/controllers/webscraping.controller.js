import puppeteer from "puppeteer";
import jsdom from "jsdom";

export const getPromodescuentos = async (req, res) => {
  try {
    const webUrl = "https://www.promodescuentos.com/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(webUrl, { waitUntil: "load", timeout: 0 });
    const body = await response.text();
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    await autoScroll(page, 150);
    const results = await page.evaluate(() => {
      setTimeout(() => {
        page.evaluate(() => {
          window.scrollBy(0, window.innerHeight);
        });
        console.log("first time out");
      }, 3000);

      const articles = document.querySelectorAll("article");
      const data = [...articles].map((result) => {
        const title = result.querySelector(".thread-title").innerText;
        const description = result.querySelector(".threadGrid-body").innerText;
        const img = result.querySelector(".thread-image ").src;

        return {
          title,
          description,
          img,
        };
      });
      return data;
    });

    console.log("START", results);
    // document.querySelector("body").innerHTML(results);

    res.status(200).send(results);
    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

export const getXataka = async (req, res) => {
  try {
    const webUrl = "https://www.xataka.com.mx/tag/ofertas";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(webUrl);
    const body = await response.text();
    const {
      window: { document },
    } = new jsdom.JSDOM(body);
    // .querySelectorAll(".abstract-title")
    const results = await page.evaluate(() => {
      const articles = document.querySelectorAll(".abstract-title");
      const data = [...articles].map((result) => {
        const title = result.querySelector(".thread-title").innerText;
        const description = result.querySelector(".threadGrid-body").innerText;
        const img = result.querySelector(".thread-image ").src;

        return {
          title,
          description,
          img,
        };
      });
      return data;
    });

    console.log("START", results);
    // document.querySelector("body").innerHTML(results);

    res.send(200, results);
    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

export const getImparcial = async (req, res) => {
  console.log("getImparcial");
  try {
    const webUrl =
      "https://loseconomicos.com/Hermosillo/resultados/empleos-otros-1235";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(webUrl);
    const body = await response.text();
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    const results = await page.evaluate(() => {
      const articles = document.querySelectorAll(".anuncio");
      const data = [...articles].map((result) => {
        const title = result.querySelector(".titulo").innerText;
        const description = " ";
        //result.querySelector(".foto").innerText;
        const img = result.querySelector(".foto").style.background;

        return {
          title,
          img,
          description,
        };
      });
      return data;
    });

    console.log("END El imparcial", results);
    // document.querySelector("body").innerHTML(results);

    res.send(200, results);
    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

export const getLinkedIn = async (req, res) => {
  try {
    const webUrl = "https://www.linkedin.com/feed/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(webUrl);
    const body = await response.text();
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    const results = await page.evaluate(() => {
      const articles = document.querySelectorAll(".feed-skip-link__container");
      const data = [...articles].map((result) => {
        const title = result.querySelector(".break-words").innerText;
        const description = result.querySelector(".threadGrid-body").innerText;
        const img = result.querySelector(".thread-image ").src;

        ///////////////*

        ////////// */

        return {
          title,
          description,
          img,
        };
      });
      return data;
    });

    console.log("START", results);
    // document.querySelector("body").innerHTML(results);

    res.send(200, results);
    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

async function autoScroll(page, maxScrolls) {
  await page.evaluate(async (maxScrolls) => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var scrolls = 0; // scrolls counter
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        scrolls++; // increment counter

        // stop scrolling if reached the end or the maximum number of scrolls
        if (
          totalHeight >= scrollHeight - window.innerHeight ||
          scrolls >= maxScrolls
        ) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  }, maxScrolls); // pass maxScrolls to the function
}

/*
const scrollWebPage = async (title, description, img) => {
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
  title.push(...additionalTitles);
  img.push(...additionalImgSrcs);
  description.push(...additionalDescriptions);
  console.log(title, img, description);
};
*/
