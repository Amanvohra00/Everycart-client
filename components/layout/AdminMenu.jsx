import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutList, PackagePlus, ShoppingBag, ListOrderedIcon } from "lucide-react";

const AdminMenu = () => {
  return (
    <>
      <div className="pop-menu-card">
        <div className="menu-header">
          ADMIN PANEL
        </div>

        <div className="menu-list">
          <NavLink
            to="/dashboard/admin/create-category"
            className="pop-nav-link"
          >
            <LayoutList size={20} strokeWidth={2.5} />
            Create Category
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-subcategory"
            className="pop-nav-link"
          >
            <LayoutList size={20} strokeWidth={2.5} />
            Create Subcategory
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-product"
            className="pop-nav-link"
          >
            <PackagePlus size={20} strokeWidth={2.5} />
            Create Product
          </NavLink>

          <NavLink
            to="/dashboard/admin/products"
            className="pop-nav-link"
          >
            <ShoppingBag size={20} strokeWidth={2.5} />
            Products
          </NavLink>

          <NavLink
            to="/dashboard/admin/adminorders"
            className="pop-nav-link"
          >
            <ListOrderedIcon size={20} strokeWidth={2.5} />
            Orders
          </NavLink>
        </div>
      </div>

      {/* STYLES */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

          :root {
            --color-yellow: #FFB300;
            --color-dark: #222222;
            --color-border: #eaeaea;
            --color-muted: #888888;
            --font-main: 'Poppins', sans-serif;
          }

          .pop-menu-card {
            background: #ffffff;
            border: 1px solid var(--color-border);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            overflow: hidden;
            font-family: var(--font-main);
            position: sticky;
            top: 20px;
          }

          .menu-header {
            background: #ffffff;
            padding: 20px 25px;
            font-weight: 600;
            font-size: 1.1rem;
            color: var(--color-dark);
            border-bottom: 1px solid var(--color-border);
            letter-spacing: 0.5px;
          }

          .menu-list {
             display: flex;
             flex-direction: column;
             padding: 15px;
             gap: 8px;
          }

          .pop-nav-link {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 14px 18px;
            text-decoration: none;
            color: var(--color-dark);
            font-weight: 500;
            font-size: 0.95rem;
            border-radius: 8px;
            transition: all 0.2s ease;
            background: transparent;
          }

          /* Default Icon Color */
          .pop-nav-link svg {
            color: var(--color-muted);
            transition: color 0.2s ease;
          }

          /* HOVER STATE */
          .pop-nav-link:hover {
            background: #f8f9fa;
            color: var(--color-yellow);
          }

          .pop-nav-link:hover svg {
            color: var(--color-yellow);
          }

          /* ACTIVE STATE */
          .pop-nav-link.active {
            background: var(--color-yellow);
            color: var(--color-dark);
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(255, 179, 0, 0.2);
          }

          /* INVERT ICON ON ACTIVE */
          .pop-nav-link.active svg {
             color: var(--color-dark);
          }
        `}
      </style>
    </>
  );
};

export default AdminMenu;