import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { ClipboardList, User, MapPin, IndianRupee, Package, Hash } from "lucide-react";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    // fetch all orders
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order/all-orders`);

            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    // update order status
    const updateStatus = async (orderId, status) => {
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/order/update-status`,
                { orderId, status }
            );

            if (data.success) {
                getAllOrders(); // refresh UI
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={"Dashboard - Manage Orders"}>
            <div className="pop-page-background">
                <div className="pop-container">
                    
                    {/* HEADER */}
                    <div className="dashboard-header">
                        <div className="header-title-box">
                            <ClipboardList size={28} strokeWidth={2.5} />
                            <h1>MANAGE ORDERS</h1>
                        </div>
                        <p>View all customer orders and update their delivery status.</p>
                    </div>

                    <div className="dashboard-grid">
                        
                        {/* LEFT: SIDEBAR */}
                        <div className="dashboard-sidebar">
                            <AdminMenu />
                        </div>

                        {/* RIGHT: ORDERS CONTENT */}
                        <div className="dashboard-content">
                            
                            {orders.length === 0 ? (
                                <div className="empty-state">
                                    <h3>No orders found.</h3>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {orders.map((order, i) => (
                                        <div key={order._id} className="admin-order-card">
                                            
                                            {/* ORDER HEADER */}
                                            <div className="order-header">
                                                <div className="order-id">
                                                    <Hash size={18} /> ORDER #{order._id.substring(order._id.length - 8).toUpperCase()}
                                                </div>
                                                
                                                {/* STATUS DROPDOWN */}
                                                <div className="status-wrapper">
                                                    <select
                                                        className={`status-select ${order.status.replace(/\s+/g, '-').toLowerCase()}`}
                                                        value={order.status}
                                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                                    >
                                                        <option value="Booked">Booked</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="In Transit">In Transit</option>
                                                        <option value="Out for Delivery">Out for Delivery</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* ORDER DETAILS */}
                                            <div className="order-details-grid">
                                                <div className="detail-item">
                                                    <User size={18} className="detail-icon" />
                                                    <div className="detail-text">
                                                        <label>CUSTOMER</label>
                                                        <span>{order.buyer?.name} ({order.buyer?.email})</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="detail-item">
                                                    <IndianRupee size={18} className="detail-icon" />
                                                    <div className="detail-text">
                                                        <label>TOTAL AMOUNT</label>
                                                        <span className="price-tag">₹{order.totalAmount}</span>
                                                    </div>
                                                </div>

                                                <div className="detail-item full-width">
                                                    <MapPin size={18} className="detail-icon" />
                                                    <div className="detail-text">
                                                        <label>SHIPPING ADDRESS</label>
                                                        <span>{order.address}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* PRODUCTS LIST */}
                                            <div className="order-products-section">
                                                <label className="section-label">
                                                    <Package size={16} /> ITEMS ORDERED ({order.products.length})
                                                </label>
                                                <div className="products-box">
                                                    {order.products.map((p, idx) => (
                                                        <div key={p._id || idx} className="product-row">
                                                            <span className="prod-name">{p.product?.name}</span>
                                                            <span className="prod-qty">
                                                                {p.quantity} x ₹{p.price}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
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

                /* GRID */
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
                .orders-list {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .admin-order-card {
                    background: var(--white);
                    border: var(--border);
                    box-shadow: var(--shadow);
                    transition: 0.2s;
                }
                .admin-order-card:hover {
                    transform: translate(-4px, -4px);
                    box-shadow: var(--shadow-hover);
                }

                /* CARD HEADER */
                .order-header {
                    background: var(--black);
                    color: var(--white);
                    padding: 15px 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: var(--border);
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .order-id {
                    font-weight: 800;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    letter-spacing: 1px;
                }

                /* STATUS DROPDOWN */
                .status-select {
                    appearance: none;
                    background: var(--white);
                    border: 2px solid var(--black);
                    padding: 8px 15px;
                    font-family: var(--font);
                    font-weight: 700;
                    font-size: 0.9rem;
                    color: var(--black);
                    cursor: pointer;
                    outline: none;
                    border-radius: 0;
                    box-shadow: 2px 2px 0px rgba(255,255,255,0.5);
                    text-transform: uppercase;
                }
                .status-select:focus {
                    box-shadow: 4px 4px 0px var(--yellow);
                }

                /* Dynamic Status Colors inside the select */
                .status-select.booked { background: var(--off-white); }
                .status-select.processing { background: var(--yellow); }
                .status-select.in-transit { background: var(--blue); color: white; }
                .status-select.out-for-delivery { background: var(--purple); color: white; }
                .status-select.delivered { background: var(--green); }
                .status-select.cancelled { background: var(--red); color: white; }

                /* CARD DETAILS */
                .order-details-grid {
                    padding: 25px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    background: #fdfbf7;
                    border-bottom: 2px dashed #ccc;
                }

                .detail-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }
                .full-width {
                    grid-column: 1 / -1;
                }

                .detail-icon {
                    color: var(--black);
                    margin-top: 2px;
                }

                .detail-text {
                    display: flex;
                    flex-direction: column;
                }

                .detail-text label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #888;
                    margin-bottom: 4px;
                    letter-spacing: 0.5px;
                }

                .detail-text span {
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: var(--black);
                }

                .price-tag {
                    background: var(--yellow);
                    padding: 2px 8px;
                    border: 1px solid var(--black);
                    display: inline-block;
                    width: fit-content;
                    box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
                }

                /* PRODUCTS LIST */
                .order-products-section {
                    padding: 25px;
                    background: var(--white);
                }

                .section-label {
                    font-weight: 800;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 15px;
                }

                .products-box {
                    border: 2px solid var(--black);
                    background: #fafafa;
                }

                .product-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 15px;
                    border-bottom: 2px solid #eee;
                    font-weight: 600;
                    font-size: 0.95rem;
                }
                .product-row:last-child {
                    border-bottom: none;
                }

                .prod-name { color: var(--black); }
                .prod-qty { color: #555; }

                /* RESPONSIVE */
                @media (max-width: 900px) {
                    .dashboard-grid { grid-template-columns: 1fr; }
                    .order-details-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </Layout>
    );
};

export default AdminOrders;