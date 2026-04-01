import React from "react";
import Layout from "../components/layout/Layout";
import { Mail, Phone, Headphones, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER SECTION */}
          <div className="contact-header">
             <h1 className="contact-title">GET IN TOUCH</h1>
             <div className="contact-subtitle">
                We’re here to help with anything you need.
             </div>
          </div>

          {/* MAIN CARD */}
          <div className="contact-card-wrapper">
             
             {/* LEFT VISUAL SECTION */}
             <div className="contact-left">
                <div className="icon-circle">
                   <Headphones size={80} strokeWidth={1.5} />
                </div>
                <div className="status-badge">
                   <span className="dot"></span> ALWAYS AVAILABLE
                </div>
             </div>

             {/* RIGHT CONTENT SECTION */}
             <div className="contact-right">
                <h2 className="section-heading">NEED ASSISTANCE?</h2>
                <p className="section-desc">
                   Whether you need help with orders, products, or general
                   inquiries, our support team ensures a smooth experience.
                </p>

                <div className="info-list">
                   {[
                      { icon: <Mail size={20} />, text: "help@ecommerceapp.com", label: "EMAIL US" },
                      { icon: <Phone size={20} />, text: "012-3456789", label: "CALL US" },
                      { icon: <MessageSquare size={20} />, text: "1800-0000-0000", label: "TOLL FREE" },
                   ].map((item, i) => (
                      <div key={i} className="info-item">
                         <div className="info-icon-box">{item.icon}</div>
                         <div className="info-content">
                            <span className="info-label">{item.label}</span>
                            <span className="info-text">{item.text}</span>
                         </div>
                      </div>
                   ))}
                </div>

                <button className="btn-support">
                   CONTACT SUPPORT
                </button>
             </div>

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
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* --- HEADER --- */
        .contact-header {
          text-align: center;
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contact-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          background: var(--yellow);
          border: var(--border);
          padding: 10px 30px;
          box-shadow: var(--shadow);
          transform: rotate(-1deg);
          display: inline-block;
        }

        .contact-subtitle {
          font-size: 1.2rem;
          font-weight: 600;
          background: var(--white);
          border: var(--border);
          padding: 8px 20px;
          box-shadow: 3px 3px 0px var(--black);
        }

        /* --- MAIN CARD WRAPPER --- */
        .contact-card-wrapper {
           display: flex;
           background: var(--white);
           border: var(--border);
           box-shadow: var(--shadow);
        }

        /* LEFT SIDE */
        .contact-left {
           flex: 1;
           background: var(--purple);
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           padding: 40px;
           border-right: var(--border);
           position: relative;
           overflow: hidden;
        }
        
        /* Decorative pattern for left side */
        .contact-left::before {
           content: "";
           position: absolute;
           top: 0; left: 0; right: 0; bottom: 0;
           background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)), repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1));
           background-position: 0 0, 10px 10px;
           background-size: 20px 20px;
        }

        .icon-circle {
           width: 180px; height: 180px;
           background: var(--white);
           border: var(--border);
           border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           color: var(--black);
           box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
           margin-bottom: 30px;
           z-index: 2;
        }

        .status-badge {
           background: var(--black);
           color: var(--green);
           padding: 8px 16px;
           border-radius: 20px;
           font-weight: 700;
           font-size: 0.85rem;
           display: flex; align-items: center; gap: 8px;
           z-index: 2;
           border: 2px solid var(--white);
        }
        
        .dot {
           width: 8px; height: 8px; background: var(--green); border-radius: 50%;
           box-shadow: 0 0 5px var(--green);
        }

        /* RIGHT SIDE */
        .contact-right {
           flex: 1.5;
           padding: 50px;
        }

        .section-heading {
           font-size: 1.8rem;
           font-weight: 800;
           margin-bottom: 15px;
           text-transform: uppercase;
        }

        .section-desc {
           font-size: 1rem;
           color: #444;
           line-height: 1.6;
           margin-bottom: 30px;
           font-weight: 500;
        }

        /* INFO LIST */
        .info-list {
           display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px;
        }

        .info-item {
           display: flex; align-items: center; gap: 15px;
           padding: 15px;
           border: 2px solid #eee;
           transition: 0.2s;
        }
        .info-item:hover {
           border-color: var(--black);
           background: var(--off-white);
           transform: translateX(5px);
        }

        .info-icon-box {
           width: 40px; height: 40px;
           background: var(--black);
           color: var(--white);
           display: flex; align-items: center; justify-content: center;
        }

        .info-content {
           display: flex; flex-direction: column;
        }

        .info-label { font-size: 0.75rem; font-weight: 700; color: #888; letter-spacing: 1px; }
        .info-text { font-size: 1.1rem; font-weight: 700; color: var(--black); }

        /* BUTTON */
        .btn-support {
           width: 100%;
           background: var(--yellow);
           color: var(--black);
           font-weight: 800;
           font-size: 1.1rem;
           padding: 15px;
           border: var(--border);
           cursor: pointer;
           box-shadow: var(--shadow);
           transition: 0.2s;
        }
        .btn-support:hover {
           transform: translate(-4px, -4px);
           box-shadow: var(--shadow-hover);
           background: var(--white);
        }

        @media (max-width: 768px) {
           .contact-card-wrapper { flex-direction: column; }
           .contact-left { padding: 30px; border-right: none; border-bottom: var(--border); }
           .contact-right { padding: 30px; }
           .contact-title { font-size: 2.5rem; }
        }
      `}</style>
    </Layout>
  );
};

export default Contact;