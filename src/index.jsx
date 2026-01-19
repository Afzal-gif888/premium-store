import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

import { Provider } from 'react-redux';
import store from './store/store';

import { fetchProducts } from "./store/slices/stockSlice";
import { fetchAnnouncements } from "./store/slices/announcementSlice";

// Initial API Load
store.dispatch(fetchProducts());
store.dispatch(fetchAnnouncements());

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
