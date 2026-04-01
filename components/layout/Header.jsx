import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import Searchinput from "../form/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../context/Cart";

/* --- 1. NEW LUCIDE ICONS --- */
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Home, 
  ShoppingCart, 
  User, 
  LogOut, 
  ChevronDown, 
  LayoutGrid,
  Search 
} from "lucide-react";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <header className="pop-header">
        <div className="header-container">
          
          {/* --- SECTION 1: NEW LOGO DESIGN --- */}
          <div className="header-left">
            <Link to="/" className="brand-logo">
              <div className="logo-icon-box">
                <ShoppingBag size={22} strokeWidth={2.5} />
              </div>
              <span className="logo-text">EveryCart.</span>
            </Link>
          </div>

          {/* --- SECTION 2: SEARCH --- */}
          <div className="header-center search-wrapper">
             <Searchinput />
          </div>

          {/* --- SECTION 3: NAVIGATION --- */}
          <div className="header-right">
            
            <nav className={`nav-menu ${isOpen ? "open" : ""}`}>
              
              <NavLink to="/" className="nav-item">
                 <Home size={18} strokeWidth={2.5} /> HOME
              </NavLink>

              <div className="nav-item dropdown-trigger">
                 <span>
                    <LayoutGrid size={18} strokeWidth={2.5} style={{display:'inline', marginBottom:'-2px'}}/> CATEGORIES <ChevronDown size={16} />
                 </span>
                 <div className="dropdown-menu-pop">
                    <Link to="/categories" className="dd-link">All Categories</Link>
                    {categories?.map((c) => (
                      <Link key={c._id} to={`/category/${c.slug}`} className="dd-link">{c.name}</Link>
                    ))}
                 </div>
              </div>

              {!auth?.user ? (
                <>
                  <NavLink to="/register" className="nav-btn black">REGISTER</NavLink>
                  <NavLink to="/login" className="nav-btn white">LOGIN</NavLink>
                </>
              ) : (
                <div className="nav-item dropdown-trigger">
                   <span className="user-capsule">
                      <User size={18} strokeWidth={2.5}/> {auth?.user?.name} <ChevronDown size={16} />
                   </span>
                   <div className="dropdown-menu-pop right-align">
                      <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dd-link">DASHBOARD</Link>
                      <div onClick={handleLogout} className="dd-link logout">
                         LOGOUT <LogOut size={16} />
                      </div>
                   </div>
                </div>
              )}

              <NavLink to="/cart" className="nav-btn purple">
                 <ShoppingCart size={18} strokeWidth={2.5} /> CART 
                 <span className="badge">{cart?.length}</span>
              </NavLink>

            </nav>

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap');

        :root {
          --border: 2.5px solid #000;
          --shadow: 4px 4px 0px #000;
          --font: 'Space Grotesk', sans-serif;
          --yellow: #ffdb4d;
          --purple: #a855f7;
        }

        /* --- LAYOUT GRID --- */
        .pop-header {
          position: sticky;
          top: 0;
          z-index: 999;
          background: #fff;
          border-bottom: var(--border);
          padding: 15px 0;
          font-family: var(--font);
        }

        .header-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* --- 1. NEW LOGO STYLES --- */
        .header-left { flex-shrink: 0; }
        
        .brand-logo {
          display: flex;
          align-items: stretch;
          text-decoration: none;
          box-shadow: 3px 3px 0px #000;
          transition: 0.2s;
        }
        .brand-logo:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0px #000;
        }

        .logo-icon-box {
          background: #000;
          color: var(--yellow);
          padding: 8px 12px;
          border: var(--border);
          border-right: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo-text {
          background: var(--yellow);
          color: #000;
          font-size: 1.5rem;
          font-weight: 800;
          padding: 8px 15px;
          border: var(--border);
          letter-spacing: -1px;
        }

        /* --- 2. SEARCH --- */
        .header-center {
          flex-grow: 1;
          max-width: 500px;
          margin: 0 20px;
        }
        
        /* Force Search Styles */
        .search-wrapper form {
          display: flex;
          height: 44px;
          width: 100%;
        }
        .search-wrapper input {
          flex-grow: 1;
          border: var(--border) !important;
          border-right: none !important;
          border-radius: 0 !important;
          padding: 0 15px;
          font-weight: 500;
          outline: none;
          font-family: var(--font);
        }
        .search-wrapper button {
          border: var(--border) !important;
          background: #000 !important;
          color: #fff !important;
          border-radius: 0 !important;
          padding: 0 20px;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* --- 3. NAVIGATION --- */
        .header-right { flex-shrink: 0; }
        .nav-menu { display: flex; align-items: center; gap: 15px; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: #000;
          text-decoration: none;
          cursor: pointer;
          font-size: 0.9rem;
          height: 44px;
          padding: 0 10px;
          transition: color 0.2s;
        }
        .nav-item:hover { color: var(--purple); }

        /* BUTTONS */
        .nav-btn {
          height: 44px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          font-weight: 700;
          text-decoration: none;
          border: var(--border);
          font-size: 0.9rem;
          transition: 0.2s;
          white-space: nowrap;
          gap: 8px;
        }
        .nav-btn:hover { transform: translate(-2px, -2px); box-shadow: 3px 3px 0px #000; }

        .black { background: #000; color: #fff; }
        .white { background: #fff; color: #000; }
        .purple { background: var(--purple); color: #fff; }

        .badge {
          background: var(--yellow);
          color: #000;
          font-size: 0.75rem;
          padding: 2px 6px;
          border: 1.5px solid #000;
          border-radius: 50%;
          min-width: 20px;
          text-align: center;
        }

        /* DROPDOWNS */
        .dropdown-trigger { position: relative; }
        .dropdown-menu-pop {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border: var(--border);
          min-width: 200px;
          flex-direction: column;
          box-shadow: 4px 4px 0px #000;
          z-index: 1000;
          margin-top: 5px;
        }
        .dropdown-trigger:hover .dropdown-menu-pop { display: flex; }
        .right-align { right: 0; left: auto; }

        .dd-link {
          padding: 12px 15px;
          color: #000;
          text-decoration: none;
          border-bottom: 2px solid #000;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .dd-link:hover { background: var(--yellow); }
        .dd-link:last-child { border-bottom: none; }
        .logout { display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: #ef4444; }

        /* MOBILE */
        .mobile-toggle { display: none; background: none; border: none; cursor: pointer; }

        @media (max-width: 992px) {
          .header-center { display: none; }
          .mobile-toggle { display: block; }
          .nav-menu {
            display: none;
            position: absolute;
            top: 100%; left: 0; width: 100%;
            background: #fff;
            flex-direction: column;
            padding: 20px;
            border-bottom: var(--border);
            gap: 15px;
            align-items: stretch;
          }
          .nav-menu.open { display: flex; }
          .nav-btn { justify-content: center; }
        }
      `}</style>
    </>
  );
};

export default Header;