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
                <div className="title-icon">
                  <LayoutList size={28} strokeWidth={2.5} />
                </div>
                <h1>Manage Categories</h1>
             </div>
             <p className="subtitle">Create, update, and remove product categories.</p>
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
                       <PlusCircle size={20} strokeWidth={2.5} className="text-yellow" /> Add New Category
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
                    <h3 className="section-title">Existing Categories</h3>
                    
                    <div className="custom-table-container">
                       <table className="pop-table">
                          <thead>
                             <tr>
                                <th>Category Name</th>
                                <th className="action-col">Actions</th>
                             </tr>
                          </thead>
                          <tbody>
                             {categories.map((c) => (
                                <tr key={c._id}>
                                   <td>{c.name}</td>
                                   <td className="action-col">
                                      <div className="action-buttons">
                                        <button 
                                          className="btn-action edit"
                                          onClick={() => {
                                            setVisible(true);
                                            setUpdatedName(c.name);
                                            setSelected(c);
                                          }}
                                        >
                                          <Edit size={16} /> Edit
                                        </button>
                                        
                                        <button 
                                          className="btn-action delete"
                                          onClick={() => handleDelete(c._id)}
                                        >
                                          <Trash2 size={16} /> Delete
                                        </button>
                                      </div>
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
            title={<span style={{ fontWeight: 600, fontFamily: 'Poppins' }}>Update Category</span>}
            open={visible}
            footer={null}
            onCancel={() => setVisible(false)}
            centered
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        :root {
          --color-yellow: #FFB300;
          --color-dark: #222222;
          --color-border: #eaeaea;
          --color-muted: #888888;
          --color-bg-page: #f8f9fa;
          --font-main: 'Poppins', sans-serif;
        }

        .text-yellow { color: var(--color-yellow); }

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

        /* --- HEADER --- */
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

        /* --- GRID --- */
        .dashboard-grid {
           display: grid;
           grid-template-columns: 280px 1fr;
           gap: 30px;
           align-items: start;
        }

        /* --- ADMIN CARD --- */
        .admin-card {
           background: #ffffff;
           border: 1px solid var(--color-border);
           border-radius: 16px;
           box-shadow: 0 4px 20px rgba(0,0,0,0.02);
           overflow: hidden;
        }

        .card-section {
           padding: 35px 40px;
        }
        
        .create-section {
           background: #fcfcfc;
           border-bottom: 1px solid var(--color-border);
        }

        .section-title {
           font-weight: 600;
           font-size: 1.2rem;
           color: var(--color-dark);
           margin-bottom: 25px;
           display: flex; 
           align-items: center; 
           gap: 10px;
        }

        /* --- TABLE STYLES --- */
        .custom-table-container {
           overflow-x: auto;
           border: 1px solid var(--color-border);
           border-radius: 12px;
        }

        .pop-table {
           width: 100%;
           border-collapse: collapse;
           font-size: 0.95rem;
        }

        .pop-table th {
           background: #f8f9fa;
           color: var(--color-dark);
           padding: 16px 20px;
           text-align: left;
           font-weight: 600;
           border-bottom: 1px solid var(--color-border);
        }

        .pop-table td {
           border-bottom: 1px solid var(--color-border);
           padding: 16px 20px;
           font-weight: 500;
           color: var(--color-dark);
           vertical-align: middle;
        }

        .pop-table tr:last-child td {
           border-bottom: none;
        }

        .pop-table tr:hover td {
           background: #fcfcfc;
        }

        .action-col {
           text-align: right;
        }

        .action-buttons {
           display: flex;
           gap: 10px;
           justify-content: flex-end;
        }

        /* --- ACTION BUTTONS --- */
        .btn-action {
           border: none;
           padding: 8px 16px;
           font-weight: 500;
           font-size: 0.85rem;
           border-radius: 8px;
           cursor: pointer;
           display: flex; 
           align-items: center; 
           gap: 6px;
           transition: all 0.2s ease;
           font-family: var(--font-main);
        }
        
        .btn-action:hover {
           transform: translateY(-2px);
           box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .edit { 
           background: #f0f4f8; 
           color: #0d6efd; 
        }
        .edit:hover {
           background: #0d6efd;
           color: #fff;
        }

        .delete { 
           background: #fef0f0; 
           color: #ef4444; 
        }
        .delete:hover {
           background: #ef4444;
           color: #fff;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
           .pop-container { padding: 0 20px; }
           .card-section { padding: 25px 20px; }
        }
      `}</style>
    </Layout>
  );
};

export default CreateCategory;