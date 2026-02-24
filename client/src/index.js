import React from "react";
import ReactDom from"react-router-dom/client";
import App from "./App";

const root=ReactDom.createRoot(document.getElementById("root"));
root.render(
    <React.StictMode>
        <App/>
    </React.StictMode>
);