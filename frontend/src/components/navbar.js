import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    console.log('SCROLL');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav>
      <div className="container !bg-blue-500">
        <div className="!bg-blue-500 !text-red-500">NM</div>
        <div className="navbar-links">
          {/* Conditionally render the ul element and its content */}
          {!isHomePage && (
            <ul>
              <li>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => scrollToSection('movies')}
                >
                  Movies
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
