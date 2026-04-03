import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Price } from "../components/Price";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/Cart";
import toast from "react-hot-toast";
import { useAuth } from "../components/context/auth";

/* --- ICONS --- */
const IconHeart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
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
    setSubChecked([]);
    setActiveCategory(categoryId);
    getSubCategories(categoryId);
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
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          :root {
            --bg-outer: #ffffff; /* Changed to pure white for a clean look */
            --bg-inner: #ffffff;
            --color-dark: #222222;
            --color-green: #0f4c3a; /* Dark green accent */
            
            /* --- HERO THEME COLORS --- */
            --hero-bg: #FFB300; /* Exact yellow from your delivery image */
            --hero-text: #000000; /* Dark text for high contrast against the yellow */

            --color-text-muted: #888888;
            --color-border: #eaeaea;
            --font-main: 'Poppins', sans-serif;
          }

          body {
            background-color: var(--bg-outer);
            font-family: var(--font-main);
            margin: 0;
          }

          .app-wrapper {
            background-color: var(--bg-inner);
            max-width: 1300px;
            margin: 0 auto;
            /* Removed border-radius and box-shadow so it doesn't look like a floating card */
            padding: 30px 40px;
            min-height: 100vh;
          }

          /* --- HERO SECTION --- */
          .hero-banner {
            background-color: var(--hero-bg);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 50px 80px;
            margin-bottom: 40px;
          }

          .hero-content h1 {
            color: var(--hero-text);
            font-size: 3rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 30px;
            margin-top: 0;
          }

          .btn-buy-now {
            background-color: var(--hero-text);
            color: white;
            border: none;
            padding: 14px 35px;
            border-radius: 30px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: opacity 0.2s;
            font-family: var(--font-main);
          }
          .btn-buy-now:hover {
            opacity: 0.9;
          }

          /* --- HERO IMAGE (Medium Size) --- */
          .hero-image-container {
            width: 280px; 
            height: 280px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .hero-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            /* Removed mix-blend-mode so the image doesn't bend/blend weirdly */
          }

          /* --- FILTERS (Horizontal layout matching pills) --- */
          .filters-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
          }

          .filter-pill-container {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .filter-label {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--color-dark);
          }

          /* Styling Ant Design Checkbox/Radio to look like pills */
          .ant-checkbox-wrapper, .ant-radio-wrapper {
            background: #f5f5f5;
            border: 1px solid var(--color-border);
            border-radius: 20px;
            padding: 6px 16px;
            font-size: 0.85rem;
            color: var(--color-dark);
            margin: 0 !important;
            transition: all 0.2s;
            font-family: var(--font-main);
          }
          .ant-checkbox-wrapper:hover, .ant-radio-wrapper:hover {
            background: #ebebeb;
          }
          .ant-checkbox-checked .ant-checkbox-inner, 
          .ant-radio-checked .ant-radio-inner {
            background-color: var(--color-dark) !important;
            border-color: var(--color-dark) !important;
          }

          .btn-reset {
            background: #fff;
            border: 1px solid var(--color-border);
            border-radius: 20px;
            padding: 6px 16px;
            font-size: 0.85rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            color: var(--color-dark);
            transition: 0.2s;
            font-family: var(--font-main);
          }
          .btn-reset:hover {
            background: #f5f5f5;
          }

          /* --- PRODUCTS GRID --- */
          .section-title {
            font-size: 1.6rem;
            font-weight: 600;
            color: var(--color-dark);
            margin-bottom: 25px;
            margin-top: 0;
          }

          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 30px;
          }

          .product-card {
            background: #fff;
            border-radius: 12px;
            transition: transform 0.2s;
            display: flex;
            flex-direction: column;
            border: 1px solid var(--color-border); /* Added a subtle border since the background is white now */
          }
          .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.05); /* Soft shadow on hover */
          }

          .product-img-wrap {
            background: #f8f8f8;
            border-radius: 12px 12px 0 0;
            padding: 25px;
            height: 220px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-bottom: 15px;
          }

          .heart-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #fff;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }

          .product-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          .product-info {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 0 15px 15px 15px;
          }

          .product-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 4px;
          }

          .product-name {
            font-weight: 600;
            font-size: 1rem;
            color: var(--color-dark);
            line-height: 1.3;
          }

          .product-price {
            font-weight: 600;
            font-size: 1rem;
            color: var(--color-dark);
          }

          .product-desc {
            font-size: 0.8rem;
            color: var(--color-text-muted);
            margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .product-rating {
            color: #FFB300; /* Changed stars to match the theme yellow */
            font-size: 14px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .rating-count {
            color: #aaa;
            font-size: 0.75rem;
          }

          .product-actions {
            margin-top: auto;
          }

          .btn-add-cart {
            background: transparent;
            border: 1px solid var(--color-border);
            color: var(--color-dark);
            border-radius: 20px;
            padding: 6px 18px;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-family: var(--font-main);
            width: 100%; /* Makes button look nice and uniform */
          }
          
          .btn-add-cart:hover:not(:disabled) {
            background: var(--color-dark);
            color: white;
            border-color: var(--color-dark);
          }

          .btn-add-cart:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: #f5f5f5;
          }

          .load-more-btn {
            display: block;
            margin: 50px auto 20px;
            background: #fff;
            border: 1px solid var(--color-border);
            padding: 12px 30px;
            border-radius: 30px;
            font-family: var(--font-main);
            font-weight: 500;
            cursor: pointer;
            transition: 0.2s;
          }
          .load-more-btn:hover {
            background: #f5f5f5;
          }

          @media (max-width: 768px) {
            .hero-banner {
              flex-direction: column;
              text-align: center;
              padding: 30px 20px;
            }
            .hero-image-container {
              margin-top: 30px;
              width: 100%;
              max-width: 250px;
            }
            .app-wrapper {
              padding: 15px;
            }
          }
        `}
      </style>

      <div className="app-wrapper">

        {/* HERO SECTION */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1>Shop Anythig with Us<br />Any Time, Any Place</h1>
            <button className="btn-buy-now" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
              Buy Now
            </button>
          </div>

          {/* HERO IMAGE */}
          <div className="hero-image-container">
            <img
              src="/hero.png"
              alt="Headphones Offer"
              className="hero-image"
            />
          </div>
        </div>

        {/* INLINE FILTERS BAR */}
        <div className="filters-bar">

          {categories.length > 0 && (
            <div className="filter-pill-container">
              <span className="filter-label">Categories:</span>
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
          )}

          {activeCategory && subCategories.length > 0 && (
            <div className="filter-pill-container">
              <span className="filter-label">Types:</span>
              {subCategories.map((s) => (
                <Checkbox
                  key={s._id}
                  checked={subChecked.includes(s._id)}
                  onChange={(e) => handleSubCategoryClick(e.target.checked, s._id)}
                >
                  {s.name}
                </Checkbox>
              ))}
            </div>
          )}

          <div className="filter-pill-container">
            <span className="filter-label">Price:</span>
            <Radio.Group onChange={(e) => setRadio(e.target.value)} style={{ display: 'flex', gap: '8px' }}>
              {Price.map((p) => (
                <Radio key={p._id} value={p.array}>{p.name}</Radio>
              ))}
            </Radio.Group>
          </div>

          {(checked.length > 0 || radio.length > 0 || subChecked.length > 0) && (
            <button className="btn-reset" onClick={() => window.location.reload()}>
              <IconRefresh /> Clear Filters
            </button>
          )}
        </div>

        {/* PRODUCTS SECTION */}
        <h2 className="section-title">Headphones For You!</h2>

        <div className="product-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">

              <div className="product-img-wrap">
                <div className="heart-icon">
                  <IconHeart />
                </div>
                <img
                  src={`${import.meta.env.VITE_API_UPLOAD}${p.photo}`}
                  alt={p.name}
                  className="product-img"
                  onClick={() => navigate(`/product/${p.slug}`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <div className="product-info">
                <div className="product-header">
                  <div className="product-name" title={p.name}>{p.name}</div>
                  <div className="product-price">${p.price}</div>
                </div>

                <div className="product-desc">
                  {p.description.substring(0, 40)}...
                </div>

                {/* Static rating placeholder to match your screenshot design */}
                <div className="product-rating">
                  ★★★★★ <span className="rating-count">(121)</span>
                </div>

                {p.quantity === 0 && (
                  <div style={{ color: "red", fontSize: "0.8rem", fontWeight: "600", marginBottom: "8px" }}>
                    OUT OF STOCK
                  </div>
                )}

                <div className="product-actions">
                  <button
                    className="btn-add-cart"
                    disabled={p.quantity === 0}
                    onClick={() => handleAddToCart(p._id)}
                  >
                    {p.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        {!isFiltering && products.length < total && (
          <button className="load-more-btn" onClick={() => setPage(page + 1)}>
            {loading ? "Loading..." : "Load More"}
          </button>
        )}

      </div>
    </Layout>
  );
};

export default Home;