import express from "express";
import React from "react";
import * as ReactDOMServer from "react-dom/server";

import { StaticRouter } from "react-router-dom/server";

import { App } from "../../client/src/App";
import path from "path";
import fs from "fs";

const app = express();

const pathRoot = path.resolve("dist");
app.use(express.static(pathRoot));

app.use("*", (req, res, next) => {
  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <App />
    </StaticRouter>
  );
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

app.listen(4242, () => {
  console.log(`Server is listening on port: 4242`);
});
