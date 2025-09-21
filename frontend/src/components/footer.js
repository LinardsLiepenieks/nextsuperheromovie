import LogoImg from '../assets/img/logo.png';
import FooterLink from './ui/FooterLink';

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary border-t-2 border-accent/80 mx-0 py-8 font-roboto-condensed pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-12">
          <div className="flex items-start gap-16">
            <div>
              <div className="w-40 h-40 flex items-center justify-center">
                <img
                  src={LogoImg}
                  alt="Liepenieks"
                  className="w-full h-auto"
                ></img>
              </div>
            </div>
            <div className="flex pt-0 gap-16">
              <div>
                <span className="text-3xl tracking-wide font-light  font-roboto-condensed text-secondary/90 ">
                  Policies:
                </span>
                <ul className="flex flex-col gap-2 mt-2">
                  <li className="">
                    <FooterLink to="/privacy-policy" icon="visibility">
                      Privacy Policy
                    </FooterLink>
                  </li>
                  <li className="">
                    <FooterLink to="/cookie-policy" icon="cookie">
                      Cookie Policy
                    </FooterLink>
                  </li>
                  <li className="">
                    <FooterLink to="/terms" icon="gavel">
                      Terms of use
                    </FooterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col  gap-0 items-end justify-center ">
            <span className="text-3xl tracking-wide   font-roboto-condensed text-secondary/90">
              Contact me!
            </span>
            <ul className="mt-2">
              <li>
                <a
                  className="flex items-center gap-2 text-xl font-light tracking-wide text-secondary/70 hover:text-secondary transition-all duration-300"
                  href="mailto:linardsliepenieks@gmail.com"
                >
                  <span className="h-full w-auto self-align-center material-symbols-outlined">
                    mail
                  </span>
                  <span className="leading-snug">
                    linardsliepenieks@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-secondary/40 tracking-wide">
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
