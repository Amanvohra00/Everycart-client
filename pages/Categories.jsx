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
               <div className="title-icon">
                 <LayoutGrid size={32} strokeWidth={2.5} />
               </div>
               <h1 className="page-title">Browse Categories</h1>
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
                  <span className="cat-decor">Collection</span>
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        :root {
          --color-yellow: #FFB300;
          --color-dark: #222222;
          --color-border: #eaeaea;
          --color-muted: #888888;
          --color-bg-page: #f8f9fa;
          --font-main: 'Poppins', sans-serif;
        }

        /* --- BACKGROUND DESIGN --- */
        .pop-page-background {
          background-color: var(--color-bg-page);
          min-height: 90vh;
          padding: 60px 0;
          font-family: var(--font-main);
        }

        .pop-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* HEADER */
        .page-header {
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .title-box {
           display: flex;
           align-items: center;
           gap: 15px;
           margin-bottom: 12px;
        }

        .title-icon {
           background: var(--color-yellow);
           color: var(--color-dark);
           width: 60px;
           height: 60px;
           border-radius: 16px;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .page-title {
          font-size: 2.2rem;
          font-weight: 600;
          margin: 0;
          color: var(--color-dark);
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          font-size: 1.05rem;
          color: var(--color-muted);
          font-weight: 400;
          margin: 0;
        }

        /* GRID SYSTEM */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }

        /* ANIMATIONS */
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* CATEGORY CARD */
        .cat-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 30px 25px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          opacity: 0; 
          animation: slideUp 0.5s ease forwards;
        }

        .cat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.04);
          border-color: var(--color-yellow);
        }

        .card-content {
          display: flex;
          flex-direction: column;
        }

        .cat-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-dark);
          margin-bottom: 4px;
          line-height: 1.2;
        }

        .cat-decor {
          font-size: 0.9rem;
          color: var(--color-muted);
          font-weight: 400;
        }

        .icon-box {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f8f9fa;
          color: var(--color-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        /* Hover Interaction */
        .cat-card:hover .icon-box {
          background: var(--color-yellow);
          color: var(--color-dark);
          transform: rotate(45deg);
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          .pop-container { padding: 0 20px; }
          .page-title { font-size: 1.8rem; }
          .title-icon { width: 50px; height: 50px; }
          .cat-card { padding: 25px 20px; }
          .cat-name { font-size: 1.2rem; }
          .pop-page-background { padding: 40px 0; }
        }
      `}</style>
    </Layout>
  );
};

export default Categories;