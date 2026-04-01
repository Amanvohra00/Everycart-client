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
                  <LogIn size={40} strokeWidth={2.5} />
               </div>
               <h1 className="auth-title">WELCOME BACK</h1>
               <p className="auth-subtitle">Login to access your account.</p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="auth-form">
               
               <div className="form-group">
                  <label className="form-label">EMAIL ADDRESS</label>
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
                  <label className="form-label">PASSWORD</label>
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
                  LOGIN NOW
               </button>

               <button 
                  type="button" 
                  onClick={() => navigate('/forgot-password')} 
                  className="btn-pop-secondary"
               >
                  <KeyRound size={16} /> FORGOT PASSWORD?
               </button>

            </form>

            {/* FOOTER */}
            <div className="auth-footer">
               <p>Don't have an account?</p>
               <Link to="/register" className="link-text">REGISTER HERE</Link>
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
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: var(--font);
        }

        .auth-container {
           width: 100%;
           max-width: 450px;
        }

        /* --- AUTH CARD --- */
        .auth-card {
           background: var(--white);
           border: var(--border);
           padding: 40px;
           box-shadow: var(--shadow);
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
           width: 70px; height: 70px;
           background: var(--yellow);
           border: var(--border);
           border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           margin-bottom: 15px;
           box-shadow: 3px 3px 0px var(--black);
        }

        .auth-title {
           font-size: 2rem;
           font-weight: 800;
           margin-bottom: 5px;
           letter-spacing: -1px;
        }

        .auth-subtitle {
           color: #666;
           font-weight: 500;
        }

        /* FORM */
        .auth-form {
           display: flex; flex-direction: column; gap: 20px;
        }

        .form-group { text-align: left; }

        .form-label {
           font-size: 0.85rem;
           font-weight: 700;
           margin-bottom: 8px;
           display: block;
           text-transform: uppercase;
        }

        .input-wrapper { position: relative; }

        .input-icon {
           position: absolute;
           left: 12px;
           top: 50%;
           transform: translateY(-50%);
           color: var(--black);
        }

        .pop-input {
           width: 100%;
           padding: 12px 12px 12px 40px;
           border: var(--border);
           font-family: var(--font);
           font-weight: 600;
           font-size: 1rem;
           outline: none;
           transition: 0.2s;
        }
        .pop-input:focus {
           background: #fafafa;
           box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
        }

        /* BUTTONS */
        .btn-pop-primary {
           width: 100%;
           background: var(--black);
           color: var(--white);
           padding: 14px;
           font-weight: 700;
           font-size: 1rem;
           border: var(--border);
           cursor: pointer;
           box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
           transition: 0.2s;
           margin-top: 10px;
        }
        .btn-pop-primary:hover {
           background: var(--purple);
           color: var(--white);
           transform: translate(-2px, -2px);
           box-shadow: var(--shadow-hover);
        }

        .btn-pop-secondary {
           width: 100%;
           background: transparent;
           border: none;
           font-family: var(--font);
           font-weight: 600;
           font-size: 0.9rem;
           cursor: pointer;
           color: #555;
           display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .btn-pop-secondary:hover { color: var(--black); text-decoration: underline; }

        /* FOOTER */
        .auth-footer {
           margin-top: 30px;
           text-align: center;
           font-size: 0.95rem;
           font-weight: 500;
           border-top: 2px solid #eee;
           padding-top: 20px;
        }

        .link-text {
           display: inline-block;
           margin-left: 5px;
           color: var(--black);
           font-weight: 800;
           text-decoration: none;
           background: var(--yellow);
           padding: 2px 6px;
           border: 1px solid var(--black);
           box-shadow: 2px 2px 0px var(--black);
        }
        .link-text:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0px var(--black); }

      `}</style>
    </Layout>
  );
};

export default Login;