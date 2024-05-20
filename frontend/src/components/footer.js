import LOGO from "../img/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<div className="footer container">
				<div className="footer-content">
					<div>
						<div className="logo-container">
							<img src={LOGO} alt="Liepenieks"></img>
							<span>Project</span>
						</div>

						<div className="contact-container">
							<span className="contact-title">Contact me!</span>
							<ul>
								<li>
									<a
										className="contact-icon underline-link-center"
										href="mailto:linardsliepenieks@gmail.com">
										<span className=" self-align-center material-symbols-outlined">
											mail
										</span>{" "}
										linardsliepenieks@gmail.com
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="footer-link-container">
						<span className="footer-link-container-title">Links:</span>
						<ul>
							<li>
								<Link
									to="/privacy-policy"
									className="contact-icon underline-link-center">
									<span className="material-symbols-outlined">visibility</span>
									Privacy Policy
								</Link>
							</li>
							<li className="">
								<Link
									to="/cookie-policy"
									className="contact-icon underline-link-center">
									<span className="material-symbols-outlined">cookie</span>{" "}
									Cookie Policy
								</Link>
							</li>
							<li className="">
								<Link
									to="/terms"
									className="contact-icon underline-link-center">
									<span className="material-symbols-outlined">gavel</span> Terms
									of use
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="disclaimer-container">
					<span>
						This website is not affiliated with Marvel Entertainment, LLC,
						Marvel Studios, Marvel Comics, or any other subsidiaries or
						divisions of The Walt Disney Company.
					</span>
					<span>
						The intellectual property depicted in this website belongs to Marvel
						and its affiliated companies.
					</span>
					<span>
						© 2024 Liepenieks. All rights reserved. The content and materials on
						this website are protected by copyright law. Reproduction,
						distribution, or modification of any part of this website without my
						express permission is strictly prohibited.
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
