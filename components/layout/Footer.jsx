import React from 'react';
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <div className='pop-footer'>
      <div className="footer-container">
        
        {/* TOP SECTION: LINKS */}
        <div className="footer-links">
          <Link to="/about" className="foot-link">ABOUT</Link>
          <Link to="/contact" className="foot-link">CONTACT</Link>
          <Link to="/policy" className="foot-link">POLICY</Link>
        </div>

        {/* DIVIDER */}
        <div className="footer-line"></div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <h1 className='footer-text'>
           ALL RIGHTS RESERVED &copy; 2026 AMAN
        </h1>
        
        <p className="made-with">
           MADE WITH <Heart size={16} fill="#ef4444" stroke="none" /> AND <b>REACT</b>
        </p>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&display=swap');

        :root {
           --black: #000000;
           --white: #ffffff;
           --yellow: #ffdb4d;
           --purple: #a855f7;
           --border: 2.5px solid var(--black);
        }

        .pop-footer {
           background: var(--black);
           color: var(--white);
           font-family: 'Space Grotesk', sans-serif;
           padding: 50px 20px;
           border-top: 4px solid var(--black);
           margin-top: auto; /* Pushes footer to bottom if content is short */
        }

        .footer-container {
           max-width: 1200px;
           margin: 0 auto;
           display: flex;
           flex-direction: column;
           align-items: center;
           text-align: center;
        }

        /* LINKS */
        .footer-links {
           display: flex;
           gap: 20px;
           margin-bottom: 30px;
           flex-wrap: wrap;
           justify-content: center;
        }

        .foot-link {
           color: var(--white);
           text-decoration: none;
           font-weight: 700;
           font-size: 1.1rem;
           border: 2px solid var(--white);
           padding: 10px 25px;
           transition: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
           text-transform: uppercase;
           letter-spacing: 1px;
        }

        .foot-link:hover {
           background: var(--yellow);
           color: var(--black);
           border-color: var(--black);
           transform: translate(-4px, -4px);
           box-shadow: 4px 4px 0px var(--white);
        }

        /* DIVIDER */
        .footer-line {
           width: 100px;
           height: 4px;
           background: var(--purple);
           margin-bottom: 30px;
        }

        /* COPYRIGHT */
        .footer-text {
           font-size: 1rem;
           font-weight: 400;
           letter-spacing: 2px;
           opacity: 0.8;
           margin-bottom: 10px;
        }

        .made-with {
           font-size: 0.85rem;
           display: flex;
           align-items: center;
           gap: 6px;
           opacity: 0.6;
        }

        @media (max-width: 768px) {
           .footer-links { flex-direction: column; gap: 15px; width: 100%; }
           .foot-link { width: 100%; display: block; }
        }
      `}</style>
    </div>
  )
}

export default Footer;