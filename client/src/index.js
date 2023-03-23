import React from "react";
import ReactDOMClient from "react-dom/client";
import { App } from "./App";

ReactDOMClient.hydrateRoot(document.getElementById("root"), <App />);
