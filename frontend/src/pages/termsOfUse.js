import { Link } from "react-router-dom";

const TermsOfUse = () => {
	return (
		<div className="privacy-policy">
			<div className="container">
				<div>
					<Link className="back-link" to={"/"}>
						Back
					</Link>
				</div>
				<h1>Terms of Use</h1>
				<p>
					Welcome to NextMarvelMovie!
					<br />
					By accessing this website, we assume you accept these terms and
					conditions. Do not continue to use NextMarvelMovie if you do not agree
					to take all of the terms and conditions stated on this page.
				</p>
				<h2>Cookies</h2>
				<p>
					We use cookies to provide you with a better browsing experience. By
					continuing to use our website, you agree to our use of cookies in
					accordance with our <a href="/cookie-policy">Cookie Policy</a>.
				</p>
				<h2>License</h2>
				<p>
					The MIT License (MIT)
					<br />
					Permission is hereby granted, free of charge, to any person obtaining
					a copy of this software and associated documentation files (the
					"Software"), to deal in the Software without restriction, including
					without limitation the rights to use, copy, modify, merge, publish,
					distribute, sublicense, and/or sell copies of the Software, and to
					permit persons to whom the Software is furnished to do so, subject to
					the following conditions:
					<br />
					(Insert MIT License text here)
				</p>
				<h2>Hyperlinking to our Content</h2>
				<p>
					You may link to our website, provided you do so in a fair and legal
					manner and do not imply any form of association, approval, or
					endorsement on our part without our express written consent.
					<br />
					(Insert hyperlinking terms here)
				</p>
				<h2>Embedded Trailers</h2>
				<p>
					We embed trailers to movies for informational and entertainment
					purposes only. We do not own or claim any rights to the content of
					these trailers. Any linked material belongs to the respective
					copyright holders, and we do not infringe upon their rights. The
					presence of embedded trailers does not imply any association,
					endorsement, or approval by NextMarvelMovie.
				</p>
				<h2>Disclaimer</h2>
				<p>
					To the maximum extent permitted by applicable law, we exclude all
					representations, warranties, and conditions relating to our website
					and the use of this website.
					<br />
					(Insert disclaimer terms here)
				</p>
				<h2>Governing Law & Jurisdiction</h2>
				<p>
					These terms and conditions will be governed by and construed in
					accordance with the laws of the European Union, and any disputes
					relating to these terms and conditions will be subject to the
					exclusive jurisdiction of the courts of the European Union.
				</p>{" "}
				<div className="clearfix"></div> {/* Clearfix */}
			</div>
		</div>
	);
};

export default TermsOfUse;
