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
               <SearchIcon size={28} strokeWidth={3} />
               <h1 className="page-title">SEARCH RESULTS</h1>
             </div>
             
             <div className="result-badge">
               {values?.results.length < 1 
                 ? "NO MATCHES FOUND" 
                 : `${values?.results.length} ITEMS FOUND`}
             </div>
          </div>

          {/* CONTENT SECTION */}
          {values?.results.length < 1 ? (
             <div className="empty-state">
                <Frown size={48} strokeWidth={2} style={{marginBottom: '15px'}}/>
                <p>We couldn't find any products matching your search.</p>
                <Link to="/" className="btn-back">GO BACK HOME</Link>
             </div>
          ) : (
             /* PRODUCT GRID */
             <div className="card-grid">
               {values?.results.map((p, index) => (
                 <div 
                    key={p._id} 
                    className="pop-card"
                    style={{ animationDelay: `${index * 0.05}s` }}
                 >
                    <div className="pop-img-box">
                       <img
                          src={`${import.meta.env.VITE_API_UPLOAD}${p.photo}`}
                          alt={p.name}
                          className="pop-img"
                       />
                    </div>

                    <div className="pop-info">
                       <div className="pop-name" title={p.name}>{p.name}</div>
                       <div className="pop-desc">{p.description.substring(0, 45)}...</div>
                       <div className="pop-price">{p.price}</div>
                       
                       <div className="pop-actions">
                          <Link 
                             to={`/product/${p.slug}`} 
                             className="btn-icon"
                             title="View Details"
                          >
                             <Eye size={20} strokeWidth={2.5}/>
                          </Link>
                          {/* Note: Add to Cart logic can be added here if needed, keeping visual style only for now */}
                          <button className="btn-buy">
                             <ShoppingCart size={18} strokeWidth={2.5}/> ADD
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
          --shadow-float: 10px 10px 0px var(--black);
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* --- HEADER --- */
        .page-header {
          margin-bottom: 50px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title-box {
           background: var(--yellow);
           border: var(--border);
           padding: 12px 30px;
           display: inline-flex;
           align-items: center;
           gap: 12px;
           box-shadow: var(--shadow);
           margin-bottom: 20px;
           transform: rotate(-1deg);
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin: 0;
          color: var(--black);
        }

        .result-badge {
           font-weight: 700;
           background: var(--white);
           border: var(--border);
           padding: 8px 20px;
           display: inline-block;
           text-transform: uppercase;
           box-shadow: 3px 3px 0px rgba(0,0,0,0.1);
        }

        /* --- EMPTY STATE --- */
        .empty-state {
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           background: var(--white);
           border: var(--border);
           padding: 60px;
           text-align: center;
           box-shadow: var(--shadow);
           max-width: 500px;
           margin: 0 auto;
        }
        .empty-state p {
           font-size: 1.2rem;
           font-weight: 500;
           margin-bottom: 20px;
        }
        .btn-back {
           background: var(--black);
           color: var(--white);
           text-decoration: none;
           padding: 12px 25px;
           font-weight: 700;
           border: 2px solid var(--black);
           transition: 0.2s;
        }
        .btn-back:hover {
           background: var(--white);
           color: var(--black);
           box-shadow: 4px 4px 0px var(--black);
           transform: translate(-2px, -2px);
        }

        /* --- GRID SYSTEM --- */
        .card-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
           gap: 30px;
        }

        /* --- PRODUCT CARD --- */
        @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .pop-card {
           background: var(--white);
           border: var(--border);
           padding: 15px;
           position: relative;
           transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
           display: flex;
           flex-direction: column;
           opacity: 0;
           animation: slideUp 0.6s ease forwards;
        }
        .pop-card:hover {
           box-shadow: var(--shadow-float);
           transform: translate(-5px, -8px);
           z-index: 10;
           border-color: var(--purple);
        }

        .pop-img-box {
           height: 200px;
           border-bottom: var(--border);
           margin: -15px -15px 15px -15px;
           background: var(--white);
           display: flex;
           align-items: center;
           justify-content: center;
           overflow: hidden;
        }
        .pop-img {
           max-width: 80%; max-height: 80%; object-fit: contain;
           mix-blend-mode: multiply;
           transition: transform 0.3s;
        }
        .pop-card:hover .pop-img { transform: scale(1.15) rotate(3deg); }

        .pop-info { flex: 1; display: flex; flex-direction: column; }
        
        .pop-name { 
           font-weight: 800; 
           font-size: 1.1rem; 
           margin-bottom: 5px; 
           white-space: nowrap; 
           overflow: hidden; 
           text-overflow: ellipsis; 
        }
        .pop-desc { font-size: 0.85rem; color: #555; margin-bottom: 15px; height: 38px; overflow: hidden; font-weight: 500;}
        
        .pop-price { 
           font-size: 1.2rem; 
           font-weight: 800; 
           background: var(--yellow); 
           display: inline-block; 
           padding: 4px 10px;
           border: 2px solid var(--black);
           margin-bottom: 15px;
           align-self: flex-start;
           box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
           transform: rotate(-2deg);
        }

        .pop-actions { display: flex; gap: 10px; margin-top: auto; }
        
        .btn-icon {
           flex: 1;
           border: 2px solid var(--black);
           background: var(--white);
           height: 44px;
           display: flex; align-items: center; justify-content: center;
           cursor: pointer;
           transition: 0.2s;
           box-shadow: 2px 2px 0px var(--black);
           color: var(--black);
        }
        .btn-icon:hover { 
           background: var(--green); 
           transform: translate(-2px, -2px);
           box-shadow: 4px 4px 0px var(--black);
        }

        .btn-buy {
           flex: 2;
           background: var(--black);
           color: var(--white);
           border: 2px solid var(--black);
           height: 44px;
           display: flex; align-items: center; justify-content: center; gap: 8px;
           cursor: pointer;
           font-weight: 700;
           transition: 0.2s;
           box-shadow: 2px 2px 0px rgba(255,255,255,0.3);
        }
        .btn-buy:hover { 
           background: var(--purple); 
           border-color: var(--black); 
           transform: translate(-2px, -2px);
           box-shadow: 4px 4px 0px var(--black);
        }

        @media (max-width: 768px) {
           .page-title { font-size: 1.8rem; }
           .pop-page-background { padding: 40px 0; background-size: 20px 20px; }
           .card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export default Search;