import puppeteer from "puppeteer";
import jsdom from "jsdom";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/promodescuentos", async (req, res) => {
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
});

app.get("/xataka", async (req, res) => {
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
});

app.listen(2000, () => {
  console.log("Listening into: http://localhost:2000");
});
