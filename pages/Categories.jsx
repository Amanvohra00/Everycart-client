import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { ArrowUpRight, LayoutGrid } from "lucide-react";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      {/* WRAPPER FOR THE BACKGROUND DESIGN */}
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER SECTION */}
          <div className="page-header">
             <div className="title-box">
               <LayoutGrid size={32} strokeWidth={2.5} />
               <h1 className="page-title">BROWSE CATEGORIES</h1>
             </div>
             <p className="page-subtitle">Select a category to explore our exclusive collection.</p>
          </div>

          {/* CATEGORY GRID */}
          <div className="category-grid">
            {categories.map((c, index) => (
              <Link 
                to={`/category/${c.slug}`} 
                className="cat-card" 
                key={c._id}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="card-content">
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-decor">collection</span>
                </div>
                <div className="icon-box">
                  <ArrowUpRight size={24} strokeWidth={2.5} />
                </div>
              </Link>
            ))}
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
          --purple: #a855f7;
          --green: #4ade80;
          --border: 2.5px solid var(--black);
          --shadow: 5px 5px 0px var(--black);
          --shadow-hover: 8px 8px 0px var(--black);
          --font: 'Space Grotesk', sans-serif;
        }

        /* --- BACKGROUND DESIGN (Polka Dot Pattern) --- */
        .pop-page-background {
          /* Warm Off-White Base */
          background-color: var(--off-white);
          
          /* Polka Dot Pattern (Matches Home Page vibe) */
          background-image: radial-gradient(var(--black) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          
          min-height: 90vh;
          padding: 60px 0;
          border-top: var(--border);
        }

        .pop-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          font-family: var(--font);
        }

        /* HEADER */
        .page-header {
          margin-bottom: 60px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title-box {
           background: var(--yellow); /* Yellow highlight for title */
           border: var(--border);
           padding: 15px 30px;
           display: inline-flex;
           align-items: center;
           gap: 15px;
           box-shadow: var(--shadow);
           margin-bottom: 20px;
           transform: rotate(-1deg);
        }

        .page-title {
          font-size: 3rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin: 0;
          color: var(--black);
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: var(--black);
          font-weight: 600;
          background: var(--white);
          display: inline-block;
          padding: 8px 20px;
          border: var(--border);
        }

        /* GRID SYSTEM */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 35px;
        }

        /* ANIMATIONS */
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* CATEGORY CARD */
        .cat-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--white);
          border: var(--border);
          padding: 30px;
          text-decoration: none;
          color: var(--black);
          box-shadow: var(--shadow);
          transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          opacity: 0; 
          animation: slideUp 0.6s ease forwards;
        }

        .cat-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: var(--shadow-hover);
          background: var(--white); /* Keep white to pop against dots */
          border-color: var(--purple); /* Purple border on hover */
        }

        .cat-name {
          font-size: 1.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -1px;
          display: block;
          line-height: 1;
        }

        .cat-decor {
          font-size: 0.8rem;
          color: #666;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 5px;
          display: block;
        }

        .icon-box {
          border: 2px solid var(--black);
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--yellow);
          color: var(--black);
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 2px 2px 0px rgba(0,0,0,1);
        }

        /* Hover Interaction */
        .cat-card:hover .icon-box {
          background: var(--black);
          color: var(--white);
          transform: rotate(90deg);
          box-shadow: 4px 4px 0px var(--purple);
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          .page-title { font-size: 2rem; }
          .cat-card { padding: 20px; }
          .cat-name { font-size: 1.4rem; }
          .pop-page-background { background-size: 20px 20px; padding: 40px 0; }
        }
      `}</style>
    </Layout>
  );
};

export default Categories;