import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../components/context/Search";
import { Link } from "react-router-dom";
import { Search as SearchIcon, Frown, Eye, ShoppingCart } from "lucide-react";

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title={"Search Results"}>
      {/* BACKGROUND WRAPPER */}
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER SECTION */}
          <div className="page-header">
             <div className="title-box">
               <div className="title-icon">
                 <SearchIcon size={28} strokeWidth={2.5} />
               </div>
               <h1 className="page-title">Search Results</h1>
             </div>
             
             <div className="result-badge">
               {values?.results.length < 1 
                 ? "No matches found" 
                 : `${values?.results.length} items found`}
             </div>
          </div>

          {/* CONTENT SECTION */}
          {values?.results.length < 1 ? (
             <div className="empty-state">
                <Frown size={48} strokeWidth={2} style={{marginBottom: '15px', color: '#888'}}/>
                <p>We couldn't find any products matching your search.</p>
                <Link to="/" className="btn-back">Go Back Home</Link>
             </div>
          ) : (
             /* PRODUCT GRID */
             <div className="card-grid">
               {values?.results.map((p, index) => (
                 <div 
                    key={p._id} 
                    className="product-card"
                    style={{ animationDelay: `${index * 0.05}s` }}
                 >
                    <div className="product-img-wrap">
                       <img
                          src={`${import.meta.env.VITE_API_UPLOAD}${p.photo}`}
                          alt={p.name}
                          className="product-img"
                       />
                    </div>

                    <div className="product-info">
                       <div className="product-header">
                          <div className="product-name" title={p.name}>{p.name}</div>
                          <div className="product-price">${p.price}</div>
                       </div>
                       
                       <div className="product-desc">{p.description.substring(0, 45)}...</div>
                       
                       <div className="product-actions">
                          <Link 
                             to={`/product/${p.slug}`} 
                             className="btn-view"
                             title="View Details"
                          >
                             <Eye size={18} strokeWidth={2.5}/>
                          </Link>
                          {/* Note: Add to Cart logic can be added here if needed, keeping visual style only for now */}
                          <button className="btn-add-cart">
                             <ShoppingCart size={16} strokeWidth={2.5}/> Add to Cart
                          </button>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          )}

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

        /* --- BACKGROUND --- */
        .pop-page-background {
          background-color: var(--color-bg-page);
          min-height: 90vh;
          padding: 50px 0;
          font-family: var(--font-main);
        }

        .pop-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* --- HEADER --- */
        .page-header {
          margin-bottom: 40px;
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
           width: 54px;
           height: 54px;
           border-radius: 14px;
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

        .result-badge {
           font-weight: 500;
           color: var(--color-muted);
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 20px;
           padding: 6px 18px;
           font-size: 0.9rem;
           display: inline-block;
        }

        /* --- EMPTY STATE --- */
        .empty-state {
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 16px;
           padding: 60px 40px;
           text-align: center;
           box-shadow: 0 4px 20px rgba(0,0,0,0.02);
           max-width: 500px;
           margin: 0 auto;
        }
        .empty-state p {
           font-size: 1.05rem;
           font-weight: 400;
           color: var(--color-muted);
           margin-bottom: 25px;
        }
        .btn-back {
           background: var(--color-dark);
           color: #ffffff;
           text-decoration: none;
           padding: 12px 30px;
           border-radius: 30px;
           font-weight: 500;
           transition: all 0.2s ease;
           display: inline-block;
        }
        .btn-back:hover {
           background: var(--color-yellow);
           color: var(--color-dark);
           transform: translateY(-2px);
           box-shadow: 0 5px 15px rgba(255, 179, 0, 0.2);
        }

        /* --- GRID SYSTEM --- */
        .card-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
           gap: 30px;
        }

        /* --- PRODUCT CARD (Matches Home Page) --- */
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .product-card {
           background: #ffffff;
           border-radius: 12px;
           border: 1px solid var(--color-border);
           transition: transform 0.2s, box-shadow 0.2s;
           display: flex;
           flex-direction: column;
           opacity: 0;
           animation: slideUp 0.5s ease forwards;
        }
        .product-card:hover {
           transform: translateY(-4px);
           box-shadow: 0 10px 25px rgba(0,0,0,0.04);
           border-color: var(--color-yellow);
        }

        .product-img-wrap {
           background: #f8f8f8;
           border-radius: 12px 12px 0 0;
           padding: 25px;
           height: 220px;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        .product-img {
           max-width: 100%; 
           max-height: 100%; 
           object-fit: contain;
           transition: transform 0.3s;
        }
        .product-card:hover .product-img { transform: scale(1.05); }

        .product-info { 
           padding: 20px; 
           display: flex; 
           flex-direction: column; 
           flex: 1; 
        }
        
        .product-header {
           display: flex;
           justify-content: space-between;
           align-items: flex-start;
           margin-bottom: 6px;
        }

        .product-name { 
           font-weight: 600; 
           font-size: 1.05rem; 
           color: var(--color-dark);
           line-height: 1.3;
           white-space: nowrap; 
           overflow: hidden; 
           text-overflow: ellipsis; 
        }
        
        .product-price { 
           font-weight: 600; 
           font-size: 1.05rem;
           color: var(--color-dark);
        }

        .product-desc { 
           font-size: 0.85rem; 
           color: var(--color-muted); 
           margin-bottom: 15px; 
           height: 40px; 
           overflow: hidden; 
        }

        .product-actions { 
           display: flex; 
           gap: 10px; 
           margin-top: auto; 
        }
        
        .btn-view {
           border: 1px solid var(--color-border);
           background: #ffffff;
           color: var(--color-dark);
           border-radius: 8px;
           width: 44px;
           height: 44px;
           display: flex; 
           align-items: center; 
           justify-content: center;
           cursor: pointer;
           transition: all 0.2s;
           flex-shrink: 0;
           text-decoration: none;
        }
        .btn-view:hover { 
           background: #f5f5f5; 
           border-color: #dcdcdc;
        }

        .btn-add-cart {
           flex: 1;
           background: transparent;
           color: var(--color-dark);
           border: 1px solid var(--color-border);
           border-radius: 8px;
           height: 44px;
           display: flex; 
           align-items: center; 
           justify-content: center; 
           gap: 8px;
           cursor: pointer;
           font-weight: 500;
           font-size: 0.9rem;
           transition: all 0.2s;
           font-family: var(--font-main);
        }
        .btn-add-cart:hover { 
           background: var(--color-dark); 
           color: #ffffff; 
           border-color: var(--color-dark); 
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 768px) {
           .pop-container { padding: 0 20px; }
           .pop-page-background { padding: 30px 0; }
           .page-title { font-size: 1.8rem; }
           .title-icon { width: 45px; height: 45px; }
           .card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export default Search;