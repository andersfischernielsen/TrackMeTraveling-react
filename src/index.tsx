import * as React from "react";
import * as DOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { App } from "./components/App";

DOM.render(
    <BrowserRouter> 
        <App />
    </BrowserRouter>,
    document.getElementById("container")
);