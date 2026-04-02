import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/auth';
import { useCart } from '../components/context/Cart';
import Layout from '../components/layout/Layout';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, MapPin } from 'lucide-react';

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart([]);
  const navigate = useNavigate();

  // Calculate total price
  const TotalPrice = () => {
    try {
      if (!cart || cart.length === 0) return 0;
      const total = cart.reduce(
        (acc, item) => acc + (item?.product?.price || 0) * (item.quantity || 0),
        0
      );
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(total);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Get cart products
  const getCart = async () => {
    try {
      if (!auth?.token) return;
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart/get-cart`, {
        headers: { Authorization: auth?.token },
      });
      if (data?.success) setCart(data.cart || []);
    } catch (error) {
      console.log(error);
      setCart([]);
    }
  };

  useEffect(() => {
    if (auth?.token) getCart();
  }, [auth?.token]);

  // Remove product
  const handleRemove = async (productId) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API}/cart/remove/${productId}`, {
        headers: { Authorization: auth?.token },
      });
      if (data?.success) {
        setCart(data.cart || []);
        getCart();
        toast.success("Item removed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Place COD order
  const handlePlaceOrder = async () => {
    try {
      if (!auth?.user?.address) {
        toast.error('Please enter your address');
        return;
      }
      const { data } = await axios.post(`${import.meta.env.VITE_API}/order/place-order`, {}, {
        headers: { Authorization: auth?.token },
      });
      if (data?.success) {
        toast.success('Order placed successfully');
        setCart([]);
      }
    } catch (error) {
      console.log(error);
      toast.error('Order Failed');
    }
  };

  // Dummy payment
  const handleDummyPayment = () => {
    if (!auth?.user?.address) {
      toast.error('Please enter your address');
      return;
    }
    navigate('/payment');
  };

  // Update quantity
  const handleQuantityChange = async (productId, action) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/cart/update-quantity`,
        { productId, action },
        { headers: { Authorization: auth?.token } }
      );
      if (data?.success) setCart(data.cart || []);
      if (!data?.success && data?.message) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      const msg =
        error?.response?.data?.message || "Failed to update quantity";

      toast.error(msg);
    }
  };

  return (
    <Layout title={"Your Cart"}>
      <div className="pop-page-background">
        <div className="pop-container">

          {/* HEADER */}
          <div className="cart-header">
            <h1 className="page-title">
              Shopping Cart ({cart?.length})
            </h1>
            <p className="user-welcome">
              Welcome back, {auth?.user?.name || "Guest"}
            </p>
          </div>

          <div className="cart-grid-layout">

            {/* LEFT: CART ITEMS */}
            <div className="cart-items-section">
              {cart?.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item?.product?._id}
                    className="cart-item-card"
                    // 1. Navigate on card click
                    onClick={() => navigate(`/product/${item?.product?.slug}`)}
                  >
                    {/* Image */}
                    <div className="item-img-box">
                      <img
                        src={
                          item?.product?.photo
                            ? `${import.meta.env.VITE_API_UPLOAD}${item.product.photo.startsWith('/') ? '' : '/'}${item.product.photo}`
                            : '/placeholder.png'
                        }
                        alt={item?.product?.name}
                        className="item-img"
                      />
                    </div>

                    {/* Info */}
                    <div className="item-info">
                      <h3 className="item-name">{item?.product?.name}</h3>
                      <p className="item-price">₹ {item?.product?.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div
                      className="qty-controls"
                      // 2. Stop bubbling when clicking quantity area
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="qty-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(item?.product?._id, 'dec');
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{item?.quantity}</span>
                      <button
                        className="qty-btn"
                        disabled={item.quantity >= item?.product?.quantity}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(item?.product?._id, "inc");
                        }}
                        style={{
                          opacity:
                            item.quantity >= item?.product?.quantity ? 0.4 : 1,
                          cursor:
                            item.quantity >= item?.product?.quantity
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      className="btn-remove"
                      onClick={(e) => {
                        // 3. Stop bubbling when clicking remove
                        e.stopPropagation();
                        handleRemove(item?.product?._id);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  <h3>Your cart is empty</h3>
                  <button className="btn-go-shop" onClick={() => navigate('/')}>Go Shopping</button>
                </div>
              )}
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="cart-summary-section">
              <div className="summary-card">
                <h2 className="summary-title">Order Summary</h2>
                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>{TotalPrice()}</span>
                </div>

                {/* ADDRESS SECTION */}
                <div className="address-box">
                  <div className="addr-header">
                    <MapPin size={16} /> SHIPPING ADDRESS
                  </div>
                  {auth?.user?.address ? (
                    <>
                      <p className="addr-text">{auth?.user?.address}</p>
                      <button
                        className="btn-addr-update"
                        onClick={() => navigate('/dashboard/user/profile')}
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn-addr-update"
                      onClick={() => navigate(auth?.token ? '/dashboard/user/profile' : '/login', { state: '/cart' })}
                    >
                      {auth?.token ? "Add Address" : "Login to Checkout"}
                    </button>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <button
                  className="btn-checkout cod"
                  disabled={!cart?.length || !auth?.user?.address}
                  onClick={handlePlaceOrder}
                >
                  <ShoppingBag size={18} /> PLACE ORDER (COD)
                </button>

                <button
                  className="btn-checkout online"
                  disabled={!cart?.length || !auth?.user?.address}
                  onClick={handleDummyPayment}
                >
                  <CreditCard size={18} /> PAY ONLINE
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        :root {
          --color-yellow: #FFB300;
          --color-dark: #222222;
          --color-border: #eaeaea;
          --color-muted: #888888;
          --color-bg-page: #f8f9fa; /* Light gray background to make white cards pop */
          --font-main: 'Poppins', sans-serif;
        }

        .pop-page-background {
          background-color: var(--color-bg-page);
          min-height: 90vh;
          padding: 40px 0;
          font-family: var(--font-main);
        }

        .pop-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* HEADER */
        .cart-header {
           margin-bottom: 30px;
           text-align: left;
        }
        .page-title {
           font-size: 2rem;
           font-weight: 600;
           color: var(--color-dark);
           margin-bottom: 5px;
        }
        .user-welcome {
           font-size: 1rem;
           font-weight: 400;
           color: var(--color-muted);
        }

        /* GRID LAYOUT */
        .cart-grid-layout {
           display: grid;
           grid-template-columns: 1.8fr 1fr;
           gap: 30px;
           align-items: start;
        }

        /* LEFT: ITEMS */
        .cart-items-section {
           display: flex;
           flex-direction: column;
           gap: 15px;
        }

        .cart-item-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 12px;
           padding: 20px;
           display: flex;
           align-items: center;
           gap: 20px;
           transition: transform 0.2s, box-shadow 0.2s;
           cursor: pointer;
        }
        .cart-item-card:hover {
           transform: translateY(-2px);
           box-shadow: 0 10px 25px rgba(0,0,0,0.04);
        }

        .item-img-box {
           width: 90px; 
           height: 90px;
           background: #f8f8f8;
           border-radius: 8px;
           display: flex; 
           align-items: center; 
           justify-content: center;
           padding: 10px;
        }
        .item-img { max-width: 100%; max-height: 100%; object-fit: contain; mix-blend-mode: multiply; }

        .item-info { flex: 1; }
        .item-name { font-weight: 600; font-size: 1.05rem; margin-bottom: 5px; color: var(--color-dark); line-height: 1.3; }
        .item-price { font-weight: 600; color: var(--color-muted); font-size: 0.95rem; }

        .qty-controls {
           display: flex; align-items: center; gap: 12px;
           border: 1px solid var(--color-border);
           padding: 6px 12px;
           border-radius: 30px;
           margin-right: 10px;
           cursor: default;
        }
        .qty-btn {
           background: none; border: none; cursor: pointer; color: var(--color-dark);
           display: flex; align-items: center; justify-content: center; transition: 0.2s;
        }
        .qty-btn:hover { color: var(--color-yellow); }
        .qty-val { font-weight: 600; width: 20px; text-align: center; color: var(--color-dark); font-size: 0.9rem; }

        .btn-remove {
           background: #fff;
           border: 1px solid #ff4d4f;
           color: #ff4d4f;
           border-radius: 8px;
           padding: 10px;
           cursor: pointer;
           transition: all 0.2s;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        .btn-remove:hover { background: #ff4d4f; color: #ffffff; }

        /* EMPTY CART */
        .empty-cart {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 12px;
           padding: 60px 40px;
           text-align: center;
        }
        .empty-cart h3 {
           color: var(--color-dark);
           font-weight: 600;
           margin-bottom: 20px;
        }
        .btn-go-shop {
           background: var(--color-yellow); 
           color: var(--color-dark);
           padding: 12px 30px; 
           border: none; 
           border-radius: 30px;
           font-weight: 600;
           cursor: pointer;
           transition: opacity 0.2s;
           font-family: var(--font-main);
        }
        .btn-go-shop:hover { opacity: 0.9; }

        /* RIGHT: SUMMARY */
        .summary-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 12px;
           padding: 30px;
           position: sticky;
           top: 100px;
           box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .summary-title { font-weight: 600; font-size: 1.2rem; margin-bottom: 20px; color: var(--color-dark); }
        .summary-divider { height: 1px; background: var(--color-border); margin-bottom: 20px; }

        .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; color: var(--color-muted); font-size: 0.95rem; }
        .total { font-size: 1.2rem; font-weight: 600; color: var(--color-dark); border-top: 1px solid var(--color-border); padding-top: 15px; margin-top: 5px; }

        /* ADDRESS BOX */
        .address-box {
           background: #f8f9fa;
           border: 1px dashed #ccc;
           border-radius: 8px;
           padding: 15px;
           margin-bottom: 25px;
        }
        .addr-header { display: flex; align-items: center; gap: 8px; font-weight: 600; margin-bottom: 10px; font-size: 0.9rem; color: var(--color-dark); }
        .addr-text { font-size: 0.9rem; color: var(--color-muted); margin-bottom: 15px; line-height: 1.5; }
        .btn-addr-update {
           font-size: 0.85rem; font-weight: 600; text-decoration: none;
           background: #ffffff; border: 1px solid var(--color-border); 
           padding: 8px 15px; border-radius: 20px;
           cursor: pointer; color: var(--color-dark);
           transition: background 0.2s;
           font-family: var(--font-main);
        }
        .btn-addr-update:hover { background: #f0f0f0; }

        /* CHECKOUT BUTTONS */
        .btn-checkout {
           width: 100%;
           padding: 14px;
           font-weight: 600;
           font-size: 0.95rem;
           border-radius: 30px;
           cursor: pointer;
           display: flex; align-items: center; justify-content: center; gap: 10px;
           margin-bottom: 12px;
           transition: all 0.2s;
           border: none;
           font-family: var(--font-main);
        }
        .btn-checkout:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .cod { background: var(--color-dark); color: #ffffff; }
        .cod:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }

        .online { background: var(--color-yellow); color: var(--color-dark); }
        .online:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 179, 0, 0.2); }

        @media (max-width: 900px) {
           .cart-grid-layout { grid-template-columns: 1fr; }
           .summary-card { position: static; }
           .pop-container { padding: 0 20px; }
        }
      `}</style>
    </Layout>
  );
};

export default CartPage;