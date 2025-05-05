import { Link } from "react-router-dom";
import { assets } from "../../assets/assets"
import "./Footer.css"
import { useTranslation } from 'react-i18next';
function Footer() {
  const { t} = useTranslation();
  return (
    <footer className="footer"  id="footer">

    <div className="footer-top section">
      <div className="container">

        <div className="footer-brand">

          <a href="#" className="logo">
            <img src="/images/logo.png" width="128" height="63" alt="autofix home"/>
          </a>

          <p className="footer-text">
            Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen zu attraktiven Preisen.
Bei uns erhalten Sie Qualität und Vertrauen in jedem Fahrzeug
          </p>

          <ul className="social-list">

            <li>
              <a href="https://www.facebook.com/profile.php?id=61560404041826" className="social-link">
                <img src="/images/facebook.svg" alt="facebook"/>
              </a>
            </li>

            <li>
              <a href="https://instagram.com/deluxe.auto.de" className="social-link">
                <img src="/images/instagram.svg" alt="instagram"/>
              </a>
            </li>

            <li>
              <a href="https://home.mobile.de/NASERMAZENUNDSAIEDMOKHAMEDRAIEDGBR#ses" className="social-link">
                <img src="/images/Mobile-de-logo.svg.png" alt="twitter"/>
              </a>
            </li>

          </ul>

        </div>

        <ul className="footer-list">

          <li>
            <p className="h3">Öffnungszeiten</p>
          </li>

          <li>
            <p className="p">Montag – Samstag</p>

            <span className="span">9.00 – 18.00</span>
          </li>

          <li>
            <p className="p">Samstag</p>

            <span className="span">9.00 – 16.00</span>
          </li>


        </ul>

        <ul className="footer-list">

          <li>
            <p className="h3">Contact Info</p>
          </li>

          <li>
            <a href="tel:+01234567890" className="footer-link">
              <span className="material-symbols-rounded">call</span>

              <span className="span"> +49 1514 0144  530</span>
            </a>
          </li>

          <li>
            <a href="mailto:info@autofix.com" className="footer-link">
              <span className="material-symbols-rounded">mail</span>

              <span className="span">DELUXE_AUTOMOBILE@ICLOUD.COM</span>
            </a>
          </li>

          <li>
            <address className="footer-link address">
              <span className="material-symbols-rounded">Standort_an</span>

              <span className="span">Leipyiger Straße 323, Kassel, Germany 34123 </span>
            </address>
          </li>
          <a href="#header" alt="" className="up-btn">&#11165;</a>
        </ul>
        

      </div>
      
      <img src="/images/footer-shape-3.png" width="637" height="173" loading="lazy" alt="Shape"
        className="shape shape-3 move-anim"/>

    </div>

    <div className="footer-bottom">
      <div className="container">

        <p className="copyright">Copyright 2025, auto delux All Rights Reserved.</p>

        <img src="/images/footer-shape-2.png" width="778" height="335" loading="lazy" alt="Shape"
          className="shape shape-2"/>

        <img src="/images/footer-shape-1.png" width="805" height="652" loading="lazy" alt="Red Car"
          className="shape shape-1 move-anim"/>

      </div>
    </div>

  </footer>
  )
}

export default Footer