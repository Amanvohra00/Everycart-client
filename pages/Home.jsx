import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Price } from "../components/Price";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/Cart";
import toast from "react-hot-toast";
import { useAuth } from "../components/context/auth";

/* --- ICONS (UNCHANGED) --- */
const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
);
const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const IconArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
const IconFilter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);
const IconTag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);
const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const IconRefresh = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [subChecked, setSubChecked] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const isFiltering = checked.length > 0 || radio.length > 0;
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  // --- LOGIC (UNCHANGED) ---
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
        { headers: { Authorization: auth?.token } }
      );
      if (data.success) toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getAllproducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/category/get-category`);
    if (data.success) setCategories(data.categories);
  };

  const getTotal = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/product/product-count`);
    setTotal(data.total);
  };

  useEffect(() => {
    (async () => {
      await getAllCategory();
      await getTotal();
      await getAllproducts();
    })();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    setLoading(true);
    const { data } = await axios.get(`${import.meta.env.VITE_API}/product/product-list/${page}`);
    setLoading(false);
    setProducts([...products, ...data.products]);
  };
  //getsubcat
  const getSubCategories = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/subc/get-subcategory/${categoryId}`
      );
      if (data?.success) {
        setSubCategories(data.subCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (checkedValue, categoryId) => {
    setChecked(checkedValue ? [categoryId] : []);
    setSubChecked([]);                 // reset subcategory
    setActiveCategory(categoryId);     // track parent
    getSubCategories(categoryId);      // load subs
  };

  const handleSubCategoryClick = (checkedValue, subId) => {
    setSubChecked(checkedValue ? [subId] : []);
  };

  const filterProduct = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API}/product/product-filters`,
      {
        radio,
        checked,
        subChecked,
      }
    );
    setProducts(data.products);
  };
  useEffect(() => {
    if (checked.length || subChecked.length || radio.length) {
      filterProduct();
    }
  }, [checked, subChecked, radio]);
  return (
    <Layout title={"Best Offers"}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

          :root {
            /* POP / NEO-BRUTALIST PALETTE */
            --bg-body: #fdfbf7;      
            --black: #000000;
            --white: #ffffff;
            --accent-yellow: #ffdb4d; 
            --accent-purple: #a855f7; 
            --accent-green: #4ade80; 
            --accent-red: #ef4444;
            
            --border-thick: 2.5px solid var(--black);
            --shadow-hard: 6px 6px 0px var(--black);
            --shadow-hover: 3px 3px 0px var(--black);
            --shadow-float: 10px 10px 0px var(--black);
            
            --font-main: 'Space Grotesk', sans-serif;
          }

          body {
            background-color: var(--accent-yellow); 
            background-image: radial-gradient(#000 1.5px, transparent 1.5px);
            background-size: 24px 24px;
            font-family: var(--font-main);
            color: var(--black);
            overflow-x: hidden;
          }

          h1, h2, h3, h4 { text-transform: uppercase; letter-spacing: -0.5px; margin: 0; }

          /* --- ANIMATIONS --- */
          @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            80% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); }
          }
          
          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes wiggle {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
            75% { transform: rotate(-1deg); }
            100% { transform: rotate(0deg); }
          }

          /* --- CONTAINER --- */
          .pop-container {
            max-width: 1400px;
            margin: 40px auto;
            padding: 0 20px;
          }

          /* --- HERO --- */
          .hero-pop {
            background: var(--white);
            border: var(--border-thick);
            box-shadow: var(--shadow-hard);
            padding: 60px;
            margin-bottom: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
          }
          
          .hero-left { z-index: 2; }
          .hero-left h1 { font-size: 4rem; font-weight: 800; line-height: 0.9; margin-bottom: 20px; text-shadow: 2px 2px 0px #fff; }
          .hero-left p { font-size: 1.2rem; font-weight: 500; margin-bottom: 30px; max-width: 500px; background: var(--white); display: inline-block; padding: 5px; }
          
          .btn-pop {
            background: var(--accent-purple);
            color: var(--white);
            border: var(--border-thick);
            padding: 16px 45px;
            font-size: 1.2rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: var(--shadow-hard);
            transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: inline-flex;
            align-items: center;
            gap: 12px;
            text-transform: uppercase;
          }
          .btn-pop:hover { 
            transform: translate(-4px, -4px); 
            box-shadow: 10px 10px 0px var(--black); 
            background: #9333ea;
          }
          .btn-pop:active { 
             transform: translate(2px, 2px); 
             box-shadow: 2px 2px 0px var(--black); 
          }

          /* Decorative Box */
          .hero-deco {
            width: 250px; height: 250px;
            background: var(--accent-green);
            border: var(--border-thick);
            display: flex; align-items: center; justify-content: center;
            font-size: 8rem; font-weight: 800;
            transform: rotate(5deg);
            animation: wiggle 3s infinite ease-in-out;
            box-shadow: var(--shadow-hard);
          }

          @media (max-width: 900px) {
            .hero-pop { flex-direction: column; text-align: center; padding: 30px; }
            .hero-left h1 { font-size: 2.8rem; }
            .hero-deco { margin-top: 30px; transform: rotate(0deg); width: 150px; height: 150px; font-size: 4rem; }
          }

          /* --- LAYOUT --- */
          .main-grid {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 40px;
            align-items: start;
          }
          @media (max-width: 1000px) { .main-grid { grid-template-columns: 1fr; } }

          /* --- SIDEBAR --- */
          .sidebar-box {
            background: var(--white);
            border: var(--border-thick);
            box-shadow: var(--shadow-hard);
            padding: 25px;
            position: sticky;
            top: 20px;
            transition: transform 0.3s;
          }
          .sidebar-box:hover { box-shadow: 8px 8px 0px var(--black); transform: translate(-2px, -2px); }

          .filter-title { 
            font-weight: 800; 
            margin-bottom: 20px; 
            font-size: 1.1rem; 
            border-bottom: 2px solid #000; 
            padding-bottom: 10px; 
            display: flex; 
            align-items: center; 
            gap: 10px;
            background: #eee;
            padding: 10px;
            border: 2px solid black;
          }

          .ant-checkbox-wrapper, .ant-radio-wrapper {
             font-family: var(--font-main);
             font-weight: 600;
             color: #000;
             margin-bottom: 12px;
             font-size: 1rem;
             padding: 5px;
             transition: 0.2s;
             border-radius: 4px;
          }
          .ant-checkbox-wrapper:hover, .ant-radio-wrapper:hover {
             background: var(--accent-yellow);
          }

          .reset-btn {
            width: 100%;
            background: var(--black);
            color: white;
            padding: 14px;
            border: 2px solid transparent;
            font-weight: 700;
            cursor: pointer;
            margin-top: 20px;
            font-family: var(--font-main);
            display: flex; align-items: center; justify-content: center; gap: 10px;
            transition: 0.2s;
          }
          .reset-btn:hover { 
            background: var(--white); 
            color: var(--black); 
            border: 2px solid var(--black);
            animation: wiggle 0.4s ease;
          }

          /* --- PRODUCTS GRID (UPDATED: MEDIUM SIZE) --- */
          .grid-title { 
            background: var(--black); 
            color: var(--white); 
            display: inline-block; 
            padding: 12px 25px; 
            font-size: 1.5rem; 
            font-weight: 700;
            margin-bottom: 30px;
            box-shadow: 6px 6px 0px rgba(255,255,255,0.8);
            transform: rotate(-1deg);
          }

          .card-grid {
            display: grid;
            /* CHANGED: 230px is tighter/medium compared to previous 280px */
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); 
            gap: 25px;
          }

          /* --- POP PRODUCT CARD --- */
          .pop-card {
            background: var(--white);
            border: var(--border-thick);
            padding: 15px;
            position: relative;
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            display: flex;
            flex-direction: column;
            animation: slideUp 0.6s ease forwards;
          }
          .pop-card:hover {
            box-shadow: var(--shadow-float);
            transform: translate(-5px, -8px);
            z-index: 10;
            border-color: var(--accent-purple);
          }

          /* UPDATED: Image Box (No transparency grid, Medium Height) */
          .pop-img-box {
            height: 200px; /* Reduced from 240px for medium look */
            border-bottom: var(--border-thick);
            margin: -15px -15px 15px -15px; 
            background: #ffffff; /* CLEAN BACKGROUND */
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
          }

          .pop-img {
             max-width: 80%;
             max-height: 80%;
             object-fit: contain;
             mix-blend-mode: multiply;
             transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
             z-index: 1;
          }
          .pop-card:hover .pop-img { transform: scale(1.15) rotate(3deg); }

          .pop-info { flex: 1; display: flex; flex-direction: column; }
          .pop-name { font-weight: 800; font-size: 1.1rem; margin-bottom: 5px; line-height: 1.2; }
          .pop-desc { font-size: 0.85rem; color: #555; margin-bottom: 15px; height: 38px; overflow: hidden; font-weight: 500;}
          
          .pop-price { 
            font-size: 1.2rem; 
            font-weight: 800; 
            background: var(--accent-yellow); 
            display: inline-block; 
            padding: 4px 10px;
            border: 2px solid black;
            margin-bottom: 15px;
            align-self: flex-start;
            box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
            transform: rotate(-2deg);
            transition: 0.2s;
          }
          .pop-card:hover .pop-price { transform: rotate(0deg) scale(1.1); }

          .pop-actions {
            display: flex;
            gap: 10px;
            margin-top: auto;
          }
          
          .btn-icon {
             flex: 1;
             border: 2px solid black;
             background: var(--white);
             height: 44px;
             display: flex;
             align-items: center;
             justify-content: center;
             cursor: pointer;
             font-weight: 700;
             transition: 0.2s;
             box-shadow: 2px 2px 0px var(--black);
          }
          .btn-icon:hover { 
             background: var(--accent-green); 
             transform: translate(-2px, -2px);
             box-shadow: 4px 4px 0px var(--black);
          }

          .btn-buy {
             flex: 2;
             background: var(--black);
             color: white;
             border: 2px solid black;
             height: 44px;
             display: flex;
             align-items: center;
             justify-content: center;
             gap: 8px;
             cursor: pointer;
             font-weight: 700;
             transition: 0.2s;
             box-shadow: 2px 2px 0px rgba(255,255,255,0.3);
          }
          .btn-buy:hover { 
             background: var(--accent-purple); 
             border-color: black; 
             transform: translate(-2px, -2px);
             box-shadow: 4px 4px 0px var(--black);
          }

          /* Load More */
          .load-more {
             display: block;
             margin: 60px auto 0;
             background: var(--white);
             border: var(--border-thick);
             padding: 18px 50px;
             font-weight: 800;
             font-size: 1.1rem;
             cursor: pointer;
             box-shadow: var(--shadow-hard);
             transition: 0.2s;
             text-transform: uppercase;
          }
          .load-more:hover { 
             transform: translate(-4px, -4px); 
             box-shadow: 10px 10px 0px var(--black); 
             background: var(--accent-green);
          }

        `}
      </style>

      <div className="pop-container">

        {/* HERO */}
        <div className="hero-pop">
          <div className="hero-left">
            <h1>FRESH DROPS<br />BIG SAVINGS</h1>
            <p>Don't be boring. Shop the latest collection with style.</p>
            <button className="btn-pop" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
              START SHOPPING <IconArrowRight />
            </button>
          </div>
          <div className="hero-deco">
            %
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="main-grid">

          {/* SIDEBAR */}
          <aside className="sidebar-box">
            <div className="filter-title">
              <IconGrid /> CATEGORY
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  checked={checked.includes(c._id)}
                  onChange={(e) => handleCategoryClick(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/* SUBCATEGORIES */}
            {activeCategory && subCategories.length > 0 && (
              <>
                <div className="filter-title">
                  <IconTag /> SUBCATEGORY
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {subCategories.map((s) => (
                    <Checkbox
                      key={s._id}
                      checked={subChecked.includes(s._id)}
                      onChange={(e) =>
                        handleSubCategoryClick(e.target.checked, s._id)
                      }
                    >
                      {s.name}
                    </Checkbox>
                  ))}
                </div>
              </>
            )}

            <div className="filter-title">
              <IconTag /> PRICE RANGE
            </div>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {Price.map((p) => (
                  <Radio key={p._id} value={p.array}>{p.name}</Radio>
                ))}
              </div>
            </Radio.Group>

            <button className="reset-btn" onClick={() => window.location.reload()}>
              <IconRefresh /> RESET FILTERS
            </button>
          </aside>

          {/* CONTENT */}
          <main>
            <h2 className="grid-title">ALL PRODUCTS ({total})</h2>

            <div className="card-grid">
              {products.map((p, index) => (
                <div
                  key={p._id}
                  className="pop-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHovered(p._id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Rating Removed as requested */}

                  <div className="pop-img-box">
                    <img
                      src={`${import.meta.env.VITE_API_UPLOAD}${p.photo}`}
                      alt={p.name}
                      className="pop-img"
                    />
                  </div>

                  <div className="pop-info">
                    <div className="pop-name" title={p.name}>{p.name}</div>
                    <div className="pop-desc">{p.description.substring(0, 50)}...</div>
                    <div className="pop-price">{p.price}</div>
                    {p.quantity === 0 && (
                      <div style={{ color: "red", fontWeight: "bold", marginBottom: "6px" }}>
                        OUT OF STOCK
                      </div>
                    )}
                    <div className="pop-actions">
                      <button
                        className="btn-icon"
                        onClick={() => navigate(`/product/${p.slug}`)}
                        title="View Details"
                      >
                        <IconEye />
                      </button>
                      <button
                        className="btn-buy"
                        disabled={p.quantity === 0}
                        onClick={() => handleAddToCart(p._id)}
                        style={{
                          opacity: p.quantity === 0 ? 0.5 : 1,
                          cursor: p.quantity === 0 ? "not-allowed" : "pointer",
                        }}
                      >
                        <IconBag />
                        {p.quantity === 0 ? " OUT OF STOCK" : " ADD TO CART"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!isFiltering && products.length < total && (
              <button className="load-more" onClick={() => setPage(page + 1)}>
                {loading ? "LOADING..." : "LOAD MORE STUFF"}
              </button>
            )}
          </main>

        </div>
      </div>
    </Layout>
  );
};

export default Home;