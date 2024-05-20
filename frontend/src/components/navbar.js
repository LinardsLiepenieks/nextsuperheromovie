import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<nav>
			<div className="container">
				<div className="nav-logo">NM</div>
				<div className="navbar-links">
					<ul>
						<li>
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li>
							<button
								className="nav-link"
								onClick={() => scrollToSection("movies")}>
								Movies
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
