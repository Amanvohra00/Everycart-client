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
               <div className="title-icon">
                 <LayoutGrid size={28} strokeWidth={2.5} />
               </div>
               <h1 className="page-title">{category?.name || "Category"}</h1>
             </div>
             <p className="result-count">{products.length} Products Found</p>
          </div>

          {/* LOADING STATE */}
          {loading ? (
             <div className="state-card loading-state">Loading products...</div>
          ) : (
            <>
              {products.length === 0 ? (
                 <div className="state-card empty-state">No products found in this category.</div>
              ) : (
                 /* PRODUCT GRID */
                 <div className="card-grid">
                   {products?.map((p, index) => (
                     <div 
                        key={p._id} 
                        className="product-card"
                        style={{ animationDelay: `${index * 0.05}s` }}
                     >
                        <div className="product-img-wrap">
                           <img
                              src={p?.photo ? `${import.meta.env.VITE_API_UPLOAD}${p.photo}` : "/placeholder.png"}
                              className="product-img"
                              alt={p.name}
                              onClick={() => navigate(`/product/${p.slug}`)}
                           />
                        </div>

                        <div className="product-info">
                           <div className="product-header">
                              <div className="product-name" title={p.name}>{p.name}</div>
                              <div className="product-price">${p.price}</div>
                           </div>
                           <div className="product-desc">{p.description.substring(0, 40)}...</div>
                           
                           <div className="product-actions">
                              <button 
                                 className="btn-view"
                                 onClick={() => navigate(`/product/${p.slug}`)}
                                 title="View Details"
                              >
                                 <Eye size={18} strokeWidth={2.5}/>
                              </button>
                              <button 
                                 className="btn-add-cart"
                                 onClick={() => handleAddToCart(p._id)}
                              >
                                 <ShoppingCart size={16} strokeWidth={2.5}/> Add to Cart
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

        .result-count {
           font-weight: 500;
           color: var(--color-muted);
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 20px;
           padding: 6px 18px;
           font-size: 0.9rem;
           display: inline-block;
        }

        /* --- STATES --- */
        .state-card {
           text-align: center;
           font-size: 1.1rem;
           font-weight: 500;
           color: var(--color-muted);
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 12px;
           padding: 60px 40px;
        }

        /* --- GRID --- */
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
           cursor: pointer;
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

export default Categoryproducts;