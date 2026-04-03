import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/auth";
import { useCart } from "../components/context/Cart";
import Layout from "../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Lock, ShieldCheck, MapPin, CreditCard, Truck, ChevronRight } from "lucide-react";

const PaymentPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total amount
  const TotalAmount = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  // Fetch cart on page load
  const getCart = async () => {
    try {
      if (!auth?.token) return;
      const { data } = await axios.get("http://localhost:8080/api/v1/cart/get-cart", {
        headers: { Authorization: auth?.token },
      });
      if (data?.success) setCart(data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getCart();
  }, [auth?.token]);

  // Handle Dummy Payment
  const handlePayment = async () => {
    try {
      if (!auth?.user?.address) {
        toast.error("Please add address");
        return;
      }

      setLoading(true);

      // STEP 1: Create Razorpay Order
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/order/create-razorpay-order`,
        {},
        { headers: { Authorization: auth?.token } }
      );

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          // STEP 2: Verify Payment
          const res = await axios.post(
            `${import.meta.env.VITE_API}/order/verify-razorpay-payment`,
            response,
            { headers: { Authorization: auth?.token } }
          );

          if (res.data.success) {
            toast.success("Payment successful!");
            setCart([]);
            localStorage.removeItem("cart");
            navigate("/dashboard/user/orders");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Secure Checkout">
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER */}
          <div className="page-header">
            <div className="title-box">
              <div className="title-icon">
                <Lock size={28} strokeWidth={2.5} />
              </div>
              <h1 className="page-title">Secure Checkout</h1>
            </div>
            <p className="page-subtitle">Complete your purchase safely and securely.</p>
          </div>

          {cart.length === 0 ? (
             <div className="empty-state-card">
                <h3>Your cart is empty</h3>
                <button className="btn-return" onClick={() => navigate('/')}>
                   Return to Shop <ChevronRight size={18} />
                </button>
             </div>
          ) : (
            <div className="checkout-grid">
              
              {/* LEFT: ORDER DETAILS & SHIPPING */}
              <div className="checkout-left">
                
                {/* Shipping Info */}
                <div className="checkout-card">
                   <h2 className="card-title">
                     <MapPin size={20} className="text-yellow" /> Shipping Information
                   </h2>
                   <div className="shipping-details">
                      <div className="user-name">{auth?.user?.name}</div>
                      <p className="user-address">
                         {auth?.user?.address || "No address provided. Please update your profile."}
                      </p>
                      <button 
                         className="btn-text" 
                         onClick={() => navigate('/dashboard/user/profile')}
                      >
                         Change Address
                      </button>
                   </div>
                </div>

                {/* Order Items */}
                <div className="checkout-card">
                   <h2 className="card-title">
                     <Truck size={20} className="text-yellow" /> Order Items ({cart.length})
                   </h2>
                   <div className="items-list">
                     {cart.map((item) => (
                       <div key={item.product._id} className="checkout-item">
                         <div className="item-img-box">
                           <img
                             src={`${import.meta.env.VITE_API_UPLOAD || 'http://localhost:8080'}${item.product.photo}`}
                             alt={item.product.name}
                             className="item-img"
                           />
                         </div>
                         <div className="item-info">
                           <h4 className="item-name">{item.product.name}</h4>
                           <div className="item-meta">Qty: {item.quantity}</div>
                         </div>
                         <div className="item-price">
                           ₹{item.product.price * item.quantity}
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

              </div>

              {/* RIGHT: ORDER SUMMARY & PAYMENT */}
              <div className="checkout-right">
                <div className="checkout-card summary-card">
                   <h2 className="card-title mb-4">Order Summary</h2>
                   
                   <div className="summary-row">
                      <span>Subtotal</span>
                      <span>₹{TotalAmount()}</span>
                   </div>
                   <div className="summary-row">
                      <span>Shipping</span>
                      <span className="text-green">Free</span>
                   </div>
                   <div className="summary-row">
                      <span>Taxes</span>
                      <span>Calculated at checkout</span>
                   </div>

                   <div className="summary-divider"></div>

                   <div className="summary-row total-row">
                      <span>Total Amount</span>
                      <span>₹{TotalAmount()}</span>
                   </div>

                   <button
                     className="btn-pay-now"
                     onClick={handlePayment}
                     disabled={loading}
                   >
                     {loading ? (
                        "Processing..."
                     ) : (
                        <>
                           <CreditCard size={20} strokeWidth={2.5} /> Pay ₹{TotalAmount()}
                        </>
                     )}
                   </button>

                   {/* Trust Badges */}
                   <div className="trust-badges">
                      <div className="badge-item">
                         <ShieldCheck size={18} className="text-yellow" />
                         <span>256-bit Encryption</span>
                      </div>
                      <div className="badge-item">
                         <Lock size={18} className="text-yellow" />
                         <span>Secure Checkout</span>
                      </div>
                   </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        :root {
          --color-yellow: #FFB300;
          --color-dark: #222222;
          --color-border: #eaeaea;
          --color-muted: #888888;
          --color-bg-page: #f8f9fa;
          --color-green: #2e7d32;
          --font-main: 'Poppins', sans-serif;
        }

        .text-yellow { color: var(--color-yellow); }
        .text-green { color: var(--color-green); font-weight: 600; }
        .mb-4 { margin-bottom: 20px; }

        .pop-page-background {
          background-color: var(--color-bg-page);
          min-height: 90vh;
          padding: 50px 0;
          font-family: var(--font-main);
        }

        .pop-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* --- HEADER --- */
        .page-header {
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .title-box {
           display: flex;
           align-items: center;
           gap: 15px;
           margin-bottom: 12px;
        }

        .title-icon {
           background: var(--color-yellow);
           color: var(--color-dark);
           width: 54px;
           height: 54px;
           border-radius: 14px;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .page-title {
          font-size: 2.2rem;
          font-weight: 600;
          margin: 0;
          color: var(--color-dark);
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          font-size: 1.05rem;
          color: var(--color-muted);
          font-weight: 400;
          margin: 0;
        }

        /* --- EMPTY STATE --- */
        .empty-state-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 16px;
           padding: 80px 40px;
           text-align: center;
           box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }
        .empty-state-card h3 {
           font-weight: 600;
           color: var(--color-dark);
           margin-bottom: 20px;
        }
        .btn-return {
           background: var(--color-yellow);
           color: var(--color-dark);
           border: none;
           padding: 12px 30px;
           border-radius: 30px;
           font-weight: 600;
           cursor: pointer;
           display: inline-flex;
           align-items: center;
           gap: 8px;
           transition: all 0.2s ease;
           font-family: var(--font-main);
        }
        .btn-return:hover {
           background: var(--color-dark);
           color: #ffffff;
        }

        /* --- CHECKOUT GRID --- */
        .checkout-grid {
           display: grid;
           grid-template-columns: 1.5fr 1fr;
           gap: 40px;
           align-items: start;
        }

        .checkout-left {
           display: flex;
           flex-direction: column;
           gap: 30px;
        }

        .checkout-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 16px;
           padding: 30px;
           box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .card-title {
           font-size: 1.2rem;
           font-weight: 600;
           color: var(--color-dark);
           margin-bottom: 20px;
           display: flex;
           align-items: center;
           gap: 10px;
           border-bottom: 1px solid var(--color-border);
           padding-bottom: 15px;
        }

        /* --- SHIPPING DETAILS --- */
        .shipping-details {
           background: #f8f9fa;
           padding: 20px;
           border-radius: 12px;
           border: 1px dashed #ccc;
        }
        .user-name {
           font-weight: 600;
           font-size: 1.1rem;
           color: var(--color-dark);
           margin-bottom: 5px;
        }
        .user-address {
           font-size: 0.95rem;
           color: var(--color-muted);
           line-height: 1.5;
           margin-bottom: 15px;
        }
        .btn-text {
           background: none;
           border: none;
           color: var(--color-dark);
           font-weight: 600;
           font-size: 0.9rem;
           text-decoration: underline;
           cursor: pointer;
           padding: 0;
           font-family: var(--font-main);
        }

        /* --- ORDER ITEMS --- */
        .items-list {
           display: flex;
           flex-direction: column;
           gap: 20px;
        }

        .checkout-item {
           display: flex;
           align-items: center;
           gap: 20px;
        }

        .item-img-box {
           width: 80px;
           height: 80px;
           background: #f8f9fa;
           border-radius: 10px;
           border: 1px solid var(--color-border);
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 10px;
           flex-shrink: 0;
        }
        .item-img {
           max-width: 100%;
           max-height: 100%;
           object-fit: contain;
        }

        .item-info {
           flex: 1;
        }
        .item-name {
           font-size: 1rem;
           font-weight: 500;
           color: var(--color-dark);
           margin-bottom: 5px;
           line-height: 1.3;
        }
        .item-meta {
           font-size: 0.85rem;
           color: var(--color-muted);
        }

        .item-price {
           font-weight: 600;
           font-size: 1.1rem;
           color: var(--color-dark);
        }

        /* --- SUMMARY CARD --- */
        .summary-card {
           position: sticky;
           top: 100px;
        }

        .summary-row {
           display: flex;
           justify-content: space-between;
           margin-bottom: 15px;
           font-size: 0.95rem;
           color: var(--color-muted);
        }

        .summary-divider {
           height: 1px;
           background: var(--color-border);
           margin: 20px 0;
        }

        .total-row {
           font-size: 1.25rem;
           font-weight: 600;
           color: var(--color-dark);
           margin-bottom: 30px;
        }

        .btn-pay-now {
           width: 100%;
           background: var(--color-yellow);
           color: var(--color-dark);
           border: none;
           padding: 16px;
           font-size: 1.1rem;
           font-weight: 600;
           border-radius: 12px;
           cursor: pointer;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 10px;
           transition: all 0.2s ease;
           font-family: var(--font-main);
           box-shadow: 0 4px 15px rgba(255, 179, 0, 0.2);
        }
        .btn-pay-now:hover:not(:disabled) {
           background: var(--color-dark);
           color: #ffffff;
           box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .btn-pay-now:disabled {
           opacity: 0.6;
           cursor: not-allowed;
           box-shadow: none;
        }

        .trust-badges {
           margin-top: 25px;
           display: flex;
           flex-direction: column;
           gap: 10px;
           background: #f8f9fa;
           padding: 15px;
           border-radius: 10px;
        }
        .badge-item {
           display: flex;
           align-items: center;
           gap: 10px;
           font-size: 0.85rem;
           font-weight: 500;
           color: var(--color-dark);
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 900px) {
           .checkout-grid { grid-template-columns: 1fr; }
           .pop-container { padding: 0 20px; }
        }
      `}</style>
    </Layout>
  );
};

export default PaymentPage;