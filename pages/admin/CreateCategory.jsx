import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
import { LayoutList, Edit, Trash2, PlusCircle } from "lucide-react";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedname, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/category/get-category`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/category/update-category/${selected._id}`,
        { name: updatedname }
      );
      if (data.success) {
        toast.success(data.message);
        setVisible(false);
        setSelected(null);
        getAllCategory();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="Dashboard - Create Category">
      <div className="pop-page-background">
        <div className="pop-container">
          
          {/* HEADER */}
          <div className="dashboard-header">
             <div className="header-title-box">
                <LayoutList size={28} strokeWidth={2.5} />
                <h1>MANAGE CATEGORIES</h1>
             </div>
             <p>Create, update, and remove product categories.</p>
          </div>

          <div className="dashboard-grid">
            
            {/* LEFT: SIDEBAR */}
            <div className="dashboard-sidebar">
              <AdminMenu />
            </div>

            {/* RIGHT: CONTENT */}
            <div className="dashboard-content">
              
              <div className="admin-card">
                 
                 {/* CREATE SECTION */}
                 <div className="card-section create-section">
                    <h3 className="section-title">
                       <PlusCircle size={20} strokeWidth={2.5} /> ADD NEW CATEGORY
                    </h3>
                    <div className="form-wrapper">
                       <CategoryForm
                         handleSubmit={handleSubmit}
                         value={name}
                         setValue={setName}
                       />
                    </div>
                 </div>

                 {/* TABLE SECTION */}
                 <div className="card-section table-section">
                    <h3 className="section-title">EXISTING CATEGORIES</h3>
                    
                    <div className="custom-table-container">
                       <table className="pop-table">
                          <thead>
                             <tr>
                                <th>CATEGORY NAME</th>
                                <th className="action-col">ACTIONS</th>
                             </tr>
                          </thead>
                          <tbody>
                             {categories.map((c) => (
                                <tr key={c._id}>
                                   <td>{c.name}</td>
                                   <td className="action-col">
                                      <button 
                                        className="btn-action edit"
                                        onClick={() => {
                                          setVisible(true);
                                          setUpdatedName(c.name);
                                          setSelected(c);
                                        }}
                                      >
                                        <Edit size={16} /> EDIT
                                      </button>
                                      
                                      <button 
                                        className="btn-action delete"
                                        onClick={() => handleDelete(c._id)}
                                      >
                                        <Trash2 size={16} /> DELETE
                                      </button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>

              </div>

            </div>
          </div>

          {/* ANT DESIGN MODAL */}
          <Modal
            title={<span style={{ fontWeight: 800, textTransform: 'uppercase', fontFamily: 'Space Grotesk' }}>Update Category</span>}
            open={visible}
            footer={null}
            onCancel={() => setVisible(false)}
          >
            <div style={{ paddingTop: '20px' }}>
               <CategoryForm
                 value={updatedname}
                 setValue={setUpdatedName}
                 handleSubmit={handleUpdate}
               />
            </div>
          </Modal>

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
          --shadow: 5px 5px 0px var(--black);
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

        /* GRID */
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
           overflow: hidden;
        }

        .card-section {
           padding: 30px;
        }
        
        .create-section {
           background: var(--off-white);
           border-bottom: var(--border);
        }

        .section-title {
           font-weight: 800;
           font-size: 1.2rem;
           margin-bottom: 20px;
           display: flex; align-items: center; gap: 10px;
        }

        /* TABLE STYLES */
        .custom-table-container {
           overflow-x: auto;
        }

        .pop-table {
           width: 100%;
           border-collapse: collapse;
           font-size: 0.95rem;
        }

        .pop-table th {
           background: var(--black);
           color: var(--white);
           padding: 15px;
           text-align: left;
           font-weight: 700;
           letter-spacing: 1px;
        }

        .pop-table td {
           border-bottom: 2px solid #eee;
           padding: 15px;
           font-weight: 600;
        }

        .pop-table tr:hover td {
           background: #fafafa;
        }

        .action-col {
           text-align: right;
           display: flex;
           gap: 10px;
           justify-content: flex-end;
        }

        /* ACTION BUTTONS */
        .btn-action {
           border: 2px solid var(--black);
           padding: 6px 12px;
           font-weight: 700;
           font-size: 0.8rem;
           cursor: pointer;
           display: flex; align-items: center; gap: 5px;
           box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
           transition: 0.2s;
        }
        
        .btn-action:hover {
           transform: translate(-2px, -2px);
           box-shadow: 4px 4px 0px var(--black);
        }

        .edit { background: var(--yellow); color: var(--black); }
        .delete { background: var(--red); color: var(--white); border-color: var(--black); }

        /* RESPONSIVE */
        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export default CreateCategory;