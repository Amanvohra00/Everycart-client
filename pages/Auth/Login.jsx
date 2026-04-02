import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn, KeyRound } from "lucide-react";
import { useAuth } from "../../components/context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/auth/login`, { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify({ user: res.data.user, token: res.data.token }));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <div className="pop-page-background">
        <div className="auth-container">
          
          <div className="auth-card">
            {/* HEADER */}
            <div className="auth-header">
               <div className="icon-circle">
                  <LogIn size={32} strokeWidth={2.5} />
               </div>
               <h1 className="auth-title">Welcome Back</h1>
               <p className="auth-subtitle">Login to access your account.</p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="auth-form">
               
               <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                     <Mail size={20} className="input-icon" />
                     <input
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="name@example.com"
                       required
                       className="pop-input"
                     />
                  </div>
               </div>

               <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                     <Lock size={20} className="input-icon" />
                     <input
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="••••••••"
                       required
                       className="pop-input"
                     />
                  </div>
               </div>

               <button type="submit" className="btn-pop-primary">
                 Login Now
               </button>

               <button 
                  type="button" 
                  onClick={() => navigate('/forgot-password')} 
                  className="btn-pop-secondary"
               >
                  <KeyRound size={16} /> Forgot Password?
               </button>

            </form>

            {/* FOOTER */}
            <div className="auth-footer">
               <p>Don't have an account?</p>
               <Link to="/register" className="link-text">Register Here</Link>
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
          --color-bg-page: #f8f9fa;
          --font-main: 'Poppins', sans-serif;
        }

        .pop-page-background {
          background-color: var(--color-bg-page);
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: var(--font-main);
        }

        .auth-container {
           width: 100%;
           max-width: 420px;
        }

        /* --- AUTH CARD --- */
        .auth-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 16px;
           padding: 40px;
           box-shadow: 0 10px 30px rgba(0,0,0,0.03);
           position: relative;
        }

        /* HEADER */
        .auth-header {
           text-align: center;
           margin-bottom: 30px;
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        .icon-circle {
           width: 64px; 
           height: 64px;
           background: var(--color-yellow);
           color: var(--color-dark);
           border-radius: 16px;
           display: flex; 
           align-items: center; 
           justify-content: center;
           margin-bottom: 20px;
        }

        .auth-title {
           font-size: 1.8rem;
           font-weight: 600;
           color: var(--color-dark);
           margin-bottom: 5px;
           letter-spacing: -0.5px;
        }

        .auth-subtitle {
           color: var(--color-muted);
           font-size: 0.95rem;
           margin: 0;
        }

        /* FORM */
        .auth-form {
           display: flex; 
           flex-direction: column; 
           gap: 20px;
        }

        .form-group { text-align: left; }

        .form-label {
           font-size: 0.85rem;
           font-weight: 500;
           color: var(--color-dark);
           margin-bottom: 8px;
           display: block;
        }

        .input-wrapper { position: relative; }

        .input-icon {
           position: absolute;
           left: 14px;
           top: 50%;
           transform: translateY(-50%);
           color: var(--color-muted);
        }

        .pop-input {
           width: 100%;
           padding: 12px 14px 12px 42px;
           border: 1px solid var(--color-border);
           border-radius: 8px;
           font-family: var(--font-main);
           font-weight: 400;
           font-size: 0.95rem;
           color: var(--color-dark);
           outline: none;
           transition: all 0.2s ease;
           box-sizing: border-box;
        }
        .pop-input::placeholder {
           color: #bbbbbb;
        }
        .pop-input:focus {
           border-color: var(--color-yellow);
           box-shadow: 0 0 0 3px rgba(255, 179, 0, 0.1);
        }

        /* BUTTONS */
        .btn-pop-primary {
           width: 100%;
           background: var(--color-dark);
           color: #ffffff;
           padding: 14px;
           font-weight: 500;
           font-size: 1rem;
           border-radius: 8px;
           border: none;
           cursor: pointer;
           transition: transform 0.2s, box-shadow 0.2s;
           margin-top: 5px;
           font-family: var(--font-main);
        }
        .btn-pop-primary:hover {
           transform: translateY(-2px);
           box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        }

        .btn-pop-secondary {
           width: 100%;
           background: transparent;
           border: none;
           font-family: var(--font-main);
           font-weight: 500;
           font-size: 0.9rem;
           cursor: pointer;
           color: var(--color-muted);
           display: flex; 
           align-items: center; 
           justify-content: center; 
           gap: 6px;
           transition: color 0.2s;
        }
        .btn-pop-secondary:hover { 
           color: var(--color-dark); 
        }

        /* FOOTER */
        .auth-footer {
           margin-top: 30px;
           text-align: center;
           font-size: 0.9rem;
           color: var(--color-muted);
           border-top: 1px solid var(--color-border);
           padding-top: 20px;
           display: flex;
           justify-content: center;
           gap: 5px;
        }

        .link-text {
           color: var(--color-yellow);
           font-weight: 600;
           text-decoration: none;
           transition: color 0.2s;
        }
        .link-text:hover { 
           color: var(--color-dark);
           text-decoration: underline; 
        }

      `}</style>
    </Layout>
  );
};

export default Login;