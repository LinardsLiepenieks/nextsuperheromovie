import { Link } from "react-router-dom";

const CookiePolicy = () => {
	return (
		<div className="privacy-policy">
			<div className="container">
				<div>
					<Link className="back-link" to={"/"}>
						Back
					</Link>
				</div>
				<h2>Cookie Policy</h2>
				<p>Last updated: 2024.04.07</p>
				<p>
					This Cookie Policy explains what cookies are, how we use them, and how
					you can manage their use.
				</p>
				<h3>What are cookies?</h3>
				<p>
					Cookies are small text files that are stored on your computer or
					mobile device when you visit a website. They allow the website to
					recognize your device and store information about your preferences or
					past actions.
				</p>
				<h3>How do we use cookies?</h3>
				<p>We use cookies for the following purposes:</p>
				<ol>
					<li>
						<strong>Essential cookies:</strong> These cookies are necessary for
						the website to function properly. They enable basic functions like
						page navigation and access to secure areas of the website. The
						website cannot function properly without these cookies.
					</li>
					<li>
						<strong>Analytics cookies:</strong> These cookies allow us to
						analyze how visitors use our website, so we can improve its
						performance and content. For example, we may use Google Analytics to
						track website traffic.
					</li>
					<li>
						<strong>Advertising cookies:</strong> These cookies are used to
						deliver advertisements that are relevant to you and your interests.
						They may also be used to limit the number of times you see an
						advertisement and measure the effectiveness of advertising
						campaigns. We may use advertising cookies provided by third-party
						advertisers, such as Google AdSense.
					</li>
				</ol>
				<h3>How can you manage cookies?</h3>
				<p>
					You can control and/or delete cookies as you wish. You can delete all
					cookies that are already on your computer and you can set most
					browsers to prevent them from being placed. If you do this, however,
					you may have to manually adjust some preferences every time you visit
					a site and some services and functionalities may not work.
				</p>
				<p>To manage cookies, you can typically:</p>
				<ul>
					<li>
						Adjust your browser settings to accept or reject cookies, or notify
						you when a cookie is set.
					</li>
					<li>
						Use the settings provided by third-party services, such as Google Ad
						Settings, to manage the use of cookies for advertising purposes.
					</li>
				</ul>
				<h3>Changes to this Cookie Policy</h3>
				<p>
					We may update our Cookie Policy from time to time. We will notify you
					of any changes by posting the new Cookie Policy on this page.
				</p>
				<div className="clearfix"></div> {/* Clearfix */}
			</div>
		</div>
	);
};

export default CookiePolicy;
