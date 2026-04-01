import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/auth";
import { useCart } from "../components/context/Cart";
import Layout from "../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

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
    <Layout>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Payment Page</h1>

        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cart.map((item) => (
                <div key={item.product._id} className="row mb-3 p-3 border rounded">
                  <div className="col-md-2">
                    <img
                      src={`http://localhost:8080${item.product.photo}`}
                      alt={item.product.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6">
                    <h5>{item.product.name}</h5>
                    <p>Price: {item.product.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <h3>Order Summary</h3>
              <hr />
              <p>Total Amount: ₹{TotalAmount()}</p>
              <p>Payment Mode: Dummy Online Payment</p>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Processing Payment..." : "Pay Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PaymentPage;
