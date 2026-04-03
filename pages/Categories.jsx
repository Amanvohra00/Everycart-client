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
                  <span className="cat-decor">Explore Collection</span>
                  <div className="cat-btn">
                    Shop Now <ArrowUpRight size={16} strokeWidth={2.5} />
                  </div>
                </div>
                
                {/* Dynamically cycle through 3 different images based on the map index */}
                <div className="cat-image-container">
                  <img 
                    src={['/electronics.png', '/watches.png', '/mensw.png'][index % 3]} 
                    alt={c.name} 
                    className="cat-img" 
                  />
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

        /* GRID SYSTEM (3 Cards per row) */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        /* ANIMATIONS */
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* CATEGORY CARD */
        .cat-card {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 35px 25px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0; 
          animation: slideUp 0.5s ease forwards;
          
          /* Beautiful Overlapping Curves SVG (Subtle Yellow Tint) */
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,150 C200,300 400,0 800,150 L800,400 L0,400 Z' fill='rgba(255, 179, 0, 0.05)'/%3E%3Cpath d='M0,220 C250,350 500,100 800,220 L800,400 L0,400 Z' fill='rgba(255, 179, 0, 0.08)'/%3E%3Cpath d='M0,290 C300,400 600,150 800,290 L800,400 L0,400 Z' fill='rgba(255, 179, 0, 0.1)'/%3E%3C/svg%3E");
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
        }

        .cat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(255, 179, 0, 0.04);
          border-color: var(--color-yellow);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
          width: 60%;
        }

        .cat-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-dark);
          margin-bottom: 6px;
          line-height: 1.2;
        }

        .cat-decor {
          font-size: 0.9rem;
          color: var(--color-muted);
          font-weight: 400;
          margin-bottom: 20px;
        }

        .cat-btn {
          background-color: var(--color-dark);
          color: #ffffff;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          transition: all 0.2s ease;
        }

        .cat-card:hover .cat-btn {
          background-color: var(--color-yellow);
          color: var(--color-dark);
        }

        /* Image Container */
        .cat-image-container {
          position: absolute;
          right: -15px;
          bottom: -15px;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          z-index: 1;
        }

        .cat-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .cat-card:hover .cat-img {
          transform: scale(1.08) rotate(-3deg);
        }
        
        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: 1fr;
          }
          .pop-container { padding: 0 20px; }
          .page-title { font-size: 1.8rem; }
          .title-icon { width: 50px; height: 50px; }
          .cat-card { padding: 30px 20px; }
          .cat-name { font-size: 1.3rem; }
          .pop-page-background { padding: 40px 0; }
        }
      `}</style>
    </Layout>
  );
};

export default Categories;