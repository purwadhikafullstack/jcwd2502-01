import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/public/HomePage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

function App() {
	return (
		<>
			<Toaster />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
