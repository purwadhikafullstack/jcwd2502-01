import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.js";
import { NextUIProvider } from "@nextui-org/react";
import { ContextProvider } from "./contexts/ContextProvider";
import "./i18n";
import "flag-icons";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<NextUIProvider>
				<ContextProvider>
					<Suspense fallback={<h1>Loading...</h1>}>
						<App />
					</Suspense>
				</ContextProvider>
			</NextUIProvider>
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
