import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./app";
import "./assets/styles/base.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
