import React from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { AlertTriangle, MoveLeft } from 'lucide-react';

const Pagenotfound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="pop-page-background">
        <div className="pnf-container">
          
          <div className="pnf-card">
            {/* ICON HEADER */}
            <div className="error-icon-box">
               <AlertTriangle size={48} strokeWidth={2.5} />
            </div>

            {/* BIG 404 TEXT */}
            <h1 className="pnf-title">404</h1>
            
            {/* MESSAGE */}
            <h2 className="pnf-heading">OOPS! PAGE NOT FOUND</h2>
            <p className="pnf-desc">
              The page you are looking for might have been removed, 
              had its name changed, or is temporarily unavailable.
            </p>

            {/* ACTION BUTTON */}
            <Link to="/" className="pnf-btn">
              <MoveLeft size={20} strokeWidth={2.5} /> GO BACK HOME
            </Link>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&display=swap');

        :root {
          --black: #000000;
          --white: #ffffff;
          --off-white: #fdfbf7;
          --yellow: #ffdb4d;
          --red: #ef4444;
          --border: 2.5px solid var(--black);
          --shadow: 6px 6px 0px var(--black);
          --shadow-hover: 10px 10px 0px var(--black);
          --font: 'Space Grotesk', sans-serif;
        }

        /* --- BACKGROUND --- */
        .pop-page-background {
          background-color: var(--off-white);
          background-image: radial-gradient(var(--black) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font);
          padding: 40px 20px;
        }

        .pnf-container {
          width: 100%;
          max-width: 600px;
        }

        /* --- CARD --- */
        .pnf-card {
           background: var(--white);
           border: var(--border);
           padding: 60px 40px;
           text-align: center;
           box-shadow: var(--shadow);
           display: flex;
           flex-direction: column;
           align-items: center;
           position: relative;
        }

        /* --- ELEMENTS --- */
        .error-icon-box {
           background: var(--yellow);
           border: var(--border);
           width: 80px; height: 80px;
           display: flex; align-items: center; justify-content: center;
           border-radius: 50%;
           margin-bottom: 20px;
           color: var(--black);
           box-shadow: 3px 3px 0px var(--black);
        }

        .pnf-title {
           font-size: 8rem;
           font-weight: 800;
           line-height: 1;
           margin: 0;
           color: var(--black);
           text-shadow: 4px 4px 0px #ddd;
        }

        .pnf-heading {
           font-size: 2rem;
           font-weight: 800;
           text-transform: uppercase;
           margin: 10px 0 20px;
           background: var(--black);
           color: var(--white);
           padding: 5px 15px;
           transform: rotate(-2deg);
        }

        .pnf-desc {
           font-size: 1.1rem;
           color: #555;
           margin-bottom: 40px;
           max-width: 400px;
           line-height: 1.6;
        }

        /* --- BUTTON --- */
        .pnf-btn {
           background: var(--white);
           color: var(--black);
           text-decoration: none;
           font-weight: 800;
           font-size: 1.1rem;
           padding: 15px 30px;
           border: var(--border);
           box-shadow: var(--shadow);
           display: flex;
           align-items: center;
           gap: 10px;
           transition: 0.2s;
        }

        .pnf-btn:hover {
           background: var(--black);
           color: var(--white);
           box-shadow: var(--shadow-hover);
           transform: translate(-4px, -4px);
        }

        @media (max-width: 768px) {
           .pnf-title { font-size: 5rem; }
           .pnf-heading { font-size: 1.5rem; }
           .pnf-card { padding: 40px 20px; }
        }
      `}</style>
    </Layout>
  )
}

export default Pagenotfound;