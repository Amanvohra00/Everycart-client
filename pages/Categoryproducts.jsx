import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../components/context/Cart";
import { useAuth } from "../components/context/auth";
import axios from "axios";
import { ShoppingCart, Eye, LayoutGrid } from "lucide-react";

const Categoryproducts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.categories || {});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to fetch products");
    }
  };

  // Handle Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      if (!auth?.token) {
        toast.error("Please login to add items to cart");
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/cart/add`,
        { productId },
        { headers: { Authorization: auth.token } }
      );
      if (data?.success) {
        toast.success("Product added to cart");
        setCart(data.cart || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <Layout title={category?.name ? `Category - ${category.name}` : "Category Products"}>
      {/* BACKGROUND WRAPPER */}
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER SECTION */}
          <div className="page-header">
             <div className="title-box">
               <LayoutGrid size={28} strokeWidth={2.5} />
               <h1 className="page-title">{category?.name || "CATEGORY"}</h1>
             </div>
             <p className="result-count">{products.length} Products Found</p>
          </div>

          {/* LOADING STATE */}
          {loading ? (
             <div className="loading-state">LOADING...</div>
          ) : (
            <>
              {products.length === 0 ? (
                 <div className="empty-state">No products found in this category.</div>
              ) : (
                 /* PRODUCT GRID */
                 <div className="card-grid">
                   {products?.map((p, index) => (
                     <div 
                        key={p._id} 
                        className="pop-card"
                        style={{ animationDelay: `${index * 0.05}s` }}
                     >
                        <div className="pop-img-box">
                           <img
                              src={p?.photo ? `${import.meta.env.VITE_API_UPLOAD}${p.photo}` : "/placeholder.png"}
                              className="pop-img"
                              alt={p.name}
                           />
                        </div>

                        <div className="pop-info">
                           <div className="pop-name" title={p.name}>{p.name}</div>
                           <div className="pop-desc">{p.description.substring(0, 40)}...</div>
                           <div className="pop-price">{p.price}</div>
                           
                           <div className="pop-actions">
                              <button 
                                 className="btn-icon"
                                 onClick={() => navigate(`/product/${p.slug}`)}
                                 title="View Details"
                              >
                                 <Eye size={20} strokeWidth={2.5}/>
                              </button>
                              <button 
                                 className="btn-buy"
                                 onClick={() => handleAddToCart(p._id)}
                              >
                                 <ShoppingCart size={18} strokeWidth={2.5}/> ADD
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
              )}
            </>
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
           padding: 10px 25px;
           display: inline-flex;
           align-items: center;
           gap: 12px;
           box-shadow: var(--shadow);
           margin-bottom: 15px;
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

        .result-count {
           font-weight: 700;
           background: var(--white);
           border: var(--border);
           padding: 5px 15px;
           display: inline-block;
        }

        /* --- STATES --- */
        .loading-state, .empty-state {
           text-align: center;
           font-size: 1.5rem;
           font-weight: 700;
           background: var(--white);
           border: var(--border);
           padding: 40px;
           box-shadow: var(--shadow);
        }

        /* --- GRID --- */
        .card-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
           gap: 30px;
        }

        /* --- PRODUCT CARD (Reused from Home) --- */
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
           .pop-page-background { padding: 40px 0; background-size: 20px 20px; }
           .page-title { font-size: 1.8rem; }
           .card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export default Categoryproducts;