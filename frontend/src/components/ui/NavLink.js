import React from 'react';
import { Link } from 'react-router-dom';
import { cva } from 'class-variance-authority';

// Define the link styles using CVA
const linkStyles = cva(['font-roboto-condensed'], {
  variants: {
    variant: {
      navbar: [
        'text-secondary',
        'uppercase',
        'relative',
        'flex',
        'leading-normal',
        'align-bottom',
        'border-0',
        'after:content-[""]',
        'after:absolute',
        'after:-bottom-0.5',
        'after:left-1/2',
        'after:w-0',
        'after:h-0.5',
        'after:bg-current',
        'after:transition-all',
        'after:duration-300',
        'after:ease-in-out',
        'hover:after:left-0',
        'hover:after:w-full',
      ],
    },
    size: {
      lg: ['text-lg', 'px-1'],
    },
  },
  defaultVariants: {
    variant: 'navbar',
    size: 'md',
  },
});

/**
 * Polymorphic NavLink component that can render as Link, button, or anchor
 *
 * @param {string} to - React Router path (renders as Link)
 * @param {function} onClick - Click handler (renders as button)
 * @param {string} href - External URL (renders as anchor)
 * @param {string} variant - Style variant: navbar, movie-title, movie-genre, footer
 * @param {string} size - Size variant: sm, md, lg, xl
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Component content
 * @param {object} props - Additional props passed to underlying element
 */
const NavLink = ({
  to,
  onClick,
  href,
  variant,
  size,
  className = '',
  children,
  ...props
}) => {
  // Generate the CSS classes using CVA
  const classes = `${linkStyles({ variant, size })} ${className}`.trim();

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 25);
  };

  // Navigation link (React Router)
  if (to) {
    return (
      <Link to={to} className={classes} {...props} onClick={scrollToTop}>
        {children}
      </Link>
    );
  }

  // Action button (for functions like scrolling)
  if (onClick) {
    return (
      <button onClick={onClick} className={classes} type="button" {...props}>
        <span>{children}</span>
      </button>
    );
  }

  // External link
  return (
    <a href={href} className={classes} {...props}>
      <span>{children}</span>
    </a>
  );
};

export default NavLink;
