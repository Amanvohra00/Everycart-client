import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../components/context/Cart";
import { useAuth } from "../components/context/auth";
import axios from "axios";
import { ShoppingCart, Tag, ArrowRight, Package, Star } from "lucide-react";

const ProductDetails = () => {
   const params = useParams();
   const navigate = useNavigate();
   const [product, setProduct] = useState({});
   const [relatedProducts, setRelatedProducts] = useState([]);
   const [cart, setCart] = useCart();
   const [auth] = useAuth();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (params?.slug) getProduct();
      // Scroll to top when slug changes (for related product clicks)
      window.scrollTo(0, 0);
   }, [params?.slug]);

   const getProduct = async () => {
      try {
         setLoading(true);
         const { data } = await axios.get(
            `${import.meta.env.VITE_API}/product/single-product/${params.slug}`
         );
         setProduct(data?.product);
         getSimilarProduct(data?.product._id, data?.product?.subcategory?._id);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
         toast.error("Failed to fetch product");
      }
   };

   const getSimilarProduct = async (pid, cid) => {
      try {
         const { data } = await axios.get(
            `${import.meta.env.VITE_API}/product/related-product/${cid}/${pid}`
         );
         setRelatedProducts(data?.products || []);
      } catch (error) {
         console.log(error);
      }
   };

   const handleAddToCart = async () => {
      try {
         if (!auth?.token) {
            toast.error("Please login to add to cart");
            navigate("/login");
            return;
         }
         const { data } = await axios.post(
            `${import.meta.env.VITE_API}/cart/add`,
            { productId: product._id },
            { headers: { Authorization: auth.token } }
         );
         if (data?.success) {
            setCart(data.cart || []);
            toast.success("Product added to cart");
         }
         if (product?.quantity === 0) {
            toast.error("Product is out of stock");
            return;
         }
      } catch (error) {
         console.log(error);
         toast.error("Failed to add to cart");
      }
   };

   if (loading) {
      return (
         <Layout>
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
               <h2 style={{ fontFamily: 'Poppins', fontWeight: '500', color: '#888' }}>Loading Product...</h2>
            </div>
         </Layout>
      )
   }

   return (
      <Layout title={product?.name}>
         <div className="pop-page-background">
            <div className="pop-container">

               {/* --- MAIN PRODUCT SECTION --- */}
               <div className="product-showcase">

                  {/* LEFT: IMAGE */}
                  <div className="showcase-left">
                     <div className="main-img-box">
                        <div className="sticker-badge">NEW DROP</div>
                        <img
                           src={product?.photo ? `${import.meta.env.VITE_API_UPLOAD}${product.photo}` : "/placeholder.png"}
                           alt={product?.name}
                           className="main-img"
                        />
                     </div>
                  </div>

                  {/* RIGHT: DETAILS */}
                  <div className="showcase-right">
                     <div className="breadcrumb">
                        HOME / SHOP / {product?.category?.name?.toUpperCase()}
                     </div>

                     <h1 className="prod-title">{product?.name}</h1>

                     <div className="prod-meta">
                        <span className="category-tag">
                           <Tag size={14} /> {product?.category?.name}
                        </span>
                        <span
                           className="stock-tag"
                           style={{
                              background: product?.quantity === 0 ? "#fde8e8" : "#e8f5e9",
                              color: product?.quantity === 0 ? "#ef4444" : "#2e7d32",
                           }}
                        >
                           <Package size={14} />
                           {product?.quantity === 0 ? "OUT OF STOCK" : "IN STOCK"}
                        </span>
                     </div>

                     <div className="prod-price">${product?.price}</div>

                     <p className="prod-desc">{product?.description}</p>

                     <div className="action-area">
                        <button
                           className="btn-add-cart"
                           disabled={product?.quantity === 0}
                           onClick={handleAddToCart}
                           style={{
                              opacity: product?.quantity === 0 ? 0.5 : 1,
                              cursor: product?.quantity === 0 ? "not-allowed" : "pointer",
                           }}
                        >
                           {product?.quantity === 0 ? (
                              "OUT OF STOCK"
                           ) : (
                              <>
                                 <ShoppingCart size={18} strokeWidth={2.5} /> Add to Cart
                              </>
                           )}
                        </button>
                     </div>

                     {/* Decorative Features Box */}
                     <div className="features-box">
                        <div className="feat-item"><Star size={16} className="feat-icon" /> Authentic Quality</div>
                        <div className="feat-item"><Star size={16} className="feat-icon" /> Secure Payment</div>
                        <div className="feat-item"><Star size={16} className="feat-icon" /> Fast Shipping</div>
                     </div>
                  </div>
               </div>

               {/* --- SIMILAR PRODUCTS --- */}
               <div className="related-section">
                  <h3 className="section-title">You Might Also Like</h3>

                  {relatedProducts.length < 1 ? (
                     <p className="empty-related">No similar products found.</p>
                  ) : (
                     <div className="related-grid">
                        {relatedProducts?.map((p) => (
                           <div
                              key={p._id}
                              className="related-card"
                              onClick={() => navigate(`/product/${p.slug}`)}
                           >
                              <div className="related-img-box">
                                 <img
                                    src={p?.photo ? `${import.meta.env.VITE_API_UPLOAD}${p.photo}` : "/placeholder.png"}
                                    alt={p?.name}
                                    className="related-img"
                                 />
                              </div>
                              <div className="related-info">
                                 <h4 className="related-name">{p.name}</h4>
                                 <div className="related-price">${p.price}</div>
                                 <button className="btn-view">View Details <ArrowRight size={14} /></button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
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

        .pop-page-background {
           background-color: var(--color-bg-page);
           min-height: 90vh;
           padding: 50px 0;
           font-family: var(--font-main);
        }

        .pop-container {
           max-width: 1200px;
           margin: 0 auto;
           padding: 0 20px;
        }

        /* --- PRODUCT SHOWCASE (Main Card) --- */
        .product-showcase {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 50px;
           margin-bottom: 60px;
           align-items: start;
           background: #ffffff;
           border-radius: 20px;
           padding: 40px;
           border: 1px solid var(--color-border);
           box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        /* LEFT IMAGE */
        .main-img-box {
           background: #f8f9fa;
           border-radius: 16px;
           height: 500px;
           display: flex;
           align-items: center;
           justify-content: center;
           position: relative;
           padding: 30px;
        }

        .main-img {
           max-width: 100%;
           max-height: 100%;
           object-fit: contain;
           transition: transform 0.3s ease;
        }
        .main-img-box:hover .main-img {
           transform: scale(1.05);
        }

        .sticker-badge {
           position: absolute;
           top: 20px;
           left: 20px;
           background: var(--color-yellow);
           color: var(--color-dark);
           padding: 6px 14px;
           font-weight: 600;
           font-size: 0.8rem;
           border-radius: 20px;
           z-index: 3;
           letter-spacing: 0.5px;
        }

        /* RIGHT DETAILS */
        .showcase-right {
           padding-top: 10px;
           display: flex;
           flex-direction: column;
           height: 100%;
        }

        .breadcrumb {
           font-size: 0.85rem;
           color: var(--color-muted);
           font-weight: 500;
           margin-bottom: 15px;
           letter-spacing: 0.5px;
        }

        .prod-title {
           font-size: 2.2rem;
           font-weight: 600;
           line-height: 1.2;
           margin-bottom: 20px;
           color: var(--color-dark);
           letter-spacing: -0.5px;
        }

        .prod-meta {
           display: flex;
           gap: 12px;
           margin-bottom: 25px;
           flex-wrap: wrap;
        }

        .category-tag, .stock-tag {
           display: flex;
           align-items: center;
           gap: 6px;
           font-weight: 500;
           font-size: 0.85rem;
           padding: 6px 14px;
           border-radius: 20px;
        }
        .category-tag { background: #f0f0f0; color: var(--color-dark); }
        .stock-tag { font-weight: 600; }

        .prod-price {
           font-size: 2rem;
           font-weight: 600;
           color: var(--color-dark);
           margin-bottom: 20px;
        }

        .prod-desc {
           font-size: 0.95rem;
           line-height: 1.6;
           color: var(--color-muted);
           margin-bottom: 35px;
        }

        .action-area {
           margin-top: auto;
        }

        .btn-add-cart {
           background: var(--color-dark);
           color: #ffffff;
           width: 100%;
           padding: 16px;
           font-size: 1rem;
           font-weight: 600;
           border: none;
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 10px;
           transition: all 0.2s ease;
           font-family: var(--font-main);
        }
        .btn-add-cart:hover:not(:disabled) {
           background: var(--color-yellow);
           color: var(--color-dark);
           transform: translateY(-2px);
           box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }

        .features-box {
           margin-top: 35px;
           display: flex;
           justify-content: space-between;
           border-top: 1px solid var(--color-border);
           padding-top: 25px;
        }
        .feat-item {
           font-size: 0.85rem;
           font-weight: 500;
           color: var(--color-muted);
           display: flex; 
           align-items: center; 
           gap: 6px;
        }
        .feat-icon {
           color: var(--color-yellow);
           fill: var(--color-yellow);
        }

        /* --- RELATED PRODUCTS --- */
        .section-title {
           font-size: 1.6rem;
           font-weight: 600;
           color: var(--color-dark);
           margin-bottom: 30px;
        }

        .empty-related {
           color: var(--color-muted);
           font-size: 0.95rem;
        }

        .related-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
           gap: 25px;
        }

        .related-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 12px;
           padding: 20px;
           cursor: pointer;
           transition: all 0.2s ease;
           display: flex; 
           flex-direction: column;
        }
        .related-card:hover {
           transform: translateY(-4px);
           box-shadow: 0 10px 25px rgba(0,0,0,0.04);
           border-color: var(--color-yellow);
        }

        .related-img-box {
           height: 180px;
           background: #f8f9fa;
           border-radius: 8px;
           display: flex; 
           align-items: center; 
           justify-content: center;
           margin-bottom: 15px;
           padding: 15px;
        }
        .related-img {
           max-width: 100%; 
           max-height: 100%; 
           object-fit: contain;
           transition: transform 0.3s ease;
        }
        .related-card:hover .related-img {
           transform: scale(1.05);
        }

        .related-name {
           font-weight: 600;
           font-size: 1rem;
           color: var(--color-dark);
           margin-bottom: 6px;
           white-space: nowrap; 
           overflow: hidden; 
           text-overflow: ellipsis;
        }

        .related-price {
           font-weight: 600;
           color: var(--color-dark);
           margin-bottom: 15px;
           font-size: 1.05rem;
        }

        .btn-view {
           width: 100%;
           background: transparent;
           border: 1px solid var(--color-border);
           border-radius: 8px;
           padding: 10px;
           font-weight: 500;
           font-size: 0.9rem;
           cursor: pointer;
           display: flex; 
           align-items: center; 
           justify-content: center; 
           gap: 6px;
           color: var(--color-dark);
           transition: all 0.2s ease;
           font-family: var(--font-main);
        }
        .related-card:hover .btn-view {
           background: var(--color-dark);
           color: #ffffff;
           border-color: var(--color-dark);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
           .product-showcase { grid-template-columns: 1fr; gap: 30px; padding: 25px; }
           .main-img-box { height: 350px; }
           .prod-title { font-size: 1.8rem; }
           .features-box { flex-direction: column; gap: 10px; }
        }
      `}</style>
      </Layout>
   );
};

export default ProductDetails;