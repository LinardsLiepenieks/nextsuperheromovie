import GitHubIcon from './ui/githubIcon';
const Footer = () => {
  return (
    <footer className="bg-primary text-secondary border-t-2 border-accent/80 mx-0 py-8 font-roboto-condensed pb-8 xl:px-0 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8 flex-wrap-reverse  gap-4 lg:flex-nowrap">
          <div className="flex flex-col items-center justify-center gap-16 w-full pt-4 lg:items-start">
            <a
              href="https://github.com/LinardsLiepenieks/nextsuperheromovie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300 font-light font-roboto-condensed"
              aria-label="View source code on GitHub"
            >
              <GitHubIcon className="h-10 w-20 lg:h-20" />
              Source code
            </a>
          </div>
          <div className="flex flex-col  gap-0 items-start justify-center py-4 lg:items-end">
            <span className="text-3xl tracking-wide   font-roboto-condensed text-secondary/90 py-2">
              Contact me!
            </span>
            <ul className="mt-2 flex flex-col items-start gap-4 lg:items-end">
              <li>
                <a
                  className="flex items-center gap-2 text-lg lg:text-xl font-light tracking-wide text-secondary/70 hover:text-secondary transition-all duration-300"
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
              <li>
                <a
                  className="flex items-center gap-2 text-lg lg:text-xl font-light tracking-wide text-secondary/70 hover:text-secondary transition-all duration-300"
                  href="https://github.com/LinardsLiepenieks"
                >
                  <span className="h-full w-auto self-align-center material-symbols-outlined">
                    code
                  </span>
                  <span className="leading-snug">
                    https://github.com/LinardsLiepenieks
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
