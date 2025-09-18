import { useLocation } from 'react-router-dom';
import NavLink from '../ui/NavLink';

const FranchiseNavigation = () => {
  const location = useLocation();

  const franchises = [
    { path: '/marvel', label: 'Marvel' },
    { path: '/dc', label: 'DC' },
    { path: '/sony', label: 'SONY' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <ul className="flex gap-8 py-4">
      {franchises.map((franchise) => (
        <li key={franchise.path}>
          <NavLink
            to={franchise.path}
            variant={
              isActive(franchise.path) ? 'franchise-active' : 'franchise'
            }
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
