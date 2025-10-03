import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/navigation/navbar';
import MoviePage from './pages/viewMovie';
import Footer from './components/footer';
import { LoadingProvider } from './context/LoadingContext';
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
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoadingProvider>
          <ThemeProvider>
            <MovieProvider>
              <AppContent></AppContent>
            </MovieProvider>
          </ThemeProvider>
        </LoadingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
