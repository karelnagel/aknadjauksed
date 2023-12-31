import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { type Variant } from "./store";

const element = document.getElementById("root");
const variant: Variant = element?.getAttribute("data-variant") as Variant;
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    {!variant && <div>Data variant missing</div>}
    {variant && <App variant={variant} />}
  </React.StrictMode>
);
