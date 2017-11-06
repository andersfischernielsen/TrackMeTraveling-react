/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(2);
const Container_1 = __webpack_require__(3);
let data = {
    username: "fischer",
    latitude: 55.663685,
    longitude: 12.598535
};
ReactDOM.render(React.createElement(Container_1.Container, { data: data }), document.getElementById("container"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Login_1 = __webpack_require__(4);
class Container extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(Login_1.Login, null)));
    }
}
exports.Container = Container;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            let headers = new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "no-cors"
            });
            let options = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: headers
            };
            try {
                let response = yield fetch('http://localhost:5000/auth', options);
                if (response.status == 401)
                    return;
                let json = yield response.json();
                this.storeTokens(json);
            }
            catch (_a) {
                //TODO: Do things when error occures.
            }
        });
    }
    storeTokens(tokens) {
        if (tokens === undefined)
            return;
        let storage = this.state.remember ? localStorage : sessionStorage;
        let access_token_key = `TrackMeTraveling:${this.state.username}:access_token`;
        let refresh_token_key = `TrackMeTraveling:${this.state.username}:refresh_token`;
        storage.setItem(access_token_key, tokens.access_token);
        storage.setItem(refresh_token_key, tokens.refresh_token);
    }
    handleChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [target.name]: value });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Login"),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("input", { type: "text", name: "username", placeholder: "Username", onChange: this.handleChange }),
                React.createElement("input", { name: "password", placeholder: "Password", type: "password", onChange: this.handleChange }),
                React.createElement("label", null,
                    " Remember me",
                    React.createElement("input", { name: "remember", type: "checkbox", onChange: this.handleChange })),
                React.createElement("input", { type: "submit", value: "Submit" }))));
    }
}
exports.Login = Login;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map