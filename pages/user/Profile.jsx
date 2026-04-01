import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../components/context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { User, Mail, Phone, MapPin, Lock, Save } from "lucide-react";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API}/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER */}
          <div className="dashboard-header">
             <div className="header-title-box">
                <User size={28} strokeWidth={2.5} />
                <h1>EDIT PROFILE</h1>
             </div>
             <p>Update your personal information below.</p>
          </div>

          <div className="dashboard-grid">
            
            {/* LEFT: SIDEBAR */}
            <div className="dashboard-sidebar">
              <UserMenu />
            </div>

            {/* RIGHT: FORM AREA */}
            <div className="dashboard-content">
              
              <div className="profile-form-card">
                 <form onSubmit={handleSubmit} className="pop-form">
                    
                    {/* NAME */}
                    <div className="form-group">
                       <label>FULL NAME</label>
                       <div className="input-wrapper">
                          <User size={20} className="input-icon" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pop-input"
                            placeholder="Enter Your Name"
                            autoFocus
                          />
                       </div>
                    </div>

                    {/* EMAIL (Disabled) */}
                    <div className="form-group">
                       <label>EMAIL ADDRESS</label>
                       <div className="input-wrapper disabled">
                          <Mail size={20} className="input-icon" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pop-input"
                            placeholder="Enter Your Email"
                            disabled
                          />
                       </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="form-group">
                       <label>NEW PASSWORD</label>
                       <div className="input-wrapper">
                          <Lock size={20} className="input-icon" />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pop-input"
                            placeholder="Leave blank to keep current"
                          />
                       </div>
                    </div>

                    {/* PHONE */}
                    <div className="form-group">
                       <label>PHONE NUMBER</label>
                       <div className="input-wrapper">
                          <Phone size={20} className="input-icon" />
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pop-input"
                            placeholder="Enter Your Phone"
                          />
                       </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="form-group">
                       <label>SHIPPING ADDRESS</label>
                       <div className="input-wrapper">
                          <MapPin size={20} className="input-icon" />
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="pop-input area"
                            placeholder="Enter Your Address"
                            rows="3"
                          />
                       </div>
                    </div>

                    <button type="submit" className="btn-save">
                       <Save size={20} /> UPDATE PROFILE
                    </button>

                 </form>
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
          --green: #4ade80;
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

        /* LAYOUT GRID */
        .dashboard-grid {
           display: grid;
           grid-template-columns: 280px 1fr;
           gap: 40px;
           align-items: start;
        }

        /* FORM CARD */
        .profile-form-card {
           background: var(--white);
           border: var(--border);
           box-shadow: var(--shadow);
           padding: 40px;
        }

        .pop-form {
           display: flex;
           flex-direction: column;
           gap: 20px;
        }

        .form-group label {
           font-weight: 800;
           font-size: 0.9rem;
           margin-bottom: 8px;
           display: block;
           letter-spacing: 0.5px;
        }

        .input-wrapper {
           position: relative;
        }
        
        .input-wrapper.disabled {
           opacity: 0.7;
           cursor: not-allowed;
        }

        .input-icon {
           position: absolute;
           left: 15px;
           top: 15px; /* Centers for regular input */
           color: var(--black);
        }
        
        .input-wrapper .area ~ .input-icon {
           top: 15px; /* Keep at top for textarea */
        }

        .pop-input {
           width: 100%;
           padding: 12px 15px 12px 45px;
           border: var(--border);
           font-family: var(--font);
           font-size: 1rem;
           font-weight: 500;
           background: var(--off-white);
           outline: none;
           transition: 0.2s;
        }
        
        .pop-input:focus {
           background: var(--white);
           box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
           border-color: var(--purple);
        }

        .pop-input:disabled {
           background: #eee;
           color: #666;
           border-color: #ccc;
        }

        /* BUTTON */
        .btn-save {
           margin-top: 10px;
           background: var(--black);
           color: var(--white);
           border: var(--border);
           padding: 15px;
           font-weight: 800;
           font-size: 1.1rem;
           cursor: pointer;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 10px;
           box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
           transition: 0.2s;
        }

        .btn-save:hover {
           background: var(--yellow);
           color: var(--black);
           transform: translate(-2px, -2px);
           box-shadow: var(--shadow-hover);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export default Profile;