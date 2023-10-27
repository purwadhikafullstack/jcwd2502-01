import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/public/HomePage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import NavigationBar from "./components/layouts/NavigationBar";
import Footer from "./components/layouts/Footer";
import ThemeToggle from "./components/uis/Buttons/ThemeToggle";
import LoginPage from "./pages/auth/LoginPage";
import { useEffect, useState } from "react";
import SignupPage from "./pages/auth/SignUpPage";
import ExploreProductsPage from "./pages/public/ExploreProductsPage";
import CartPage from "./pages/user/CartPage";
import AccountVerificationPage from "./pages/auth/AccountVerificationPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ProductPage from "./pages/public/ProductPage";
import { useDispatch, useSelector } from "react-redux";
import { OnCheckIsLogin } from "./redux/features/users";

function App() {
	const { username, email, role } = useSelector((state) => state.user);

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
	);

	const handleToggle = (e) => {
		if (e.target.checked) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	useEffect(() => {
		localStorage.setItem("theme", theme);
		const localTheme = localStorage.getItem("theme");
		document.querySelector("html").setAttribute("class", localTheme);
	}, [theme]);

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(OnCheckIsLogin());
		console.log(username);
	}, [dispatch]);

	const { pathname } = useLocation();

	const excludedPathsNavbar = [
		"/login",
		"/signup",
		"/verify",
		"/reset_password",
	];
	const excludedPathsFooter = [
		"/login",
		"/signup",
		"/verify",
		"/reset_password",
		"/product",
		"/cart",
	];

	const isExcludedNavbar = excludedPathsNavbar.some((path) =>
		pathname.startsWith(path)
	);
	const isExcludedFooter = excludedPathsFooter.some((path) =>
		pathname.startsWith(path)
	);

	return (
		<>
			<Toaster />
			{isExcludedNavbar ? null : <NavigationBar />}
			<ThemeToggle
				handleToggle={handleToggle}
				theme={theme}
				display={"hidden md:flex"}
			/>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/verify/:token/:email"
					element={<AccountVerificationPage />}
				/>
				<Route
					path="/reset_password/:token"
					element={<ResetPasswordPage />}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/explore" element={<ExploreProductsPage />} />
				<Route path="/product/1" element={<ProductPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			{isExcludedFooter ? null : <Footer />}
		</>
	);
}

export default App;
