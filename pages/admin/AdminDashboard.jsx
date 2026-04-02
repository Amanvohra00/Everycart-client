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
                <div className="title-icon">
                  <ShieldCheck size={28} strokeWidth={2.5} />
                </div>
                <h1>Admin Portal</h1>
             </div>
             <p className="subtitle">Welcome back, Administrator. Manage your system below.</p>
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
                    <h2>Administrator Details</h2>
                    <div className="badge">ACTIVE</div>
                 </div>
                 
                 <div className="card-body">
                    
                    <div className="info-row">
                       <div className="icon-box">
                          <User size={22} strokeWidth={2.5} />
                       </div>
                       <div className="info-data">
                          <span className="label">Admin Name</span>
                          <span className="value">{auth?.user?.name}</span>
                       </div>
                    </div>

                    <div className="info-row">
                       <div className="icon-box">
                          <Mail size={22} strokeWidth={2.5} />
                       </div>
                       <div className="info-data">
                          <span className="label">Admin Email</span>
                          <span className="value">{auth?.user?.email}</span>
                       </div>
                    </div>

                    <div className="info-row">
                       <div className="icon-box">
                          <Phone size={22} strokeWidth={2.5} />
                       </div>
                       <div className="info-data">
                          <span className="label">Contact No.</span>
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
          padding: 40px 0;
          font-family: var(--font-main);
        }

        .pop-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* HEADER */
        .dashboard-header {
           margin-bottom: 40px;
           display: flex;
           flex-direction: column;
           align-items: flex-start;
        }

        .header-title-box {
           display: flex;
           align-items: center;
           gap: 15px;
           margin-bottom: 8px;
        }

        .title-icon {
           background: var(--color-yellow);
           color: var(--color-dark);
           width: 48px;
           height: 48px;
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .header-title-box h1 {
           font-size: 2rem;
           font-weight: 600;
           margin: 0;
           color: var(--color-dark);
           letter-spacing: -0.5px;
        }

        .subtitle {
           font-size: 1rem;
           color: var(--color-muted);
           margin: 0;
           font-weight: 400;
        }

        /* LAYOUT */
        .dashboard-grid {
           display: grid;
           grid-template-columns: 280px 1fr;
           gap: 30px;
           align-items: start;
        }

        /* ADMIN CARD */
        .admin-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 12px;
           box-shadow: 0 4px 20px rgba(0,0,0,0.02);
           overflow: hidden;
        }

        .card-header {
           background: #ffffff;
           padding: 25px 30px;
           border-bottom: 1px solid var(--color-border);
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .card-header h2 {
           font-size: 1.2rem;
           font-weight: 600;
           margin: 0;
           color: var(--color-dark);
        }

        .badge {
           background: #e8f5e9;
           color: #2e7d32;
           font-size: 0.8rem;
           font-weight: 600;
           padding: 6px 12px;
           border-radius: 20px;
           letter-spacing: 0.5px;
        }

        .card-body {
           padding: 30px;
           display: flex;
           flex-direction: column;
           gap: 15px;
        }

        .info-row {
           display: flex;
           align-items: center;
           gap: 20px;
           padding: 20px;
           border: 1px solid var(--color-border);
           border-radius: 12px;
           background: #ffffff;
           transition: transform 0.2s, box-shadow 0.2s;
        }
        .info-row:hover {
           border-color: var(--color-yellow);
           box-shadow: 0 10px 20px rgba(0,0,0,0.03);
           transform: translateY(-2px);
        }

        .icon-box {
           width: 50px; 
           height: 50px;
           background: #f8f9fa;
           color: var(--color-dark);
           border-radius: 10px;
           display: flex; 
           align-items: center; 
           justify-content: center;
           flex-shrink: 0;
           transition: background 0.2s;
        }
        
        .info-row:hover .icon-box {
           background: var(--color-yellow);
        }

        .info-data {
           display: flex;
           flex-direction: column;
        }

        .label {
           font-size: 0.85rem;
           font-weight: 500;
           color: var(--color-muted);
           margin-bottom: 4px;
        }

        .value {
           font-size: 1.1rem;
           font-weight: 600;
           color: var(--color-dark);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
           .pop-container { padding: 0 20px; }
        }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;