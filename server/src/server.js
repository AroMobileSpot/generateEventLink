import express from "express";
import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { App } from "../../client/src/App";
import path from "path";
import fs from "fs";
import router from "../router";
const app = express();
app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.use("/public", express.static(path.resolve(__dirname, "..", "public")));

app.get("/admin", (req, res) => {
  const reactApp = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve("index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      const errMsg = `There is an error: ${err}`;
      console.error(errMsg);
      return res.status(500).send(errMsg);
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});
app.use(express.json());
app.use(router);
app.listen(4242);
