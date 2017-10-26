import * as React from "react";
import * as ReactDOM from "react-dom";
import { Container } from "./components/Container";
import { Data } from "./components/Container";

let data : Data = {
    username: "fischer",
    latitude: 55.663685,
    longitude: 12.598535
}

ReactDOM.render(
    <Container data={data} />,
    document.getElementById("container")
);