import * as React from "react";
import * as DOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import { App } from "./components/App";
import { Provider } from 'react-redux';
import { store } from './redux/store';

DOM.render(
    <Provider store={store}>
        <HashRouter> 
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById("container")
);