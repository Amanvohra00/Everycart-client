import React from "react";
import Layout from "../components/layout/Layout";
import { ShieldCheck, Store, Truck, Headset, Star } from "lucide-react";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER SECTION */}
          <div className="about-header">
             <h1 className="about-title">WHO WE ARE</h1>
             <div className="about-subtitle">
                Built on trust, quality, and bold design.
             </div>
          </div>

          {/* STORY SECTION */}
          <div className="story-card">
             <div className="story-header">
                <Star size={24} fill="black" /> OUR MISSION
             </div>
             <p className="story-text">
                We are a customer-centric ecommerce platform committed to delivering
                high-quality products with transparency and reliability. Our focus
                is on simplifying online shopping while maintaining the highest
                standards of service and security.
             </p>
             <p className="story-text">
                From carefully curated collections to efficient delivery and
                responsive customer support, every detail is designed to provide
                a smooth and trustworthy shopping experience.
             </p>
          </div>

          {/* FEATURES GRID */}
          <div className="features-grid">
            {[
              {
                icon: <Store size={32} strokeWidth={2.5} />,
                title: "CURATED PRODUCTS",
                desc: "A carefully selected range of products ensuring quality and value.",
                color: "var(--yellow)"
              },
              {
                icon: <ShieldCheck size={32} strokeWidth={2.5} />,
                title: "SECURE SHOPPING",
                desc: "Safe payments, data protection, and trusted checkout experience.",
                color: "var(--purple)"
              },
              {
                icon: <Truck size={32} strokeWidth={2.5} />,
                title: "FAST DELIVERY",
                desc: "Efficient logistics designed to deliver your orders on time.",
                color: "var(--green)"
              },
              {
                icon: <Headset size={32} strokeWidth={2.5} />,
                title: "24/7 SUPPORT",
                desc: "Dedicated support available whenever you need assistance.",
                color: "var(--white)"
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="feat-card"
                style={{ animationDelay: `${index * 0.1}s`, backgroundColor: item.color }}
              >
                <div className="feat-icon-box">
                  {item.icon}
                </div>
                <h3 className="feat-title">{item.title}</h3>
                <p className="feat-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CLOSING STATEMENT */}
          <div className="closing-box">
             <p>
                Our mission is to redefine ecommerce by combining simplicity,
                reliability, and modern design — making every purchase confident
                and enjoyable.
             </p>
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
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* --- HEADER --- */
        .about-header {
          text-align: center;
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .about-title {
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

        .about-subtitle {
          font-size: 1.2rem;
          font-weight: 600;
          background: var(--white);
          border: var(--border);
          padding: 8px 20px;
          box-shadow: 3px 3px 0px var(--black);
        }

        /* --- STORY CARD --- */
        .story-card {
           background: var(--white);
           border: var(--border);
           padding: 40px;
           box-shadow: var(--shadow);
           margin-bottom: 60px;
           position: relative;
        }

        .story-header {
           font-size: 1.5rem;
           font-weight: 800;
           display: flex;
           align-items: center;
           gap: 10px;
           margin-bottom: 20px;
           border-bottom: 2px solid #eee;
           padding-bottom: 10px;
        }

        .story-text {
           font-size: 1.1rem;
           line-height: 1.7;
           margin-bottom: 20px;
           color: #333;
        }

        /* --- FEATURES GRID --- */
        .features-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
           gap: 30px;
           margin-bottom: 60px;
        }

        @keyframes popUp {
           from { transform: scale(0.9); opacity: 0; }
           to { transform: scale(1); opacity: 1; }
        }

        .feat-card {
           border: var(--border);
           padding: 25px;
           display: flex;
           flex-direction: column;
           align-items: center;
           text-align: center;
           box-shadow: var(--shadow);
           transition: 0.2s;
           animation: popUp 0.5s ease forwards;
           opacity: 0; /* hidden initially */
        }

        .feat-card:hover {
           transform: translate(-4px, -4px);
           box-shadow: var(--shadow-hover);
        }
        
        /* Specific text color for purple bg */
        .feat-card[style*="purple"] { color: var(--white); }
        .feat-card[style*="purple"] .feat-desc { color: rgba(255,255,255,0.9); }

        .feat-icon-box {
           background: var(--black);
           color: var(--white);
           width: 60px; height: 60px;
           display: flex; align-items: center; justify-content: center;
           border-radius: 50%;
           border: 2px solid var(--black);
           margin-bottom: 15px;
           box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
        }
        
        /* Invert icon for white card */
        .feat-card[style*="white"] .feat-icon-box {
           background: var(--white); color: var(--black);
        }

        .feat-title {
           font-weight: 800;
           font-size: 1.1rem;
           margin-bottom: 10px;
           text-transform: uppercase;
        }

        .feat-desc {
           font-size: 0.9rem;
           line-height: 1.5;
           font-weight: 500;
        }

        /* --- CLOSING --- */
        .closing-box {
           text-align: center;
           max-width: 700px;
           margin: 0 auto;
           background: var(--black);
           color: var(--white);
           padding: 30px;
           border: var(--border);
           box-shadow: var(--shadow);
           font-size: 1.1rem;
           font-weight: 500;
           line-height: 1.6;
        }

        @media (max-width: 768px) {
           .about-title { font-size: 2.5rem; }
           .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export default About;