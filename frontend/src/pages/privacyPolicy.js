import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
	return (
		<div className="privacy-policy">
			<div className="container">
				<div>
					<Link className="back-link" to={"/"}>
						Back
					</Link>
				</div>
				<h1>Privacy Policy</h1>
				<p>
					This privacy policy outlines how we collect, use, and protect your
					personal information when you use our website. Please read this policy
					carefully to understand our practices regarding your personal data and
					how we will treat it.
				</p>
				<h2>Information We Collect</h2>
				<p>
					We collect information when you interact with our website, including
					when you sign up for an account, submit a form, or contact us. The
					information we collect may include your name, email address, and any
					other information you provide.
				</p>
				<h2>Use of Cookies</h2>
				<p>
					We use cookies to enhance your browsing experience and analyze website
					traffic. Cookies are small text files stored on your computer that
					allow us to recognize you and remember your preferences when you
					return to our site. By using our website, you consent to the use of
					cookies.
				</p>
				<h2>Data Security</h2>
				<p>
					We take the security of your personal information seriously and take
					measures to protect it from unauthorized access, disclosure,
					alteration, or destruction. However, no method of transmission over
					the internet or electronic storage is 100% secure, and we cannot
					guarantee absolute security.
				</p>
				<h2>Contact Us</h2>
				<p>
					If you have any questions or concerns about our privacy practices or
					this policy, please contact us at linardsliepenieks@gmail.com .
				</p>
				<h2>Your GDPR Rights</h2>
				<p>
					Under the General Data Protection Regulation (GDPR), you have certain
					rights regarding your personal data, including the right to access,
					update, or delete your information. If you wish to exercise these
					rights or have any questions about how we handle your personal data,
					please contact us.
				</p>
				{/* Add more sections as needed */}
				<div className="clearfix"></div> {/* Clearfix */}
			</div>
		</div>
	);
};

export default PrivacyPolicy;
