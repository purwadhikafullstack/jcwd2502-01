import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/public/HomePage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import NavigationBar from "./components/layouts/NavigationBar";
import Footer from "./components/layouts/Footer";
import ThemeToggle from "./components/uis/Buttons/ThemeToggle";

function App() {
	return (
		<>
			<Toaster />
			<NavigationBar />
			<ThemeToggle />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
