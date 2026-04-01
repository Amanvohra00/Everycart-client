import React from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../components/context/auth";
import { User, Mail, MapPin, LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* PAGE HEADER */}
          <div className="dashboard-header">
             <div className="header-title-box">
                <LayoutDashboard size={28} strokeWidth={2.5} />
                <h1>USER DASHBOARD</h1>
             </div>
             <p>Manage your account and view your details.</p>
          </div>

          <div className="dashboard-grid">
            
            {/* LEFT: SIDEBAR MENU */}
            <div className="dashboard-sidebar">
              <UserMenu />
            </div>

            {/* RIGHT: CONTENT AREA */}
            <div className="dashboard-content">
              
              <div className="profile-card">
                 <div className="card-header">
                    <h2>ACCOUNT DETAILS</h2>
                 </div>
                 
                 <div className="card-body">
                    
                    <div className="info-item">
                       <div className="icon-box">
                          <User size={24} strokeWidth={2.5} />
                       </div>
                       <div className="info-text">
                          <label>FULL NAME</label>
                          <h3>{auth?.user?.name}</h3>
                       </div>
                    </div>

                    <div className="info-item">
                       <div className="icon-box">
                          <Mail size={24} strokeWidth={2.5} />
                       </div>
                       <div className="info-text">
                          <label>EMAIL ADDRESS</label>
                          <h3>{auth?.user?.email}</h3>
                       </div>
                    </div>

                    <div className="info-item">
                       <div className="icon-box">
                          <MapPin size={24} strokeWidth={2.5} />
                       </div>
                       <div className="info-text">
                          <label>CURRENT ADDRESS</label>
                          <h3>{auth?.user?.address || "No address provided"}</h3>
                       </div>
                    </div>

                 </div>
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

        /* PROFILE CARD */
        .profile-card {
           background: var(--white);
           border: var(--border);
           box-shadow: var(--shadow);
        }

        .card-header {
           background: var(--yellow);
           padding: 15px 25px;
           border-bottom: var(--border);
        }

        .card-header h2 {
           font-size: 1.2rem;
           font-weight: 800;
           margin: 0;
           letter-spacing: 1px;
        }

        .card-body {
           padding: 30px;
           display: flex;
           flex-direction: column;
           gap: 25px;
        }

        /* INFO ITEMS */
        .info-item {
           display: flex;
           align-items: center;
           gap: 20px;
           padding: 15px;
           border: 2px solid #eee;
           transition: 0.2s;
        }
        .info-item:hover {
           border-color: var(--black);
           background: var(--off-white);
           transform: translateX(5px);
           box-shadow: 3px 3px 0px rgba(0,0,0,0.1);
        }

        .icon-box {
           width: 50px; height: 50px;
           background: var(--black);
           color: var(--white);
           display: flex; align-items: center; justify-content: center;
           border-radius: 50%;
           flex-shrink: 0;
        }
        
        /* Specific colors for icons */
        .info-item:nth-child(1) .icon-box { background: var(--purple); color: var(--white); }
        .info-item:nth-child(2) .icon-box { background: var(--green); color: var(--black); }
        .info-item:nth-child(3) .icon-box { background: var(--black); color: var(--yellow); }

        .info-text {
           display: flex;
           flex-direction: column;
        }

        .info-text label {
           font-size: 0.75rem;
           font-weight: 700;
           color: #888;
           letter-spacing: 1px;
           margin-bottom: 2px;
        }

        .info-text h3 {
           font-size: 1.2rem;
           font-weight: 700;
           margin: 0;
           color: var(--black);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;