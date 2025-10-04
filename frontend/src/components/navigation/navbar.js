import NavLink from '../ui/NavLink';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-primary py-6 px-12  fixed w-full z-50  ">
      <div className="w-full max-w-6xl mx-auto flex justify-center sm:justify-end ">
        <ul className="flex gap-8 max-w-6xl">
          <li>
            <NavLink to="/marvel" variant="navbar" size="lg">
              Marvel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dc" variant="navbar" size="lg">
              DC
            </NavLink>
          </li>
          <li>
            <NavLink to="/sony" variant="navbar" size="lg">
              SONY
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => scrollToSection('movies')}
              variant="navbar"
              size="lg"
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
