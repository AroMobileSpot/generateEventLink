import express from "express";
import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { App } from "../../client/src/App";
import path from "path";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
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

app.use(express.static(path.resolve(__dirname, "..", "dist")));

app.listen(4242);
