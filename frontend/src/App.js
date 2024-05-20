import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MetadataProvider } from "./context/MetadataContext";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/navbar";
import MoviePage from "./pages/viewMovie";
import Landing from "./pages/landing";
import LoadingScreen from "./pages/loadingScreen";
import Footer from "./components/footer";
import PrivacyPolicy from "./pages/privacyPolicy";
import CookiePolicy from "./pages/cookiePolicy";
import TermsOfUse from "./pages/termsOfUse";
function AppContent() {
	const { loading } = useLoading();
	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<div>
			<header className="App-header">
				<Navbar></Navbar>
			</header>

			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/movie" element={<MoviePage />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/cookie-policy" element={<CookiePolicy />} />
				<Route path="/terms" element={<TermsOfUse />} />
			</Routes>
			<Footer />
		</div>
	);
}

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ThemeProvider>
					<MetadataProvider>
						<LoadingProvider>
							<MovieProvider>
								<AppContent></AppContent>
							</MovieProvider>
						</LoadingProvider>
					</MetadataProvider>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
