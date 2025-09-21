import { Link } from 'react-router-dom';

const FooterLink = ({ to, icon, children }) => {
  return (
    <Link
      to={to}
      className="flex items-center text-lg text-secondary/60 gap-2 hover:text-secondary transition-colors duration-300 ease"
    >
      <span className="material-symbols-outlined">{icon}</span>
      {children}
    </Link>
  );
};

export default FooterLink;
