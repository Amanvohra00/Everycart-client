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
              SHOPPING CART ({cart?.length})
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
                        <Minus size={16} />
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
                        <Plus size={16} />
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
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  <h3>Your cart is empty</h3>
                  <button className="btn-go-shop" onClick={() => navigate('/')}>GO SHOPPING</button>
                </div>
              )}
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="cart-summary-section">
              <div className="summary-card">
                <h2 className="summary-title">ORDER SUMMARY</h2>
                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>TOTAL</span>
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
                        UPDATE ADDRESS
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn-addr-update"
                      onClick={() => navigate(auth?.token ? '/dashboard/user/profile' : '/login', { state: '/cart' })}
                    >
                      {auth?.token ? "ADD ADDRESS" : "LOGIN TO CHECKOUT"}
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
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap');

        :root {
          --black: #000000;
          --white: #ffffff;
          --off-white: #fdfbf7;
          --yellow: #ffdb4d;
          --purple: #a855f7;
          --red: #ef4444;
          --border: 2.5px solid var(--black);
          --shadow: 5px 5px 0px var(--black);
          --shadow-hover: 8px 8px 0px var(--black);
          --font: 'Space Grotesk', sans-serif;
        }

        .pop-page-background {
          background-color: var(--off-white);
          background-image: radial-gradient(var(--black) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          min-height: 90vh;
          padding: 40px 0;
          border-top: var(--border);
          font-family: var(--font);
        }

        .pop-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* HEADER */
        .cart-header {
           margin-bottom: 40px;
           text-align: center;
        }
        .page-title {
           font-size: 2.5rem;
           font-weight: 800;
           background: var(--yellow);
           border: var(--border);
           display: inline-block;
           padding: 10px 30px;
           box-shadow: var(--shadow);
           transform: rotate(-1deg);
           margin-bottom: 10px;
        }
        .user-welcome {
           font-size: 1.1rem;
           font-weight: 600;
           color: #555;
        }

        /* GRID LAYOUT */
        .cart-grid-layout {
           display: grid;
           grid-template-columns: 1.5fr 1fr;
           gap: 40px;
           align-items: start;
        }

        /* LEFT: ITEMS */
        .cart-items-section {
           display: flex;
           flex-direction: column;
           gap: 20px;
        }

        .cart-item-card {
           background: var(--white);
           border: var(--border);
           padding: 20px;
           display: flex;
           align-items: center;
           gap: 20px;
           box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
           transition: 0.2s;
           cursor: pointer; /* Indicates it's clickable */
        }
        .cart-item-card:hover {
           transform: translate(-2px, -2px);
           box-shadow: var(--shadow);
        }

        .item-img-box {
           width: 80px; height: 80px;
           border: 2px solid #eee;
           display: flex; align-items: center; justify-content: center;
           padding: 5px;
        }
        .item-img { max-width: 100%; max-height: 100%; object-fit: contain; }

        .item-info { flex: 1; }
        .item-name { font-weight: 700; font-size: 1.1rem; margin-bottom: 5px; }
        .item-price { font-weight: 600; color: #555; }

        .qty-controls {
           display: flex; align-items: center; gap: 10px;
           border: 2px solid var(--black);
           padding: 5px;
           border-radius: 30px;
           margin-right: 15px;
           cursor: default; /* Reset cursor for controls */
        }
        .qty-btn {
           background: none; border: none; cursor: pointer;
           display: flex; align-items: center; justify-content: center;
        }
        .qty-val { font-weight: 800; width: 20px; text-align: center; }

        .btn-remove {
           background: var(--white);
           border: 2px solid var(--red);
           color: var(--red);
           padding: 8px;
           cursor: pointer;
           transition: 0.2s;
        }
        .btn-remove:hover { background: var(--red); color: var(--white); }

        /* EMPTY CART */
        .empty-cart {
           background: var(--white);
           border: var(--border);
           padding: 40px;
           text-align: center;
        }
        .btn-go-shop {
           background: var(--black); color: var(--white);
           padding: 10px 20px; border: none; font-weight: 700;
           margin-top: 15px; cursor: pointer;
        }

        /* RIGHT: SUMMARY */
        .summary-card {
           background: var(--white);
           border: var(--border);
           padding: 30px;
           box-shadow: var(--shadow);
           position: sticky;
           top: 100px;
        }

        .summary-title { font-weight: 800; font-size: 1.5rem; text-align: center; margin-bottom: 20px; }
        .summary-divider { height: 2px; background: #eee; margin-bottom: 20px; }

        .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-weight: 600; }
        .total { font-size: 1.4rem; font-weight: 800; border-top: 2px solid var(--black); padding-top: 15px; }

        /* ADDRESS BOX */
        .address-box {
           background: #f9f9f9;
           border: 2px dashed #ccc;
           padding: 15px;
           margin-bottom: 20px;
        }
        .addr-header { display: flex; align-items: center; gap: 5px; font-weight: 700; margin-bottom: 10px; font-size: 0.9rem; }
        .addr-text { font-size: 0.9rem; color: #555; margin-bottom: 10px; }
        .btn-addr-update {
           font-size: 0.8rem; font-weight: 700; text-decoration: underline;
           background: none; border: none; cursor: pointer; color: var(--black);
        }

        /* CHECKOUT BUTTONS */
        .btn-checkout {
           width: 100%;
           padding: 15px;
           font-weight: 800;
           border: var(--border);
           cursor: pointer;
           display: flex; align-items: center; justify-content: center; gap: 10px;
           margin-bottom: 10px;
           transition: 0.2s;
           box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
        }
        .btn-checkout:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .cod { background: var(--black); color: var(--white); }
        .cod:hover:not(:disabled) { background: var(--purple); box-shadow: var(--shadow-hover); transform: translate(-2px, -2px); }

        .online { background: var(--white); color: var(--black); }
        .online:hover:not(:disabled) { background: var(--yellow); box-shadow: var(--shadow-hover); transform: translate(-2px, -2px); }

        @media (max-width: 900px) {
           .cart-grid-layout { grid-template-columns: 1fr; }
           .summary-card { position: static; }
        }
      `}</style>
    </Layout>
  );
};

export default CartPage;