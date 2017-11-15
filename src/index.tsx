import * as React from 'react';
import * as DOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import registerServiceWorker from './registerServiceWorker';

DOM.render(
    <Provider store={store}>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('container') as HTMLElement
);

registerServiceWorker();