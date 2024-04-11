import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MetadataProvider } from "./context/MetadataContext";
import Navbar from "./components/navbar";
import Landing from "./pages/landing";
import Footer from "./components/footer";
import PrivacyPolicy from "./pages/privacyPolicy";
import CookiePolicy from "./pages/cookiePolicy";
import TermsOfUse from "./pages/termsOfUse";
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<MetadataProvider>
					<header className="App-header">
						<Navbar></Navbar>
					</header>
					<Routes>
						<Route
							path="/"
							element={<Navigate to="/marvel"></Navigate>}></Route>
						<Route path="/marvel" element={<Landing></Landing>}></Route>
						<Route
							path="/privacy-policy"
							element={<PrivacyPolicy></PrivacyPolicy>}></Route>
						<Route
							path="/cookie-policy"
							element={<CookiePolicy></CookiePolicy>}></Route>
						<Route path="/terms" element={<TermsOfUse></TermsOfUse>}></Route>
					</Routes>
					<Footer></Footer>
				</MetadataProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
