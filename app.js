import express from "express";
import cors from "cors";
import router from "./src/routes/webscrapping.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(2000, () => {
  console.log("Listening into: http://localhost:2000");
});
