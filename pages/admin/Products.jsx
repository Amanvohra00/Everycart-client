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
                <div className="title-icon">
                  <Package size={28} strokeWidth={2.5} />
                </div>
                <h1>All Products</h1>
             </div>
             <p className="subtitle">Manage and update your inventory list.</p>
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
                             <span className="prod-price">${p.price}</span>
                             {/* Yellow button injected directly into the default state */}
                             <span className="prod-action">
                                Edit <ArrowRight size={14} />
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        :root {
          --color-yellow: #FFB300;
          --color-yellow-light: rgba(255, 179, 0, 0.08); /* Soft yellow for backgrounds */
          --color-dark: #222222;
          --color-border: #eaeaea;
          --color-muted: #888888;
          --color-bg-page: #f8f9fa;
          --font-main: 'Poppins', sans-serif;
        }

        .pop-page-background {
          background-color: var(--color-bg-page);
          min-height: 90vh;
          padding: 40px 0;
          font-family: var(--font-main);
        }

        .pop-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* --- HEADER --- */
        .dashboard-header {
           margin-bottom: 40px;
           display: flex;
           flex-direction: column;
           align-items: flex-start;
        }

        .header-title-box {
           display: flex;
           align-items: center;
           gap: 15px;
           margin-bottom: 8px;
        }

        .title-icon {
           background: var(--color-yellow);
           color: var(--color-dark);
           width: 48px;
           height: 48px;
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .header-title-box h1 {
           font-size: 2rem;
           font-weight: 600;
           margin: 0;
           color: var(--color-dark);
           letter-spacing: -0.5px;
        }

        .subtitle {
           font-size: 1rem;
           color: var(--color-muted);
           margin: 0;
           font-weight: 400;
        }

        /* --- LAYOUT GRID --- */
        .dashboard-grid {
           display: grid;
           grid-template-columns: 280px 1fr;
           gap: 30px;
           align-items: start;
        }

        /* --- PRODUCT GRID --- */
        .admin-product-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
           gap: 25px;
        }

        /* --- PRODUCT CARD --- */
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .admin-prod-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 16px;
           text-decoration: none;
           color: var(--color-dark);
           display: flex;
           flex-direction: column;
           box-shadow: 0 4px 20px rgba(0,0,0,0.02);
           transition: all 0.3s ease;
           opacity: 0;
           animation: slideUp 0.5s ease forwards;
           overflow: hidden;
        }

        .admin-prod-card:hover {
           transform: translateY(-5px);
           box-shadow: 0 12px 30px rgba(0,0,0,0.06);
           border-color: var(--color-yellow);
        }

        .prod-img-box {
           height: 200px;
           background: var(--color-yellow-light); /* Soft yellow tint applied to image background permanently */
           border-bottom: 1px solid var(--color-border);
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 20px;
           overflow: hidden;
        }

        .prod-img {
           max-width: 100%;
           max-height: 100%;
           object-fit: contain;
           transition: transform 0.3s ease;
           mix-blend-mode: multiply; /* Blends image naturally with the yellow tint */
        }
        
        .admin-prod-card:hover .prod-img {
           transform: scale(1.08);
        }

        .prod-details {
           padding: 20px;
           flex: 1;
           display: flex;
           flex-direction: column;
        }

        .prod-name {
           font-weight: 600;
           font-size: 1.1rem;
           margin-bottom: 6px;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
           color: var(--color-dark);
        }

        .prod-desc {
           font-size: 0.85rem;
           color: var(--color-muted);
           margin-bottom: 15px;
           font-weight: 400;
           line-height: 1.4;
        }

        .prod-meta {
           margin-top: auto;
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .prod-price {
           font-weight: 600;
           font-size: 1.1rem;
           color: var(--color-dark);
        }

        /* Yellow theme color applied to the button natively */
        .prod-action {
           background: var(--color-yellow);
           color: var(--color-dark);
           font-size: 0.85rem;
           font-weight: 500;
           display: flex;
           align-items: center;
           gap: 6px;
           padding: 6px 14px;
           border-radius: 20px;
           transition: all 0.2s ease;
        }
        
        .admin-prod-card:hover .prod-action {
           background: var(--color-dark);
           color: #ffffff;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
           .admin-product-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
           .pop-container { padding: 0 20px; }
        }
      `}</style>
    </Layout>
  );
};

export default Products;