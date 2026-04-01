import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import { PlusCircle, Edit, Trash2, Layers } from "lucide-react";

const CreateSubCategory = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    /* ======================
       GET ALL CATEGORIES
    ====================== */
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/category/get-category`
            );
            if (data?.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            toast.error("Failed to load categories");
        }
    };

    /* ======================
       GET ALL SUBCATEGORIES
    ====================== */
    const getSubCategories = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/subc/get-subcategory`
            );
            if (data?.success) {
                setSubCategories(data.subCategories);
            }
        } catch (error) {
            toast.error("Failed to load subcategories");
        }
    };

    useEffect(() => {
        getAllCategories();
        getSubCategories();
    }, []);

    /* ======================
       CREATE SUBCATEGORY
    ====================== */
    const handleCreate = async (e) => {
        e.preventDefault();

        if (!name || !categoryId) {
            return toast.error("All fields are required");
        }

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API}/subc/create-subcategory`,
                {
                    name,
                    category: categoryId,
                }
            );

            if (data?.success) {
                toast.success("Subcategory created successfully");
                setName("");
                setCategoryId("");
                getSubCategories();
            }
        } catch (error) {
            toast.error("Create failed");
        }
    };

    /* ======================
       UPDATE SUBCATEGORY
    ====================== */
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_API}/subc/update-subcategory/${selected._id}`,
                {
                    name: updatedName,
                }
            );

            if (data?.success) {
                toast.success("Subcategory updated");
                setVisible(false);
                setSelected(null);
                getSubCategories();
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    /* ======================
       DELETE SUBCATEGORY
    ====================== */
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                `${import.meta.env.VITE_API}/subc/delete-subcategory/${id}`
            );

            if (data?.success) {
                toast.success("Subcategory deleted");
                getSubCategories();
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <Layout title="Dashboard - SubCategory">
            <div className="pop-page-background">
                <div className="pop-container">

                    {/* HEADER */}
                    <div className="dashboard-header">
                        <div className="header-title-box">
                            <Layers size={28} strokeWidth={2.5} />
                            <h1>MANAGE SUBCATEGORIES</h1>
                        </div>
                        <p>Create, update and manage subcategories</p>
                    </div>

                    <div className="dashboard-grid">
                        {/* SIDEBAR */}
                        <div className="dashboard-sidebar">
                            <AdminMenu />
                        </div>

                        {/* CONTENT */}
                        <div className="dashboard-content">
                            <div className="admin-card">

                                {/* CREATE SECTION */}
                                <div className="card-section create-section">
                                    <h3 className="section-title">
                                        <PlusCircle size={20} strokeWidth={2.5} /> ADD SUBCATEGORY
                                    </h3>

                                    <form onSubmit={handleCreate} className="pop-form-wrapper">
                                        <select
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            className="pop-select"
                                        >
                                            <option value="">Select Parent Category</option>
                                            {categories.map((c) => (
                                                <option key={c._id} value={c._id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="text"
                                            placeholder="Subcategory name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pop-input"
                                        />

                                        <button className="pop-btn-save">
                                            <PlusCircle size={18} strokeWidth={2.5} /> CREATE SUBCAT
                                        </button>
                                    </form>
                                </div>

                                {/* TABLE SECTION */}
                                <div className="card-section table-section">
                                    <h3 className="section-title">EXISTING SUBCATEGORIES</h3>

                                    <div className="custom-table-container">
                                        <table className="pop-table">
                                            <thead>
                                                <tr>
                                                    <th>SUBCATEGORY</th>
                                                    <th>PARENT CATEGORY</th>
                                                    <th className="action-col">ACTIONS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subcategories.map((s) => (
                                                    <tr key={s._id}>
                                                        <td className="bold-cell">{s.name}</td>
                                                        <td>{s.category?.name}</td>
                                                        <td className="action-col">
                                                            <button
                                                                className="btn-action edit"
                                                                onClick={() => {
                                                                    setVisible(true);
                                                                    setUpdatedName(s.name);
                                                                    setSelected(s);
                                                                }}
                                                            >
                                                                <Edit size={14} /> EDIT
                                                            </button>

                                                            <button
                                                                className="btn-action delete"
                                                                onClick={() => handleDelete(s._id)}
                                                            >
                                                                <Trash2 size={14} /> DELETE
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

                    {/* UPDATE MODAL OVERRIDE FOR ANTD */}
                    <Modal
                        title={<span style={{ fontWeight: 800, textTransform: 'uppercase', fontFamily: 'Space Grotesk' }}>Update Subcategory</span>}
                        open={visible}
                        footer={null}
                        onCancel={() => setVisible(false)}
                    >
                        <form onSubmit={handleUpdate} style={{ paddingTop: '15px' }}>
                            <input
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                className="pop-input"
                                style={{ width: '100%', marginBottom: '15px' }}
                            />
                            <button className="pop-btn-save" style={{ width: '100%' }}>
                                UPDATE
                            </button>
                        </form>
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
                    text-transform: uppercase;
                }

                /* FORM ELEMENTS */
                .pop-form-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .pop-select, .pop-input {
                    width: 100%;
                    padding: 15px;
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--black);
                    background-color: var(--white);
                    border: var(--border);
                    outline: none;
                    transition: all 0.2s ease;
                    font-family: var(--font);
                }

                .pop-select { cursor: pointer; }

                .pop-input:focus, .pop-select:focus {
                    background-color: #fafafa;
                    box-shadow: 4px 4px 0px var(--purple);
                }

                .pop-btn-save {
                    width: fit-content;
                    padding: 15px 30px;
                    background-color: var(--black);
                    color: var(--white);
                    border: var(--border);
                    font-size: 1rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s ease;
                    box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
                }

                .pop-btn-save:hover {
                    background-color: var(--green);
                    color: var(--black);
                    transform: translate(-3px, -3px);
                    box-shadow: 6px 6px 0px var(--black);
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
                    text-transform: uppercase;
                }

                .pop-table td {
                    border-bottom: 2px solid #eee;
                    padding: 15px;
                    font-weight: 500;
                }

                .bold-cell {
                    font-weight: 800 !important;
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
                    .pop-btn-save { width: 100%; justify-content: center; }
                }
            `}</style>
        </Layout>
    );
};

export default CreateSubCategory;