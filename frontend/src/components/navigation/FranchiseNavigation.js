import { useLocation } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import NavLink from '../ui/NavLink';

const FranchiseNavigation = () => {
  const location = useLocation();
  const { activeFranchise, isLandingPage } = useMovieContext();

  const franchises = [
    { path: '/marvel', label: 'Marvel', franchise: 'marvel' },
    { path: '/dc', label: 'DC', franchise: 'dc' },
    { path: '/sony', label: 'SONY', franchise: 'sony' },
  ];

  const isActive = (franchise) => {
    if (isLandingPage) {
      return activeFranchise === franchise.franchise;
    }
    return location.pathname === franchise.path;
  };

  return (
    <ul className="flex gap-8 lg:py-4">
      {franchises.map((franchise) => (
        <li key={franchise.path}>
          <NavLink
            to={franchise.path}
            variant={isActive(franchise) ? 'franchise-active' : 'franchise'}
            size="4xl"
          >
            {franchise.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default FranchiseNavigation;
