import express from "express";
import React from "react";
import * as ReactDOMServer from "react-dom/server";

import { matchPath } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import routes from '../../shared/routes'

import { App } from "../../client/src/App";
import path from "path";
import fs from "fs";

const app = express();

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) =>
    matchPath(route.path, req.url)
  ) || {}
  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
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
    )
  });
});


const pathRoot = path.resolve(__dirname, "..", "dist");
app.use(express.static(pathRoot));

app.listen(4242, () => {
  console.log(`Server is listening on port: 4242`)
});
