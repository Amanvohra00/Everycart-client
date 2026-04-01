import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import UserMenu from '../components/layout/UserMenu';
import { useAuth } from '../components/context/auth';
import moment from 'moment';
import axios from 'axios';
import { Package, Calendar, MapPin, CreditCard, Clock, ShoppingBag } from 'lucide-react';

const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  // Fetch user orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/order/my-orders`, {
        headers: { Authorization: auth?.token },
      });
      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"My Orders"}>
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER */}
          <div className="dashboard-header">
             <div className="header-title-box">
                <ShoppingBag size={28} strokeWidth={2.5} />
                <h1>MY ORDER HISTORY</h1>
             </div>
             <p>Track your past and current orders.</p>
          </div>

          <div className="dashboard-grid">
            
            {/* LEFT: SIDEBAR */}
            <div className="dashboard-sidebar">
              <UserMenu />
            </div>

            {/* RIGHT: ORDERS LIST */}
            <div className="dashboard-content">
              
              {orders.length === 0 ? (
                 <div className="empty-state">
                    <h3>No orders found yet.</h3>
                    <p>Go shopping to fill this space!</p>
                 </div>
              ) : (
                 <div className="orders-list">
                    {orders.map((order, index) => (
                       <div key={order._id} className="order-card">
                          
                          {/* ORDER HEADER */}
                          <div className="order-header">
                             <div className="order-id">
                                ORDER #{index + 1}
                             </div>
                             <div className={`status-badge ${order.status?.toLowerCase()}`}>
                                {order.status}
                             </div>
                          </div>

                          {/* ORDER DETAILS */}
                          <div className="order-meta">
                             <div className="meta-item">
                                <Calendar size={16} /> 
                                {moment(order.createdAt).format("DD MMM YYYY")}
                             </div>
                             <div className="meta-item">
                                <CreditCard size={16} /> 
                                {order.paymentMode}
                             </div>
                             <div className="meta-item full-width">
                                <MapPin size={16} /> 
                                {order.address}
                             </div>
                          </div>

                          {/* PRODUCTS LIST */}
                          <div className="order-products">
                             {order?.products?.map((item) => (
                                <div key={item._id} className="prod-row">
                                   <div className="prod-img-box">
                                      <img
                                        src={
                                          item?.product?.photo
                                            ? `${import.meta.env.VITE_API_UPLOAD}${item.product.photo.startsWith("/") ? "" : "/"}${item.product.photo}`
                                            : "/placeholder.png"
                                        }
                                        alt={item?.product?.name}
                                        className="prod-img"
                                      />
                                   </div>
                                   <div className="prod-info">
                                      <div className="prod-name">{item?.product?.name}</div>
                                      <div className="prod-details">
                                         Qty: {item.quantity} | Price: ₹{item.price}
                                      </div>
                                   </div>
                                </div>
                             ))}
                          </div>

                          {/* FOOTER TOTAL */}
                          <div className="order-footer">
                             <span>TOTAL AMOUNT</span>
                             <span className="total-price">Rs.{order.totalAmount}</span>
                          </div>

                       </div>
                    ))}
                 </div>
              )}

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap');

        :root {
          --black: #000000;
          --white: #ffffff;
          --off-white: #fdfbf7;
          --yellow: #ffdb4d;
          --purple: #a855f7;
          --green: #4ade80;
          --red: #ef4444;
          --blue: #3b82f6;
          --border: 2.5px solid var(--black);
          --shadow: 6px 6px 0px var(--black);
          --shadow-hover: 10px 10px 0px var(--black);
          --font: 'Space Grotesk', sans-serif;
        }

        .pop-page-background {
          background-color: var(--off-white);
          background-image: radial-gradient(var(--black) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          min-height: 90vh;
          padding: 40px 0;
          font-family: var(--font);
        }

        .pop-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* HEADER */
        .dashboard-header {
           margin-bottom: 40px;
           text-align: center;
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        .header-title-box {
           background: var(--white);
           border: var(--border);
           padding: 10px 25px;
           display: inline-flex;
           align-items: center;
           gap: 15px;
           box-shadow: 4px 4px 0px var(--black);
           transform: rotate(-1deg);
           margin-bottom: 10px;
        }

        .header-title-box h1 {
           font-size: 2rem;
           font-weight: 800;
           margin: 0;
           letter-spacing: -1px;
        }

        /* GRID LAYOUT */
        .dashboard-grid {
           display: grid;
           grid-template-columns: 280px 1fr;
           gap: 40px;
           align-items: start;
        }

        /* EMPTY STATE */
        .empty-state {
           background: var(--white);
           border: var(--border);
           padding: 40px;
           text-align: center;
           box-shadow: var(--shadow);
        }

        /* ORDER CARD */
        .order-card {
           background: var(--white);
           border: var(--border);
           box-shadow: var(--shadow);
           margin-bottom: 30px;
           transition: 0.2s;
        }
        .order-card:hover {
           transform: translate(-4px, -4px);
           box-shadow: var(--shadow-hover);
        }

        .order-header {
           background: var(--black);
           color: var(--white);
           padding: 15px 20px;
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .order-id {
           font-weight: 800;
           font-size: 1.1rem;
           letter-spacing: 1px;
        }

        .status-badge {
           font-size: 0.8rem;
           font-weight: 700;
           text-transform: uppercase;
           padding: 4px 12px;
           border: 1px solid var(--white);
           border-radius: 20px;
           background: var(--black); /* Default */
        }
        
        /* Status Colors */
        .status-badge.processing { color: var(--yellow); border-color: var(--yellow); }
        .status-badge.shipped { color: var(--blue); border-color: var(--blue); }
        .status-badge.delivered { color: var(--green); border-color: var(--green); }
        .status-badge.cancelled { color: var(--red); border-color: var(--red); }

        .order-meta {
           padding: 20px;
           display: flex;
           flex-wrap: wrap;
           gap: 20px;
           border-bottom: 1px solid #eee;
           background: #fafafa;
        }

        .meta-item {
           display: flex;
           align-items: center;
           gap: 8px;
           font-size: 0.9rem;
           font-weight: 600;
           color: #555;
        }
        .full-width { width: 100%; }

        /* PRODUCTS */
        .order-products {
           padding: 20px;
        }

        .prod-row {
           display: flex;
           align-items: center;
           gap: 15px;
           margin-bottom: 15px;
           border: 1px solid #eee;
           padding: 10px;
        }
        .prod-row:last-child { margin-bottom: 0; }

        .prod-img-box {
           width: 60px; height: 60px;
           background: var(--white);
           border: 1px solid #ddd;
           display: flex; align-items: center; justify-content: center;
        }
        .prod-img { max-width: 90%; max-height: 90%; object-fit: contain; }

        .prod-info { flex: 1; }
        .prod-name { font-weight: 700; font-size: 1rem; margin-bottom: 4px; }
        .prod-details { font-size: 0.85rem; color: #666; }

        /* FOOTER */
        .order-footer {
           background: var(--yellow);
           border-top: var(--border);
           padding: 15px 20px;
           display: flex;
           justify-content: space-between;
           align-items: center;
           font-weight: 800;
        }
        
        .total-price {
           font-size: 1.2rem;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export default Orders;