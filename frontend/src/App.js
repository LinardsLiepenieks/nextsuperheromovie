import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { MetadataProvider } from './context/MetadataContext';
import { MovieProvider } from './context/MovieContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/navigation/navbar';
import MoviePage from './pages/viewMovie';
import Footer from './components/footer';
import PrivacyPolicy from './pages/privacyPolicy';
import CookiePolicy from './pages/cookiePolicy';
import TermsOfUse from './pages/termsOfUse';
function AppContent() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>

      <Routes>
        <Route path="/" element={<MoviePage />} />
        <Route path="/marvel" element={<MoviePage />} />
        <Route path="/dc" element={<MoviePage />} />
        <Route path="/sony" element={<MoviePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <MetadataProvider>
            <MovieProvider>
              <AppContent></AppContent>
            </MovieProvider>
          </MetadataProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
