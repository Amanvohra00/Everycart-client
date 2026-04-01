import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2, UploadCloud, Tag, FileText, DollarSign, Archive, Truck } from "lucide-react";

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [subcategory, setSubcategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/product/single-product/${params.slug}`
            );

            const p = data.product;

            setId(p._id);
            setName(p.name);
            setDescription(p.description);
            setPrice(p.price);
            setQuantity(p.quantity);
            setShipping(String(p.shipping));
            setPhoto(p.photo);

            if (p.subcategory) {
                // ✅ subcategory product
                setCategory(p.subcategory.category._id);
                setSubcategory(p.subcategory._id);

                // load subcategories of parent
                getSubCategories(p.subcategory.category._id);
            } else {
                // ✅ old category-only product
                setCategory(p.category?._id);
                setSubcategory("");

                // 🔥 THIS WAS MISSING
                if (p.category?._id) {
                    getSubCategories(p.category._id);
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/category/get-category`);
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //getsubcat
    const getSubCategories = async (categoryId) => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/subc/get-subcategory/${categoryId}`
            );

            if (data?.success) {
                setSubcategories(data.subCategories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            if (subcategory) {
                productData.append("subcategory", subcategory);
            }
            productData.append("shipping", shipping);
            const { data } = await axios.put(
                `${import.meta.env.VITE_API}/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.success(data?.message);
                navigate("/dashboard/admin/products");
            } else {
                toast.message("Product not updated");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    //delete a product
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `${import.meta.env.VITE_API}/product/delete-product/${id}`
            );
            toast.success("Product Deleted Successfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Update Product"}>
            <div className="pop-page-background">
                <div className="pop-container">

                    {/* HEADER */}
                    <div className="dashboard-header">
                        <div className="header-title-box">
                            <Edit size={28} strokeWidth={2.5} />
                            <h1>UPDATE PRODUCT</h1>
                        </div>
                        <p>Edit details or remove inventory items.</p>
                    </div>

                    <div className="dashboard-grid">

                        {/* LEFT: SIDEBAR */}
                        <div className="dashboard-sidebar">
                            <AdminMenu />
                        </div>

                        {/* RIGHT: FORM */}
                        <div className="dashboard-content">
                            <div className="admin-card">

                                {/* CATEGORY SELECT */}
                                <div className="form-section">
                                    <label className="section-label"><Tag size={18} /> CATEGORY</label>
                                    <div className="custom-select-wrapper">
                                        <Select
                                            bordered={false}
                                            placeholder="Select a category"
                                            size="large"
                                            showSearch
                                            className="ant-select-custom"
                                            value={category}
                                            onChange={(value) => {
                                                setCategory(value);
                                                setSubcategory(""); // reset
                                                getSubCategories(value);
                                            }}
                                        >
                                            {categories?.map((c) => (
                                                <Option key={c._id} value={c._id}>
                                                    {c.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                {subcategories.length > 0 && (
                                    <div className="form-section">
                                        <label className="section-label">SUBCATEGORY</label>

                                        <div className="custom-select-wrapper">
                                            <Select
                                                bordered={false}
                                                placeholder="Select subcategory (optional)"
                                                size="large"
                                                className="ant-select-custom"
                                                value={subcategory || undefined}
                                                onChange={(value) => setSubcategory(value)}
                                                allowClear
                                            >
                                                {subcategories.map((sc) => (
                                                    <Option key={sc._id} value={sc._id}>
                                                        {sc.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* IMAGE UPLOAD & PREVIEW */}
                                <div className="form-section">
                                    <label className="section-label"><UploadCloud size={18} /> PRODUCT IMAGE</label>

                                    <div className="image-edit-row">
                                        <div className="current-image-box">
                                            {/* YOUR EXACT LOGIC FOR IMAGE DISPLAY */}

                                            <img
                                                src={
                                                    photo instanceof File
                                                        ? URL.createObjectURL(photo)
                                                        : `${import.meta.env.VITE_API_UPLOAD}${photo}`
                                                }
                                                alt="product_photo"
                                                className="preview-img"
                                            />
                                        </div>

                                        <div className="upload-container small">
                                            <label className="upload-box">
                                                <span>{photo ? photo.name : "CHANGE PHOTO"}</span>
                                                <input
                                                    type="file"
                                                    name="photo"
                                                    accept="image/*"
                                                    onChange={(e) => setPhoto(e.target.files[0])}
                                                    hidden
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* BASIC DETAILS */}
                                <div className="form-section">
                                    <label className="section-label"><FileText size={18} /> DETAILS</label>

                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="Product Name"
                                        className="pop-input mb-4"
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <textarea
                                        value={description}
                                        placeholder="Product Description"
                                        className="pop-input area mb-4"
                                        rows="4"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                {/* PRICING & INVENTORY */}
                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label className="section-label"><DollarSign size={18} /> PRICE</label>
                                        <input
                                            type="number"
                                            value={price}
                                            placeholder="Price"
                                            className="pop-input"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="section-label"><Archive size={18} /> QUANTITY</label>
                                        <input
                                            type="number"
                                            value={quantity}
                                            placeholder="Quantity"
                                            className="pop-input"
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* SHIPPING */}
                                <div className="form-section mt-4">
                                    <label className="section-label"><Truck size={18} /> SHIPPING</label>
                                    <div className="custom-select-wrapper">
                                        <Select
                                            bordered={false}
                                            placeholder="Select Shipping"
                                            size="large"
                                            className="ant-select-custom"
                                            onChange={(value) => setShipping(value)}
                                            value={shipping ? "yes" : "No"}
                                        >
                                            <Option value="0">No</Option>
                                            <Option value="1">Yes</Option>
                                        </Select>
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="action-buttons-row">
                                    <button className="btn-action update" onClick={handleUpdate}>
                                        UPDATE PRODUCT
                                    </button>
                                    <button className="btn-action delete" onClick={handleDelete}>
                                        <Trash2 size={18} /> DELETE
                                    </button>
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

                /* CARD */
                .admin-card {
                    background: var(--white);
                    border: var(--border);
                    box-shadow: var(--shadow);
                    padding: 40px;
                }

                .section-label {
                    font-weight: 800;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 10px;
                    color: var(--black);
                }

                /* IMAGE EDIT ROW */
                .image-edit-row {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .current-image-box {
                    width: 150px;
                    height: 150px;
                    border: var(--border);
                    padding: 5px;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .preview-img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }

                .upload-container.small { flex: 1; }

                .upload-box {
                    display: flex;
                    width: 100%;
                    border: 2px dashed var(--black);
                    background: var(--off-white);
                    text-align: center;
                    cursor: pointer;
                    height: 150px;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    transition: 0.2s;
                }
                .upload-box:hover {
                    background: #f0f0f0;
                    border-color: var(--purple);
                }

                /* INPUTS */
                .pop-input {
                    width: 100%;
                    padding: 12px 15px;
                    border: var(--border);
                    font-family: var(--font);
                    font-size: 1rem;
                    font-weight: 500;
                    outline: none;
                    background: var(--white);
                    transition: 0.2s;
                }
                .pop-input:focus {
                    box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
                    border-color: var(--purple);
                }
                .area { resize: vertical; }
                .mb-4 { margin-bottom: 1.5rem; }
                .mt-4 { margin-top: 1.5rem; }

                .form-row-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                /* SELECT */
                .custom-select-wrapper {
                    border: var(--border);
                    background: var(--white);
                }
                .ant-select-custom {
                    width: 100% !important;
                    font-family: var(--font) !important;
                    font-weight: 600;
                }

                /* BUTTONS */
                .action-buttons-row {
                    display: flex;
                    gap: 20px;
                    margin-top: 30px;
                }

                .btn-action {
                    flex: 1;
                    padding: 18px;
                    font-weight: 800;
                    font-size: 1rem;
                    border: var(--border);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: 0.2s;
                    box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
                }

                .btn-action.update {
                    background: var(--black);
                    color: var(--white);
                }
                .btn-action.update:hover {
                    background: var(--green);
                    color: var(--black);
                    transform: translate(-2px, -2px);
                    box-shadow: 6px 6px 0px var(--black);
                }

                .btn-action.delete {
                    background: var(--red);
                    color: var(--white);
                }
                .btn-action.delete:hover {
                    background: #dc2626;
                    transform: translate(-2px, -2px);
                    box-shadow: 6px 6px 0px var(--black);
                }

                @media (max-width: 900px) {
                    .dashboard-grid { grid-template-columns: 1fr; }
                    .form-row-2 { grid-template-columns: 1fr; }
                    .image-edit-row { flex-direction: column; align-items: flex-start; }
                    .upload-box { width: 100%; }
                }
            `}</style>
        </Layout>
    );
};

export default UpdateProduct;