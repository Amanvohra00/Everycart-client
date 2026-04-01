import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER */}
          <div className="dashboard-header">
             <div className="header-title-box">
                <Package size={28} strokeWidth={2.5} />
                <h1>ALL PRODUCTS</h1>
             </div>
             <p>Manage and update your inventory list.</p>
          </div>

          <div className="dashboard-grid">
            
            {/* LEFT: SIDEBAR */}
            <div className="dashboard-sidebar">
              <AdminMenu />
            </div>

            {/* RIGHT: PRODUCTS GRID */}
            <div className="dashboard-content">
              
              <div className="admin-product-grid">
                 {products?.map((p, index) => (
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="admin-prod-card"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                       <div className="prod-img-box">
                          <img
                            src={`${import.meta.env.VITE_API_UPLOAD}${p.photo}`}
                            alt={p.name}
                            className="prod-img"
                          />
                       </div>

                       <div className="prod-details">
                          <h3 className="prod-name">{p.name}</h3>
                          <p className="prod-desc">{p.description.substring(0, 45)}...</p>
                          
                          <div className="prod-meta">
                             <span className="prod-price">₹ {p.price}</span>
                             <span className="prod-action">
                                EDIT <ArrowRight size={14} />
                             </span>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>

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

        .pop-page-background {
          background-color: var(--off-white);
          background-image: radial-gradient(var(--black) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          min-height: 90vh;
          padding: 40px 0;
          font-family: var(--font);
        }

        .pop-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* HEADER */
        .dashboard-header {
           margin-bottom: 40px;
           text-align: center;
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        .header-title-box {
           background: var(--white);
           border: var(--border);
           padding: 10px 25px;
           display: inline-flex;
           align-items: center;
           gap: 15px;
           box-shadow: 4px 4px 0px var(--black);
           transform: rotate(-1deg);
           margin-bottom: 10px;
        }

        .header-title-box h1 {
           font-size: 2rem;
           font-weight: 800;
           margin: 0;
           letter-spacing: -1px;
        }

        /* LAYOUT GRID */
        .dashboard-grid {
           display: grid;
           grid-template-columns: 280px 1fr;
           gap: 40px;
           align-items: start;
        }

        /* PRODUCT GRID */
        .admin-product-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
           gap: 25px;
        }

        /* PRODUCT CARD */
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .admin-prod-card {
           background: var(--white);
           border: var(--border);
           text-decoration: none;
           color: var(--black);
           display: flex;
           flex-direction: column;
           box-shadow: var(--shadow);
           transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
           position: relative;
           opacity: 0;
           animation: slideUp 0.5s ease forwards;
        }

        .admin-prod-card:hover {
           transform: translate(-4px, -4px);
           box-shadow: var(--shadow-hover);
           border-color: var(--purple);
        }

        .prod-img-box {
           height: 200px;
           border-bottom: var(--border);
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 10px;
           background: #fff;
           overflow: hidden;
        }

        .prod-img {
           max-width: 90%;
           max-height: 90%;
           object-fit: contain;
           transition: transform 0.3s;
        }
        
        .admin-prod-card:hover .prod-img {
           transform: scale(1.1);
        }

        .prod-details {
           padding: 15px;
           flex: 1;
           display: flex;
           flex-direction: column;
        }

        .prod-name {
           font-weight: 800;
           font-size: 1.1rem;
           margin-bottom: 5px;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
        }

        .prod-desc {
           font-size: 0.85rem;
           color: #555;
           margin-bottom: 15px;
           font-weight: 500;
        }

        .prod-meta {
           margin-top: auto;
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .prod-price {
           font-weight: 800;
           background: var(--yellow);
           padding: 2px 8px;
           border: 1px solid var(--black);
           box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
        }

        .prod-action {
           font-size: 0.75rem;
           font-weight: 700;
           display: flex;
           align-items: center;
           gap: 4px;
           border-bottom: 2px solid transparent;
        }
        
        .admin-prod-card:hover .prod-action {
           border-color: var(--black);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
           .admin-product-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
        }
      `}</style>
    </Layout>
  );
};

export default Products;