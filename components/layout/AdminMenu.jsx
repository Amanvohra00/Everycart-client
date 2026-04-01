import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutList, PackagePlus, ShoppingBag ,ListOrderedIcon} from "lucide-react";

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
            CREATE CATEGORY
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-subcategory"
            className="pop-nav-link"
          >
            <LayoutList size={20} strokeWidth={2.5} />
            CREATE SUBCATEGORY
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-product"
            className="pop-nav-link"
          >
            <PackagePlus size={20} strokeWidth={2.5} />
            CREATE PRODUCT
          </NavLink>

          <NavLink
            to="/dashboard/admin/products"
            className="pop-nav-link"
          >
            <ShoppingBag size={20} strokeWidth={2.5} />
            PRODUCTS
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
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap');

          .pop-menu-card {
            background: #ffffff;
            border: 2.5px solid #000000;
            box-shadow: 5px 5px 0px #000000;
            overflow: hidden;
            font-family: 'Space Grotesk', sans-serif;
            position: sticky;
            top: 20px;
          }

          .menu-header {
            background: #ffdb4d; /* Yellow */
            padding: 15px;
            text-align: center;
            font-weight: 800;
            font-size: 1.2rem;
            letter-spacing: 1px;
            border-bottom: 2.5px solid #000000;
          }

          .menu-list {
             display: flex;
             flex-direction: column;
          }

          .pop-nav-link {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 18px 20px;
            text-decoration: none;
            color: #000000;
            font-weight: 700;
            font-size: 0.9rem;
            border-bottom: 2.5px solid #000000;
            transition: all 0.2s ease;
            background: #fff;
          }

          /* Remove border from last item */
          .pop-nav-link:last-child {
             border-bottom: none;
          }

          /* HOVER STATE */
          .pop-nav-link:hover {
            background: #fdfbf7;
            padding-left: 28px; /* Slide Effect */
            color: #a855f7; /* Purple */
          }

          /* ACTIVE STATE */
          .pop-nav-link.active {
            background: #000000;
            color: #ffffff;
            padding-left: 28px;
          }

          /* INVERT ICON ON ACTIVE */
          .pop-nav-link.active svg {
             stroke: #4ade80; /* Green accent on active icon */
          }
        `}
      </style>
    </>
  );
};

export default AdminMenu;