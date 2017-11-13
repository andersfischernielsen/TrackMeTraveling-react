import * as React from "react";
import * as DOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import { App } from "./components/App";

DOM.render(
    <HashRouter> 
        <App />
    </HashRouter>,
    document.getElementById("container")
);