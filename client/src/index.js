import React from "react";
import ReactDOMClient from "react-dom/client";
import {App} from './App'
import { BrowserRouter } from "react-router-dom";

ReactDOMClient.hydrateRoot(document.getElementById("root"), <BrowserRouter><App /></BrowserRouter>);
