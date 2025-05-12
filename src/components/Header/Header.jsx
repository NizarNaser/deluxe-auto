import "./Header.css";
import { useRef, useState } from "react";

function Header() {
  const navbarRef = useRef(null);
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNavbar = () => {
    setIsNavActive((prev) => !prev);
    if (navbarRef.current) {
      navbarRef.current.classList.toggle("active");
    }
  };

  return (
    <header className="header" id="header">
      <div className="container">

        <a href="/" className="logo">
          <img src="/images/logo.webp" width="128" height="63" alt="autofix home" loading="lazy"/>
        </a>

        <nav
          className={`navbar ${isNavActive ? "active" : ""}`}
          data-navbar
          ref={navbarRef}
        >
          <ul className="navbar-list">

            <li>
              <a href="/" className="navbar-link">Heim</a>
            </li>

            <li>
              <a href="#service-label" className="navbar-link">Unsere Leistungen</a>
            </li>

            <li>
              <a href="#cars-label" className="navbar-link">UNSER FAHRZEUGBESTAND</a>
            </li>

            <li>
              <a href="#footer" className="navbar-link">Kontaktieren Sie uns</a>
            </li>

          </ul>
        </nav>
        <a href="#" className="btn btn-primary">
          <span  className="span">Ein Angebot einholen</span>
          <span className="material-symbols-rounded">arrow_forward</span>
        </a>

        <button
          className={`nav-toggle-btn ${isNavActive ? "active" : ""}`}
          aria-label="toggle menu"
          data-nav-toggler
          onClick={toggleNavbar}
        >
          <span className="nav-toggle-icon icon-1"></span>
          <span className="nav-toggle-icon icon-2"></span>
          <span className="nav-toggle-icon icon-3"></span>
        </button>

      </div>
    </header>
  );
}

export default Header;
