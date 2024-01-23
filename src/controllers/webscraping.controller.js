import puppeteer from "puppeteer";
import jsdom from "jsdom";

export const getPromodescuentos = async (req, res) => {
  try {
    const webUrl = "https://www.promodescuentos.com/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(webUrl);
    const body = await response.text();
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    const results = await page.evaluate(() => {
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

    res.send(200, results);
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
