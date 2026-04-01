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
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold' }}>LOADING...</h2>
            </div>
         </Layout>
      )
   }

   return (
      <Layout title={product?.name}>
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
                        <Tag size={16} /> {product?.category?.name}
                     </span>
                     <span
                        className="stock-tag"
                        style={{
                           background: product?.quantity === 0 ? "#ef4444" : "#4ade80",
                           color: "black",
                        }}
                     >
                        <Package size={16} />
                        {product?.quantity === 0 ? "OUT OF STOCK" : "IN STOCK"}
                     </span>
                  </div>

                  <div className="prod-price">{product?.price}</div>

                  <p className="prod-desc">{product?.description}</p>

                  <div className="action-area">
                     <button
                        className="btn-add-cart"
                        disabled={product?.quantity === 0}
                        onClick={handleAddToCart}
                        style={{
                           opacity: product?.quantity === 0 ? 0.6 : 1,
                           cursor: product?.quantity === 0 ? "not-allowed" : "pointer",
                           background: product?.quantity === 0 ? "#999" : "black",
                        }}
                     >
                        {product?.quantity === 0 ? (
                           "OUT OF STOCK"
                        ) : (
                           <>
                              ADD TO CART <ShoppingCart size={20} />
                           </>
                        )}
                     </button>
                  </div>

                  {/* Decorative Features Box */}
                  <div className="features-box">
                     <div className="feat-item"><Star size={14} fill="black" /> Authentic Quality</div>
                     <div className="feat-item"><Star size={14} fill="black" /> Secure Payment</div>
                     <div className="feat-item"><Star size={14} fill="black" /> Fast Shipping</div>
                  </div>
               </div>
            </div>

            {/* --- SIMILAR PRODUCTS --- */}
            <div className="related-section">
               <h3 className="section-title">YOU MIGHT ALSO LIKE</h3>

               {relatedProducts.length < 1 ? (
                  <p style={{ fontFamily: 'Space Grotesk', color: '#666' }}>No similar products found.</p>
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
                              <div className="related-price">{p.price}</div>
                              <button className="btn-view">VIEW <ArrowRight size={16} /></button>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>

         </div>

         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700;800&display=swap');

        :root {
           --black: #000000;
           --white: #ffffff;
           --yellow: #ffdb4d;
           --purple: #a855f7;
           --green: #4ade80;
           --border: 2.5px solid var(--black);
           --shadow-hard: 6px 6px 0px var(--black);
           --shadow-hover: 3px 3px 0px var(--black);
           --font: 'Space Grotesk', sans-serif;
        }

        .pop-container {
           max-width: 1200px;
           margin: 40px auto;
           padding: 0 20px;
           font-family: var(--font);
        }

        /* --- PRODUCT SHOWCASE (Grid Layout) --- */
        .product-showcase {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 50px;
           margin-bottom: 80px;
           align-items: start;
        }

        /* LEFT IMAGE */
        .main-img-box {
           background: var(--white);
           border: var(--border);
           box-shadow: var(--shadow-hard);
           height: 500px;
           display: flex;
           align-items: center;
           justify-content: center;
           position: relative;
           background-image: radial-gradient(#000 1px, transparent 1px);
           background-size: 20px 20px; /* Dot pattern background */
        }

        .main-img {
           max-width: 90%;
           max-height: 90%;
           object-fit: contain;
           mix-blend-mode: multiply; /* Blends nicely with the dots */
           z-index: 2;
        }

        .sticker-badge {
           position: absolute;
           top: -15px;
           left: -15px;
           background: var(--yellow);
           color: var(--black);
           border: var(--border);
           padding: 5px 15px;
           font-weight: 800;
           transform: rotate(-5deg);
           box-shadow: 3px 3px 0px var(--black);
           z-index: 3;
        }

        /* RIGHT DETAILS */
        .showcase-right {
           padding-top: 10px;
        }

        .breadcrumb {
           font-size: 0.85rem;
           color: #666;
           font-weight: 700;
           margin-bottom: 15px;
           letter-spacing: 1px;
        }

        .prod-title {
           font-size: 3rem;
           font-weight: 800;
           line-height: 1;
           margin-bottom: 20px;
           text-transform: uppercase;
           text-shadow: 2px 2px 0px #eee;
        }

        .prod-meta {
           display: flex;
           gap: 15px;
           margin-bottom: 25px;
        }

        .category-tag, .stock-tag {
           display: flex;
           align-items: center;
           gap: 6px;
           font-weight: 700;
           font-size: 0.9rem;
           border: 2px solid var(--black);
           padding: 4px 12px;
        }
        .category-tag { background: #eee; }
        .stock-tag { background: var(--green); }

        .prod-price {
           font-size: 2.5rem;
           font-weight: 800;
           color: var(--purple);
           margin-bottom: 25px;
           display: inline-block;
           border-bottom: 4px solid var(--yellow);
        }

        .prod-desc {
           font-size: 1.1rem;
           line-height: 1.6;
           color: #333;
           margin-bottom: 30px;
           border-left: 4px solid var(--black);
           padding-left: 20px;
        }

        .btn-add-cart {
           background: var(--black);
           color: var(--white);
           width: 100%;
           padding: 18px;
           font-size: 1.2rem;
           font-weight: 800;
           border: var(--border);
           cursor: pointer;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 12px;
           box-shadow: var(--shadow-hard);
           transition: 0.2s;
        }
        .btn-add-cart:hover {
           background: var(--purple);
           transform: translate(-4px, -4px);
           box-shadow: 8px 8px 0px var(--black);
        }
        .btn-add-cart:active {
           transform: translate(2px, 2px);
           box-shadow: 2px 2px 0px var(--black);
        }

        .features-box {
           margin-top: 30px;
           display: flex;
           justify-content: space-between;
           border-top: 2px dashed #ccc;
           padding-top: 20px;
        }
        .feat-item {
           font-size: 0.85rem;
           font-weight: 600;
           display: flex; align-items: center; gap: 5px;
        }

        /* --- RELATED PRODUCTS --- */
        .section-title {
           font-size: 1.8rem;
           font-weight: 800;
           border-bottom: var(--border);
           padding-bottom: 10px;
           margin-bottom: 30px;
           display: inline-block;
           background: var(--yellow);
           padding: 5px 15px;
           box-shadow: 4px 4px 0px var(--black);
        }

        .related-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
           gap: 30px;
        }

        .related-card {
           border: var(--border);
           background: var(--white);
           padding: 10px;
           cursor: pointer;
           transition: 0.2s;
           display: flex; 
           flex-direction: column;
        }
        .related-card:hover {
           transform: translate(-4px, -4px);
           box-shadow: var(--shadow-hard);
           border-color: var(--purple);
        }

        .related-img-box {
           height: 180px;
           background: #fff;
           border-bottom: var(--border);
           display: flex; 
           align-items: center; 
           justify-content: center;
           margin-bottom: 10px;
        }
        .related-img {
           max-width: 80%; max-height: 80%; object-fit: contain;
        }

        .related-name {
           font-weight: 700;
           font-size: 1rem;
           margin-bottom: 5px;
           white-space: nowrap; 
           overflow: hidden; 
           text-overflow: ellipsis;
        }

        .related-price {
           font-weight: 800;
           color: var(--black);
           margin-bottom: 10px;
           background: var(--yellow);
           display: inline-block;
           padding: 2px 5px;
        }

        .btn-view {
           width: 100%;
           background: transparent;
           border: 2px solid var(--black);
           padding: 8px;
           font-weight: 700;
           cursor: pointer;
           display: flex; align-items: center; justify-content: center; gap: 5px;
           font-size: 0.8rem;
        }
        .related-card:hover .btn-view {
           background: var(--black);
           color: var(--white);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
           .product-showcase { grid-template-columns: 1fr; gap: 30px; }
           .main-img-box { height: 350px; }
           .prod-title { font-size: 2.2rem; }
        }
      `}</style>
      </Layout>
   );
};

export default ProductDetails;