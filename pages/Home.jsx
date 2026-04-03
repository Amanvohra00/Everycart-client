import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Price } from "../components/Price";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/Cart";
import toast from "react-hot-toast";
import { useAuth } from "../components/context/auth";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* --- ICONS --- */
const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
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
  const [subCategories, setSubCategories] = useState([]);
  const [subChecked, setSubChecked] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const isFiltering = checked.length > 0 || radio.length > 0;
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  // --- SLIDER REFS ---
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

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
            --bg-outer: #ffffff; 
            --bg-inner: #ffffff;
            --color-dark: #222222;
            --color-green: #0f4c3a; 
            
            /* --- HERO THEME COLORS --- */
            --hero-bg: #FFB300; 
            --hero-text: #000000; 

            /* --- AD CARD THEME COLORS --- */
            --ad-bg: #FFB300; 
            --ad-text: #000000; 

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
            position: relative;
            overflow: hidden;
            /* Beautiful Overlapping Curves SVG */
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,150 C200,300 400,0 800,150 L800,400 L0,400 Z' fill='rgba(255,255,255,0.1)'/%3E%3Cpath d='M0,220 C250,350 500,100 800,220 L800,400 L0,400 Z' fill='rgba(255,255,255,0.15)'/%3E%3Cpath d='M0,290 C300,400 600,150 800,290 L800,400 L0,400 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E");
            background-size: cover;
            background-position: center bottom;
            background-repeat: no-repeat;
          }

          .hero-content {
            flex: 1;
            position: relative;
            z-index: 2; /* Ensures text is above background curves */
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

          .hero-image-container {
            width: 280px; 
            height: 280px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            position: relative;
            z-index: 2; /* Ensures image is above background curves */
          }

          .hero-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          /* --- ADVERTISEMENT SECTION --- */
          .ad-slider-wrapper {
            position: relative;
            margin-bottom: 50px;
            width: 100%;
            display: flex;
            align-items: center;
          }

          /* Desktop Grid Layout */
          .ad-slider-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            width: 100%;
            overflow-x: auto;
            scroll-behavior: smooth;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
            padding: 10px 0;
          }
          .ad-slider-container::-webkit-scrollbar {
            display: none; /* Chrome/Safari */
          }

          .slider-nav-btn {
            background: #ffffff;
            border: 1px solid var(--color-border);
            color: var(--color-dark);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: absolute;
            z-index: 10;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            transition: all 0.2s ease;
          }
          .slider-nav-btn:hover {
            background: var(--color-dark);
            color: #ffffff;
            border-color: var(--color-dark);
          }
          .nav-left { left: -15px; }
          .nav-right { right: -15px; }

          .ad-card {
            background-color: var(--ad-bg);
            border-radius: 16px;
            padding: 25px 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
            min-height: 160px;
            min-width: 300px;
            flex: 0 0 auto;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer;
            
            /* Beautiful Overlapping Curves SVG */
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,150 C200,300 400,0 800,150 L800,400 L0,400 Z' fill='rgba(255,255,255,0.1)'/%3E%3Cpath d='M0,220 C250,350 500,100 800,220 L800,400 L0,400 Z' fill='rgba(255,255,255,0.15)'/%3E%3Cpath d='M0,290 C300,400 600,150 800,290 L800,400 L0,400 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E");
            background-size: cover;
            background-position: center bottom;
            background-repeat: no-repeat;
          }

          .ad-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(255, 179, 0, 0.3);
          }

          .ad-content {
            position: relative;
            z-index: 2;
            width: 60%;
          }

          .ad-title {
            color: var(--ad-text);
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 5px;
            line-height: 1.2;
          }

          .ad-subtitle {
            color: rgba(0,0,0,0.7);
            font-size: 0.8rem;
            margin-bottom: 15px;
            font-weight: 500;
          }

          .ad-btn {
            background-color: var(--color-dark);
            color: #ffffff;
            border: none;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-family: var(--font-main);
            transition: opacity 0.2s;
          }
          .ad-btn:hover {
            opacity: 0.9;
          }

          .ad-image-container {
            position: absolute;
            right: -10px;
            bottom: -10px;
            width: 50%;
            height: 90%;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            z-index: 2; /* Increased z-index to stay above the curves */
          }

          .ad-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          /* --- FILTERS --- */
          .filters-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: flex-start;
            margin-bottom: 40px;
            padding-bottom: 20px;
          }

          .filter-pill-container {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .filter-label {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--color-dark);
          }

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
            border: 1px solid var(--color-border);
          }
          .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
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

          .view-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #fff;
            border-radius: 50%;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            transition: all 0.2s ease;
            z-index: 2;
          }
          .view-icon:hover {
            background: var(--color-dark);
          }
          .view-icon:hover svg {
            stroke: #fff;
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
            color: #FFB300;
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
            width: 100%;
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

          /* --- RESPONSIVE FIXES --- */
          @media (max-width: 992px) {
            .ad-slider-container {
              display: flex; /* Turn into slider sooner */
            }
          }

          @media (max-width: 768px) {
            .app-wrapper {
              padding: 15px;
            }
            
            /* Mobile Horizontal Hero */
            .hero-banner {
              flex-direction: row;
              align-items: center;
              padding: 20px;
              margin-bottom: 30px;
              text-align: left;
            }
            .hero-content h1 {
              font-size: 1.5rem;
              margin-bottom: 15px;
            }
            .btn-buy-now {
              padding: 10px 20px;
              font-size: 0.85rem;
            }
            .hero-image-container {
              width: 40%;
              height: auto;
              max-width: 160px;
            }

            /* Mobile Horizontal Swiping Ads */
            .slider-nav-btn {
              display: none; /* Hide custom nav on mobile, allow native scroll */
            }
            .ad-slider-container {
              display: flex; /* Override grid */
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              padding-bottom: 15px;
              gap: 15px;
            }
            .ad-card {
              min-width: 280px;
              scroll-snap-align: start;
            }

            /* Mobile Vertical Filters */
            .filters-bar {
              flex-direction: column;
              align-items: flex-start;
              gap: 20px;
            }
            .filter-pill-container {
              flex-direction: column;
              align-items: flex-start;
              width: 100%;
            }
          }
        `}
      </style>

      <div className="app-wrapper">

        {/* HERO SECTION */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1>Shop Anything with Us<br />Any Time, Any Place</h1>
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

        {/* --- ADVERTISEMENT CARDS (3 Cards Desktop Grid / Mobile Swipe) --- */}
        <div className="ad-slider-wrapper">
          
          {/* Left Scroll Button */}
          <button className="slider-nav-btn nav-left" onClick={scrollLeft}>
             <ChevronLeft size={24} />
          </button>

          <div className="ad-slider-container" ref={sliderRef}>
            
            {/* Ad Card 1 */}
            <div className="ad-card" onClick={() => navigate('/category/electronics')}>
              <div className="ad-content">
                <h3 className="ad-title">Get 30% OFF on Electronics!</h3>
                <p className="ad-subtitle">Limited time offer.</p>
                <button className="ad-btn">Shop Now</button>
              </div>
              <div className="ad-image-container">
                 {/* Replace src with your image */}
                 <img src="/electronics.png" alt="Ad 1" className="ad-img" />
              </div>
            </div>

            {/* Ad Card 2 */}
            <div className="ad-card" onClick={() => navigate('/category/watches')}>
              <div className="ad-content">
                <h3 className="ad-title">Exclusive Deals on Watches</h3>
                <p className="ad-subtitle">Upgrade your style.</p>
                <button className="ad-btn">Shop Now</button>
              </div>
              <div className="ad-image-container">
                 {/* Replace src with your image */}
                 <img src="/watches.png" alt="Ad 2" className="ad-img" />
              </div>
            </div>

            {/* Ad Card 3 */}
            <div className="ad-card" onClick={() => navigate('/category/menswear')}>
              <div className="ad-content">
                <h3 className="ad-title">New Arrivals in Menswear</h3>
                <p className="ad-subtitle">Fresh stock is here.</p>
                <button className="ad-btn">Shop Now</button>
              </div>
              <div className="ad-image-container">
                 {/* Replace src with your image */}
                 <img src="/mensw.png" alt="Ad 3" className="ad-img" />
              </div>
            </div>

          </div>

          {/* Right Scroll Button */}
          <button className="slider-nav-btn nav-right" onClick={scrollRight}>
             <ChevronRight size={24} />
          </button>
        </div>

        {/* RESPONSIVE FILTERS BAR */}
        <div className="filters-bar">

          {categories.length > 0 && (
            <div className="filter-pill-container">
              <span className="filter-label">Categories:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
            </div>
          )}

          {activeCategory && subCategories.length > 0 && (
            <div className="filter-pill-container">
              <span className="filter-label">Types:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
            </div>
          )}

          <div className="filter-pill-container">
            <span className="filter-label">Price:</span>
            <Radio.Group onChange={(e) => setRadio(e.target.value)} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
                <div className="view-icon" onClick={() => navigate(`/product/${p.slug}`)} title="View Details">
                  <IconEye />
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