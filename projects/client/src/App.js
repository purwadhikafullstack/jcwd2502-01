import "./App.css";
import { useEffect, useState } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OnCheckIsLogin } from "./redux/features/users";

//! Components
import { Toaster } from "react-hot-toast";
import NavigationBar from "./components/layouts/shared/NavigationBar";
import Footer from "./components/layouts/shared/Footer";
import AdminSidebarMenu from "./components/layouts/admin/AdminSidebarMenu";
import ThemeToggle from "./components/uis/Buttons/ThemeToggle";

//! Pages
import HomePage from "./pages/public/HomePage";
import ExploreProductsPage from "./pages/public/ExploreProductsPage";
import ProductPage from "./pages/public/ProductPage";
import CartPage from "./pages/user/CartPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import ProfileSettingsPage from "./pages/user/ProfileSettingsPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignUpPage";
import AccountVerificationPage from "./pages/auth/AccountVerificationPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import AdminWarehouseListPage from "./pages/admin/warehouses/AdminWarehouseListPage";
import AdminNavigationBar from "./components/layouts/admin/AdminNavigationBar";
import AdminProductListPage from "./pages/admin/products/AdminProductListPage";
import AdminCategoriesPage from "./pages/admin/categories/AdminCategoriesPage";
import AdminCreateNewProductPage from "./pages/admin/products/AdminCreateNewProductPage";
import AdminEditProductPage from "./pages/admin/products/AdminEditProductPage";
import AdminBrandsPage from "./pages/admin/brands/AdminBrandsPage";
import AdminOverviewDashboardPage from "./pages/admin/home/AdminOverviewDashboardPage";
import AdminStocksListPage from "./pages/admin/stocks/AdminStocksListPage";
import OrderListPage from "./pages/user/OrderListPage";
import OrderDetailsPage from "./pages/user/OrderDetailsPage";
import AdminStocksLogPage from "./pages/admin/stocks/AdminStocksLogPage";
import AdminUserListPage from "./pages/admin/users/AdminUserListPage";
import AdminSalesReportPage from "./pages/admin/reports/AdminSalesReportPage";
import AdminOrderListPage from "./pages/admin/orders/AdminOrderListPage";
import usePathName from "./hooks/usePathName";

function App() {
	const location = useLocation();

	const { role } = useSelector((state) => state.user);

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
	);

	const [lang, setLang] = useState(
		localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
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
		localStorage.setItem("lang", lang);
		const localTheme = localStorage.getItem("theme");
		document.querySelector("html").setAttribute("class", localTheme);
	}, [theme, lang]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname.startsWith("verify/")) return;
		if (location.pathname === "/login") return;
		dispatch(OnCheckIsLogin());
	}, [dispatch]);

	const { pathname } = useLocation();

	const excludedPathsNavbar = [
		"/login",
		"/signup",
		"/verify",
		"/reset_password",
		"/admin",
	];
	const excludedPathsFooter = [
		"/login",
		"/signup",
		"/verify",
		"/reset_password",
		"/product",
		"/cart",
		"/admin",
	];
	const includedAdminNavigation = ["/admin"];

	const isExcludedNavbar = excludedPathsNavbar.some((path) =>
		pathname.startsWith(path)
	);
	const isExcludedFooter = excludedPathsFooter.some((path) =>
		pathname.startsWith(path)
	);
	const isIncludedAdminNavigation = includedAdminNavigation.some((path) =>
		pathname.startsWith(path)
	);

	const isAdminPage = usePathName("admin");

	useEffect(() => {
		dispatch(OnCheckIsLogin());
	}, [dispatch]);

	if (isAdminPage) {
		if (role === "user") return <Navigate to={"/"} />;

		if (role === "super") {
			return (
				<>
					<Toaster />
					{isIncludedAdminNavigation ? <AdminSidebarMenu /> : null}
					{isIncludedAdminNavigation ? <AdminNavigationBar /> : null}
					<ThemeToggle
						handleToggle={handleToggle}
						theme={theme}
						display={"hidden md:flex"}
					/>
					<Routes>
						<Route
							path="/admin"
							element={<Navigate to="/admin/home" />}
						/>
						<Route
							path="/admin/home"
							element={<AdminOverviewDashboardPage />}
						/>
						<Route
							path="/admin/warehouses"
							element={<AdminWarehouseListPage />}
						/>
						<Route
							path="/admin/users"
							element={<AdminUserListPage />}
						/>
						<Route
							path="/admin/orders"
							element={<AdminOrderListPage />}
						/>
						<Route
							path="/admin/products"
							element={<AdminProductListPage />}
						/>
						<Route
							path="/admin/add-product"
							element={<AdminCreateNewProductPage />}
						/>
						<Route
							path="/admin/edit-product/:productName"
							element={<AdminEditProductPage />}
						/>
						<Route
							path="/admin/stocks"
							element={<AdminStocksListPage />}
						/>
						<Route
							path="/admin/stock-history"
							element={<AdminStocksLogPage />}
						/>
						<Route
							path="/admin/categories"
							element={<AdminCategoriesPage />}
						/>
						<Route
							path="/admin/brands"
							element={<AdminBrandsPage />}
						/>
						<Route
							path="/admin/reports"
							element={<AdminSalesReportPage />}
						/>
						<Route path="*" element={<Navigate to={"/admin"} />} />
					</Routes>
					{isExcludedFooter ? null : <Footer />}
				</>
			);
		}

		if (role === "admin") {
			return (
				<>
					<Toaster />
					{isIncludedAdminNavigation ? <AdminSidebarMenu /> : null}
					{isIncludedAdminNavigation ? <AdminNavigationBar /> : null}
					<ThemeToggle
						handleToggle={handleToggle}
						theme={theme}
						display={"hidden md:flex"}
					/>
					<Routes>
						<Route
							path="/admin"
							element={<Navigate to="/admin/home" />}
						/>
						<Route
							path="/admin/home"
							element={<AdminOverviewDashboardPage />}
						/>
						<Route
							path="/admin/orders"
							element={<AdminOrderListPage />}
						/>
						<Route
							path="/admin/products"
							element={<AdminProductListPage />}
						/>
						<Route
							path="/admin/stocks"
							element={<AdminStocksListPage />}
						/>
						<Route
							path="/admin/categories"
							element={<AdminCategoriesPage />}
						/>
						<Route
							path="/admin/brands"
							element={<AdminBrandsPage />}
						/>
						<Route
							path="/admin/stock-history"
							element={<AdminStocksLogPage />}
						/>
						<Route
							path="/admin/reports"
							element={<AdminSalesReportPage />}
						/>
						<Route path="*" element={<Navigate to={"/admin"} />} />
					</Routes>
					{isExcludedFooter ? null : <Footer />}
				</>
			);
		}
	}

	if (role === "user" && localStorage.getItem("accessToken")) {
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
					<Route path="/explore" element={<ExploreProductsPage />} />
					<Route
						path="/product/:productName"
						element={<ProductPage />}
					/>
					<Route
						path="/profile/settings"
						element={<ProfileSettingsPage />}
					/>
					<Route path="/order-list" element={<OrderListPage />} />
					<Route
						path="/order-details/:receiptNumber"
						element={<OrderDetailsPage />}
					/>
					<Route path="/cart" element={<CartPage />} />
					<Route path="/cart/checkout" element={<CheckoutPage />} />
					<Route
						path="/verify/:token/:email"
						element={<AccountVerificationPage />}
					/>
					<Route
						path="/reset_password/:token"
						element={<ResetPasswordPage />}
					/>
					<Route path="*" element={<Navigate to={"/"} />} />
				</Routes>
				{isExcludedFooter ? null : <Footer />}
			</>
		);
	}

	if (!role || !localStorage.getItem("accessToken")) {
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
					<Route path="/explore" element={<ExploreProductsPage />} />
					<Route
						path="/product/:productName"
						element={<ProductPage />}
					/>
					<Route
						path="/verify/:token/:email"
						element={<AccountVerificationPage />}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					{/* <Route path="*" element={<Navigate to={"/"} />} /> */}
				</Routes>
				{isExcludedFooter ? null : <Footer />}
			</>
		);
	}

	if (role === "admin" || role === "super") {
		return <Navigate to={"/admin"} />;
	}

	return null;
}

export default App;
