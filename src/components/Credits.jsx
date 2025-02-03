import githubLogoLight from "../assets/github-light.svg";
import emailLogoLight from "../assets/email-light.svg";
import linkendlinLogoLight from "../assets/linkedlin-light.svg";

import githubLogoDark from "../assets/github-dark.svg";
import emailLogoDark from "../assets/email-dark.svg";
import linkendlinLogoDark from "../assets/linkedlin-dark.svg";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../css/Credits.css";

const Credits = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className="credits">
      <address className="social-network-icons">
        <a
          href="https://github.com/gotax24?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="link-networks"
        >
          <img
            src={theme === "light" ? githubLogoLight : githubLogoDark}
            className="img-footer"
            alt="logo de github"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/ernesto-bracho/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-networks"
        >
          <img
            src={theme === "light" ? linkendlinLogoLight : linkendlinLogoDark}
            className="img-footer"
            alt="logo de likendlin"
          />
        </a>
        <a
          href="mailto:dev.ejbr@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link-networks"
        >
          <img
            src={theme === "light" ? emailLogoLight : emailLogoDark}
            className="img-footer"
            alt="logo de email"
          />
        </a>
      </address>
      <div className="copyright">Creator: Ing. Ernesto Bracho 2025 &#169;</div>
    </footer>
  );
};

export default Credits;
