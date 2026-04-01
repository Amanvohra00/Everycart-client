import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
// Switched to Lucide icons for the new design style
import { User, Mail, Lock, Phone, MapPin, HelpCircle, ArrowRight, UserPlus } from "lucide-react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPssword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    //handlesubmit
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/auth/register`, { name, email, password, phone, address,});
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("soemthing went wrong");
        }
    };

    return (
        <Layout title="Register - Ecommerce">
            <div className="pop-page-background">
                <div className="auth-container">
                    
                    <div className="auth-card">
                        {/* HEADER */}
                        <div className="auth-header">
                            <div className="icon-circle">
                                <UserPlus size={40} strokeWidth={2.5} />
                            </div>
                            <h1 className="auth-title">CREATE ACCOUNT</h1>
                            <p className="auth-subtitle">Join us for a seamless shopping experience</p>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handlesubmit} className="auth-form">
                            
                            {/* NAME */}
                            <div className="form-group">
                                <label className="form-label">FULL NAME</label>
                                <div className="input-wrapper">
                                    <User size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pop-input"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="form-group">
                                <label className="form-label">EMAIL ADDRESS</label>
                                <div className="input-wrapper">
                                    <Mail size={20} className="input-icon" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pop-input"
                                        placeholder="Email Address"
                                        required
                                    />
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="form-group">
                                <label className="form-label">PASSWORD</label>
                                <div className="input-wrapper">
                                    <Lock size={20} className="input-icon" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPssword(e.target.value)}
                                        className="pop-input"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* PHONE */}
                            <div className="form-group">
                                <label className="form-label">PHONE</label>
                                <div className="input-wrapper">
                                    <Phone size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="pop-input"
                                        placeholder="Phone"
                                        required
                                    />
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div className="form-group">
                                <label className="form-label">ADDRESS</label>
                                <div className="input-wrapper">
                                    <MapPin size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="pop-input"
                                        placeholder="Address"
                                        required
                                    />
                                </div>
                            </div>


                            <button type="submit" className="btn-pop-primary">
                                REGISTER <ArrowRight size={20} />
                            </button>

                        </form>

                        {/* FOOTER */}
                        <div className="auth-footer">
                            <p>Already have an account?</p>
                            <Link to="/login" className="link-text">LOGIN HERE</Link>
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
                    max-width: 500px;
                }

                /* --- CARD --- */
                .auth-card {
                    background: var(--white);
                    border: var(--border);
                    padding: 40px;
                    box-shadow: var(--shadow);
                    position: relative;
                    animation: fadeUp 0.6s ease;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
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
                    background: var(--green);
                    color: var(--black);
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
                    text-transform: uppercase;
                }

                .auth-subtitle {
                    color: #666;
                    font-weight: 500;
                    font-size: 0.95rem;
                }

                /* FORM */
                .auth-form {
                    display: flex; flex-direction: column; gap: 15px;
                }

                .form-group { text-align: left; }

                .form-label {
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-bottom: 6px;
                    display: block;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
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
                    background: var(--off-white);
                }
                .pop-input:focus {
                    background: var(--white);
                    box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
                    border-color: var(--purple);
                }

                /* BUTTON */
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
                    margin-top: 15px;
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                }
                .btn-pop-primary:hover {
                    background: var(--purple);
                    color: var(--white);
                    transform: translate(-2px, -2px);
                    box-shadow: var(--shadow-hover);
                }

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
                    padding: 2px 8px;
                    border: 1px solid var(--black);
                    box-shadow: 2px 2px 0px var(--black);
                    text-transform: uppercase;
                    font-size: 0.85rem;
                }
                .link-text:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0px var(--black); }
            `}</style>
        </Layout>
    );
};

export default Register;