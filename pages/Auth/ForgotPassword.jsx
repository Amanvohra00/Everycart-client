import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, KeyRound, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Step 1: send OTP
  const handleSendOtp = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/forgot-password`, { email });
      if (data.success) {
        toast.success(data.message);
        setStep(2);
      } else toast.error(data.message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Step 2: verify OTP
  const handleVerifyOtp = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/verify-otp`, { email, otp });
      if (data.success) {
        toast.success(data.message);
        setStep(3);
      } else toast.error(data.message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Step 3: reset password
  const handleResetPassword = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/reset-password`, { email, newPassword });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else toast.error(data.message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Forgot Password - Ecommerce">
      <div className="pop-page-background">
        <div className="auth-container">
          
          <div className="auth-card">
            
            {/* DYNAMIC HEADER BASED ON STEP */}
            <div className="auth-header">
               <div className="icon-circle">
                  {step === 1 && <Mail size={36} strokeWidth={2.5} />}
                  {step === 2 && <ShieldCheck size={36} strokeWidth={2.5} />}
                  {step === 3 && <KeyRound size={36} strokeWidth={2.5} />}
               </div>
               <h1 className="auth-title">
                  {step === 1 && "FORGOT PASSWORD"}
                  {step === 2 && "VERIFY OTP"}
                  {step === 3 && "RESET PASSWORD"}
               </h1>
               <p className="auth-subtitle">
                  {step === 1 && "Enter your email to receive a secure code."}
                  {step === 2 && "Enter the verification code sent to you."}
                  {step === 3 && "Secure your account with a new password."}
               </p>
            </div>

            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <div className="auth-form">
                <div className="form-group">
                   <label className="form-label">EMAIL ADDRESS</label>
                   <div className="input-wrapper">
                      <Mail size={20} className="input-icon" />
                      <input 
                        className="pop-input"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="name@example.com" 
                      />
                   </div>
                </div>
                <button className="btn-pop-primary step-1-btn" onClick={handleSendOtp}>
                  SEND OTP <ArrowRight size={20} />
                </button>
              </div>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <div className="auth-form">
                <div className="form-group">
                   <label className="form-label">SECURITY CODE (OTP)</label>
                   <div className="input-wrapper">
                      <KeyRound size={20} className="input-icon" />
                      <input 
                        className="pop-input otp-input"
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        placeholder="••••••" 
                        maxLength={6}
                      />
                   </div>
                </div>
                <button className="btn-pop-primary step-2-btn" onClick={handleVerifyOtp}>
                  VERIFY OTP <ShieldCheck size={20} />
                </button>
              </div>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === 3 && (
              <div className="auth-form">
                <div className="form-group">
                   <label className="form-label">NEW PASSWORD</label>
                   <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input 
                        className="pop-input"
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Enter new password" 
                        type="password" 
                      />
                   </div>
                </div>
                <button className="btn-pop-primary step-3-btn" onClick={handleResetPassword}>
                  UPDATE PASSWORD <Lock size={20} />
                </button>
              </div>
            )}

            {/* BACK TO LOGIN LINK */}
            {step === 1 && (
                <div className="auth-footer">
                    <p>Remember your password?</p>
                    <button className="btn-link" onClick={() => navigate("/login")}>
                        BACK TO LOGIN
                    </button>
                </div>
            )}

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
          --blue: #3b82f6;
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
           font-size: 1.8rem;
           font-weight: 800;
           margin-bottom: 5px;
           letter-spacing: -0.5px;
        }

        .auth-subtitle {
           color: #666;
           font-weight: 500;
           font-size: 0.95rem;
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
        
        .otp-input {
           letter-spacing: 4px;
           font-size: 1.2rem;
        }

        /* BUTTONS */
        .btn-pop-primary {
           width: 100%;
           color: var(--white);
           padding: 14px;
           font-weight: 700;
           font-size: 1rem;
           border: var(--border);
           cursor: pointer;
           box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
           transition: 0.2s;
           margin-top: 10px;
           display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .btn-pop-primary:hover {
           color: var(--black);
           transform: translate(-2px, -2px);
           box-shadow: var(--shadow-hover);
        }

        /* Dynamic Button Colors */
        .step-1-btn { background: var(--black); }
        .step-1-btn:hover { background: var(--yellow); }
        
        .step-2-btn { background: var(--black); }
        .step-2-btn:hover { background: var(--blue); }
        
        .step-3-btn { background: var(--black); }
        .step-3-btn:hover { background: var(--green); }

        /* FOOTER */
        .auth-footer {
           margin-top: 30px;
           text-align: center;
           font-size: 0.95rem;
           font-weight: 500;
           border-top: 2px solid #eee;
           padding-top: 20px;
        }

        .btn-link {
           display: inline-block;
           margin-top: 10px;
           color: var(--black);
           font-weight: 800;
           text-decoration: none;
           background: var(--off-white);
           padding: 4px 10px;
           border: 1px solid var(--black);
           box-shadow: 2px 2px 0px var(--black);
           cursor: pointer;
           font-family: var(--font);
        }
        .btn-link:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0px var(--black); background: var(--white); }

      `}</style>
    </Layout>
  );
};

export default ForgotPassword;