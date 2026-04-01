import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../components/context/auth";
import { ShieldCheck, User, Mail, Phone, LayoutDashboard } from "lucide-react";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER */}
          <div className="dashboard-header">
             <div className="header-title-box">
                <ShieldCheck size={28} strokeWidth={2.5} />
                <h1>ADMIN PORTAL</h1>
             </div>
             <p>Welcome back, Administrator. Manage your system below.</p>
          </div>

          {/* GRID LAYOUT */}
          <div className="dashboard-grid">
            
            {/* LEFT: SIDEBAR */}
            <div className="dashboard-sidebar">
              <AdminMenu />
            </div>

            {/* RIGHT: CONTENT */}
            <div className="dashboard-content">
              
              <div className="admin-card">
                 <div className="card-header">
                    <h2>ADMINISTRATOR DETAILS</h2>
                    <div className="badge">ACTIVE</div>
                 </div>
                 
                 <div className="card-body">
                    
                    <div className="info-row">
                       <div className="icon-box">
                          <User size={24} strokeWidth={2.5} />
                       </div>
                       <div className="info-data">
                          <span className="label">ADMIN NAME</span>
                          <span className="value">{auth?.user?.name}</span>
                       </div>
                    </div>

                    <div className="info-row">
                       <div className="icon-box">
                          <Mail size={24} strokeWidth={2.5} />
                       </div>
                       <div className="info-data">
                          <span className="label">ADMIN EMAIL</span>
                          <span className="value">{auth?.user?.email}</span>
                       </div>
                    </div>

                    <div className="info-row">
                       <div className="icon-box">
                          <Phone size={24} strokeWidth={2.5} />
                       </div>
                       <div className="info-data">
                          <span className="label">CONTACT NO.</span>
                          <span className="value">{auth?.user?.phone}</span>
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
          --red: #ef4444;
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
           background: var(--black);
           color: var(--white);
           border: var(--border);
           padding: 10px 30px;
           display: inline-flex;
           align-items: center;
           gap: 15px;
           box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
           transform: rotate(-1deg);
           margin-bottom: 10px;
        }

        .header-title-box h1 {
           font-size: 2rem;
           font-weight: 800;
           margin: 0;
           letter-spacing: 1px;
        }

        /* LAYOUT */
        .dashboard-grid {
           display: grid;
           grid-template-columns: 280px 1fr;
           gap: 40px;
           align-items: start;
        }

        /* ADMIN CARD */
        .admin-card {
           background: var(--white);
           border: var(--border);
           box-shadow: var(--shadow);
        }

        .card-header {
           background: var(--yellow);
           padding: 20px;
           border-bottom: var(--border);
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .card-header h2 {
           font-size: 1.2rem;
           font-weight: 800;
           margin: 0;
           text-transform: uppercase;
        }

        .badge {
           background: var(--black);
           color: var(--green);
           font-size: 0.8rem;
           font-weight: 700;
           padding: 4px 10px;
           border-radius: 4px;
        }

        .card-body {
           padding: 30px;
           display: flex;
           flex-direction: column;
           gap: 20px;
        }

        .info-row {
           display: flex;
           align-items: center;
           gap: 20px;
           padding: 15px;
           border: 2px solid #eee;
           transition: 0.2s;
        }
        .info-row:hover {
           border-color: var(--black);
           background: var(--off-white);
           box-shadow: 3px 3px 0px rgba(0,0,0,0.1);
           transform: translateX(5px);
        }

        .icon-box {
           width: 50px; height: 50px;
           background: var(--black);
           color: var(--white);
           border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           flex-shrink: 0;
        }
        
        /* Icon Colors */
        .info-row:nth-child(1) .icon-box { background: var(--purple); }
        .info-row:nth-child(2) .icon-box { background: var(--green); color: var(--black); }
        .info-row:nth-child(3) .icon-box { background: var(--red); }

        .info-data {
           display: flex;
           flex-direction: column;
        }

        .label {
           font-size: 0.75rem;
           font-weight: 800;
           color: #888;
           letter-spacing: 1px;
           margin-bottom: 2px;
        }

        .value {
           font-size: 1.2rem;
           font-weight: 700;
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

export default AdminDashboard;