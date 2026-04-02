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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        :root {
          --color-yellow: #FFB300;
          --color-dark: #222222;
          --color-border: #eaeaea;
          --font-main: 'Poppins', sans-serif;
        }

        /* --- LAYOUT GRID --- */
        .pop-header {
          position: sticky;
          top: 0;
          z-index: 999;
          background: #ffffff;
          border-bottom: 1px solid var(--color-border);
          padding: 15px 0;
          font-family: var(--font-main);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03); /* Soft modern shadow */
        }

        .header-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* --- 1. NEW LOGO STYLES --- */
        .header-left { flex-shrink: 0; }
        
        .brand-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform 0.2s;
          gap: 8px;
        }
        .brand-logo:hover {
          transform: translateY(-2px);
        }

        .logo-icon-box {
          background: var(--color-yellow);
          color: var(--color-dark);
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo-text {
          color: var(--color-dark);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        /* --- 2. SEARCH --- */
        .header-center {
          flex-grow: 1;
          max-width: 500px;
          margin: 0 20px;
        }
        
        /* Clean Search Styles */
        .search-wrapper form {
          display: flex;
          height: 44px;
          width: 100%;
        }
        .search-wrapper input {
          flex-grow: 1;
          border: 1px solid var(--color-border) !important;
          border-right: none !important;
          border-radius: 22px 0 0 22px !important;
          padding: 0 20px;
          font-size: 0.9rem;
          outline: none;
          font-family: var(--font-main);
          color: var(--color-dark);
        }
        .search-wrapper button {
          background: var(--color-dark) !important;
          color: #fff !important;
          border: none !important;
          border-radius: 0 22px 22px 0 !important;
          padding: 0 25px;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .search-wrapper button:hover {
          background: #000 !important;
        }

        /* --- 3. NAVIGATION --- */
        .header-right { flex-shrink: 0; }
        .nav-menu { display: flex; align-items: center; gap: 20px; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          color: var(--color-dark);
          text-decoration: none;
          cursor: pointer;
          font-size: 0.95rem;
          height: 44px;
          transition: color 0.2s;
        }
        .nav-item:hover { color: var(--color-yellow); }
        
        .user-capsule {
          display: flex; 
          align-items: center; 
          gap: 6px; 
          cursor: pointer;
        }

        /* BUTTONS */
        .nav-btn {
          height: 40px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          font-weight: 500;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s;
          border-radius: 20px;
          gap: 8px;
        }
        .nav-btn:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
        }

        .black { background: var(--color-dark); color: #fff; border: none; }
        .white { background: #fff; border: 1px solid var(--color-border); color: var(--color-dark); }
        
        /* Overridden the old purple class to match the clean Yellow/Black theme */
        .purple { background: var(--color-yellow); color: var(--color-dark); border: none; }

        .badge {
          background: var(--color-dark);
          color: var(--color-yellow);
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
          min-width: 20px;
          text-align: center;
          font-weight: 600;
        }

        /* DROPDOWNS */
        .dropdown-trigger { position: relative; }
        .dropdown-menu-pop {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          min-width: 200px;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          z-index: 1000;
          margin-top: 5px;
          overflow: hidden;
        }
        .dropdown-trigger:hover .dropdown-menu-pop { display: flex; }
        .right-align { right: 0; left: auto; }

        .dd-link {
          padding: 12px 20px;
          color: var(--color-dark);
          text-decoration: none;
          border-bottom: 1px solid var(--color-border);
          font-weight: 500;
          font-size: 0.9rem;
          transition: 0.2s;
        }
        .dd-link:hover { background: #f9f9f9; color: var(--color-yellow); }
        .dd-link:last-child { border-bottom: none; }
        .logout { display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: #ef4444; }

        /* MOBILE */
        .mobile-toggle { display: none; background: none; border: none; cursor: pointer; color: var(--color-dark); }

        @media (max-width: 992px) {
          .header-center { display: none; }
          .mobile-toggle { display: block; }
          .header-container { padding: 0 20px; }
          .nav-menu {
            display: none;
            position: absolute;
            top: 100%; left: 0; width: 100%;
            background: #fff;
            flex-direction: column;
            padding: 20px;
            border-bottom: 1px solid var(--color-border);
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
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