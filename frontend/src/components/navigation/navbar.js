import NavLink from '../ui/NavLink';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-primary flex justify-center lg:justify-between py-6 px-12 fixed w-full z-50">
      <ul className="flex gap-8">
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
    </nav>
  );
};

export default Navbar;
