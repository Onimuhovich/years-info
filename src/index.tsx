import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./app";
import "./assets/styles/base.scss";

createRoot(document.getElementById("root") as HTMLElement)
  .render(<App />);
