import React from "react";
import Layout from "../components/layout/Layout";
import { ShieldCheck, User, Lock, Cookie, RefreshCw, FileText } from "lucide-react";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER SECTION */}
          <div className="policy-header">
             <div className="icon-header-box">
                <FileText size={32} strokeWidth={2.5} />
             </div>
             <h1 className="policy-title">PRIVACY POLICY</h1>
             <p className="policy-subtitle">
                Your trust matters. Here is how we protect and use your data.
             </p>
          </div>

          {/* POLICY GRID */}
          <div className="policy-grid">
            
            <PolicyCard
              icon={<User size={32} strokeWidth={2.5} />}
              title="CUSTOMER INFO"
              text="We collect essential details like name, email, and address strictly to process your orders efficiently."
              color="var(--yellow)"
            />

            <PolicyCard
              icon={<Lock size={32} strokeWidth={2.5} />}
              title="SECURE PAYMENTS"
              text="All transactions are protected using industry-standard encryption and trusted payment gateways."
              color="var(--purple)"
            />

            <PolicyCard
              icon={<ShieldCheck size={32} strokeWidth={2.5} />}
              title="DATA PROTECTION"
              text="Your personal data is strictly confidential and never sold or shared with third parties without consent."
              color="var(--green)"
            />

            <PolicyCard
              icon={<Cookie size={32} strokeWidth={2.5} />}
              title="COOKIES & TRACKING"
              text="We use cookies to personalize your shopping experience and analyze website traffic for improvements."
              color="var(--white)"
            />

            <PolicyCard
              icon={<RefreshCw size={32} strokeWidth={2.5} />}
              title="POLICY UPDATES"
              text="We may update this policy periodically. Significant changes will be communicated on this page."
              color="var(--off-white)"
            />

          </div>

          {/* FOOTER NOTE */}
          <div className="policy-footer">
             <p>By using our website, you agree to the terms outlined above.</p>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap');

        :root {
          --black: #000000;
          --white: #ffffff;
          --off-white: #fdfbf7;
          --yellow: #ffdb4d;
          --purple: #a855f7;
          --green: #4ade80;
          --border: 2.5px solid var(--black);
          --shadow: 5px 5px 0px var(--black);
          --shadow-hover: 8px 8px 0px var(--black);
          --font: 'Space Grotesk', sans-serif;
        }

        /* --- BACKGROUND --- */
        .pop-page-background {
          background-color: var(--off-white);
          background-image: radial-gradient(var(--black) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          min-height: 90vh;
          padding: 60px 0;
          border-top: var(--border);
          font-family: var(--font);
        }

        .pop-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* --- HEADER --- */
        .policy-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-header-box {
           width: 60px; height: 60px;
           background: var(--white);
           border: var(--border);
           border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           margin-bottom: 15px;
           box-shadow: 3px 3px 0px var(--black);
        }

        .policy-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 10px;
          background: var(--black);
          color: var(--white);
          padding: 5px 25px;
          transform: rotate(-1deg);
          box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
        }

        .policy-subtitle {
          font-size: 1.2rem;
          font-weight: 600;
          background: var(--white);
          border: var(--border);
          padding: 8px 20px;
          box-shadow: 3px 3px 0px var(--black);
        }

        /* --- GRID --- */
        .policy-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
           gap: 35px;
           margin-bottom: 60px;
        }

        /* --- CARD --- */
        .policy-card {
           border: var(--border);
           padding: 30px;
           display: flex;
           flex-direction: column;
           align-items: flex-start;
           box-shadow: var(--shadow);
           transition: 0.2s;
           position: relative;
           overflow: hidden;
        }

        .policy-card:hover {
           transform: translate(-4px, -4px);
           box-shadow: var(--shadow-hover);
        }
        
        /* Card Specific Colors */
        .policy-card[style*="purple"] { color: var(--white); }
        .policy-card[style*="purple"] .card-text { color: rgba(255,255,255,0.9); }
        .policy-card[style*="purple"] .card-icon-box { background: var(--white); color: var(--black); }

        .card-icon-box {
           width: 50px; height: 50px;
           background: var(--black);
           color: var(--white);
           display: flex; align-items: center; justify-content: center;
           border: 2px solid var(--black);
           margin-bottom: 15px;
           box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
        }

        .card-title {
           font-weight: 800;
           font-size: 1.2rem;
           margin-bottom: 10px;
           text-transform: uppercase;
           letter-spacing: 0.5px;
        }

        .card-text {
           font-size: 1rem;
           line-height: 1.6;
           font-weight: 500;
        }

        /* --- FOOTER --- */
        .policy-footer {
           text-align: center;
           border-top: 2px dashed var(--black);
           padding-top: 30px;
           font-weight: 600;
           color: #555;
        }

        @media (max-width: 768px) {
           .policy-title { font-size: 2.5rem; }
           .policy-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

/* Reusable Card Component */
const PolicyCard = ({ icon, title, text, color }) => (
  <div className="policy-card" style={{ backgroundColor: color }}>
    <div className="card-icon-box">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-text">{text}</p>
  </div>
);

export default Policy;