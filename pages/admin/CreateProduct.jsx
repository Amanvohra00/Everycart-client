import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PackagePlus, UploadCloud, Archive, Truck, Tag, FileText, IndianRupee } from "lucide-react";

const { Option } = Select;

const CreateProduct = () => {
   const navigate = useNavigate();
   const [categories, setCategories] = useState([]);
   const [subcategories, setSubCategories] = useState([]);
   const [subcategory, setSubCategory] = useState("");
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [photo, setphoto] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("");
   const [quantity, setQuantity] = useState("");
   const [shipping, setShipping] = useState("");

   const getAllCategory = async () => {
      try {
         const { data } = await axios.get(`${import.meta.env.VITE_API}/category/get-category`);
         if (data?.success) {
            setCategories(data?.categories);
         }
      } catch (error) {
         toast.error("Error loading categories");
      }
   };

   useEffect(() => {
      getAllCategory();
   }, []);
   const getSubCategoriesByCategory = async (categoryId) => {
      try {
         const { data } = await axios.get(
            `${import.meta.env.VITE_API}/subc/get-subcategory/${categoryId}`
         );

         if (data?.success) {
            setSubCategories(data.subCategories);
         }
      } catch (error) {
         toast.error("Failed to load subcategories");
      }
   };
   // Create Product
   const handleCreate = async (e) => {
      e.preventDefault();
      try {
         const productData = new FormData();
         productData.append("name", name);
         productData.append("description", description);
         productData.append("price", price);
         productData.append("quantity", quantity);
         productData.append("photo", photo);
         productData.append("category", category);
         productData.append("subcategory", subcategory);
         productData.append("shipping", shipping);

         const { data } = await axios.post(`${import.meta.env.VITE_API}/product/create-product`, productData);

         if (data?.success) {
            toast.success("Product created successfully");
            navigate("/dashboard/admin/products");
         } else {
            toast.error(data?.message);
         }
      } catch (error) {
         console.log(error);
         toast.error("Something went wrong");
      }
   };

   return (
      <Layout title={"Dashboard - Create Product"}>
         <div className="pop-page-background">
            <div className="pop-container">

               {/* HEADER */}
               <div className="dashboard-header">
                  <div className="header-title-box">
                     <PackagePlus size={28} strokeWidth={2.5} />
                     <h1>CREATE PRODUCT</h1>
                  </div>
                  <p>Add new inventory to your store.</p>
               </div>

               <div className="dashboard-grid">

                  {/* LEFT: SIDEBAR */}
                  <div className="dashboard-sidebar">
                     <AdminMenu />
                  </div>

                  {/* RIGHT: FORM */}
                  <div className="dashboard-content">

                     <div className="admin-card">
                        <form onSubmit={handleCreate} className="product-form">

                           {/* CATEGORY SELECT */}
                           <div className="form-section">
                              <label className="section-label"><Tag size={18} /> CATEGORY</label>
                              <div className="custom-select-wrapper">
                                 <Select
                                    bordered={false}
                                    placeholder="Choose a category"
                                    size="large"
                                    showSearch
                                    className="ant-select-custom"
                                    onChange={(value) => {
                                       setCategory(value);
                                       setSubCategory("");        // reset subcategory
                                       getSubCategoriesByCategory(value);
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
                           {/* SUBCATEGORY SELECT */}
                           {subcategories.length > 0 && (
                              <div className="form-section">
                                 <label className="section-label">
                                    <Tag size={18} /> SUBCATEGORY
                                 </label>

                                 <div className="custom-select-wrapper">
                                    <Select
                                       bordered={false}
                                       placeholder="Choose a subcategory"
                                       size="large"
                                       className="ant-select-custom"
                                       value={subcategory}
                                       onChange={(value) => setSubCategory(value)}
                                    >
                                       {subcategories.map((s) => (
                                          <Option key={s._id} value={s._id}>
                                             {s.name}
                                          </Option>
                                       ))}
                                    </Select>
                                 </div>
                              </div>
                           )}

                           {/* IMAGE UPLOAD */}
                           <div className="form-section">
                              <label className="section-label"><UploadCloud size={18} /> PRODUCT IMAGE</label>
                              <div className="upload-container">
                                 <label className="upload-box">
                                    {photo ? (
                                       <div className="upload-preview">
                                          <img src={URL.createObjectURL(photo)} alt="preview" />
                                          <span className="change-text">Click to change image</span>
                                       </div>
                                    ) : (
                                       <div className="upload-placeholder">
                                          <div className="upload-icon-circle">
                                             <UploadCloud size={30} />
                                          </div>
                                          <span>CLICK TO UPLOAD</span>
                                          <small>JPG, PNG, WEBP (Max 5MB)</small>
                                       </div>
                                    )}
                                    <input
                                       type="file"
                                       accept="image/*"
                                       hidden
                                       onChange={(e) => setphoto(e.target.files[0])}
                                    />
                                 </label>
                              </div>
                           </div>

                           {/* BASIC DETAILS */}
                           <div className="form-section">
                              <label className="section-label"><FileText size={18} /> DETAILS</label>

                              <input
                                 type="text"
                                 className="pop-input mb-4"
                                 placeholder="Product Name"
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                              />

                              <textarea
                                 className="pop-input area mb-4"
                                 placeholder="Product Description"
                                 rows="4"
                                 value={description}
                                 onChange={(e) => setDescription(e.target.value)}
                              />
                           </div>

                           {/* PRICING & INVENTORY */}
                           <div className="form-row-2">
                              <div className="form-group">
                                 <label className="section-label"><IndianRupee size={18} /> PRICE</label>
                                 <input
                                    type="number"
                                    className="pop-input"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                 />
                              </div>

                              <div className="form-group">
                                 <label className="section-label"><Archive size={18} /> QUANTITY</label>
                                 <input
                                    type="number"
                                    className="pop-input"
                                    placeholder="0"
                                    value={quantity}
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
                                    placeholder="Shipping Available?"
                                    size="large"
                                    className="ant-select-custom"
                                    onChange={(value) => setShipping(value)}
                                 >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                 </Select>
                              </div>
                           </div>

                           {/* SUBMIT BUTTON */}
                           <button type="submit" className="btn-create-product">
                              CREATE PRODUCT
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

        /* FORM STYLES */
        .product-form {
           display: flex;
           flex-direction: column;
           gap: 25px;
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

        /* UPLOAD BOX */
        .upload-container {
           width: 100%;
        }
        .upload-box {
           display: block;
           width: 100%;
           border: 2px dashed var(--black);
           background: var(--off-white);
           text-align: center;
           cursor: pointer;
           transition: 0.2s;
           min-height: 150px;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        .upload-box:hover {
           background: #f0f0f0;
           border-color: var(--purple);
        }

        .upload-placeholder {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 5px;
           color: #666;
           font-weight: 700;
           padding: 20px;
        }
        .upload-icon-circle {
           width: 50px; height: 50px;
           background: var(--black);
           color: var(--white);
           border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           margin-bottom: 5px;
        }

        .upload-preview {
           width: 100%;
           height: 250px;
           position: relative;
           overflow: hidden;
           background: #fff;
        }
        .upload-preview img {
           width: 100%;
           height: 100%;
           object-fit: contain;
        }
        .change-text {
           position: absolute;
           bottom: 0; left: 0; right: 0;
           background: rgba(0,0,0,0.7);
           color: white;
           padding: 5px;
           font-size: 0.8rem;
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

        /* GRID INPUTS */
        .form-row-2 {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 20px;
        }

        /* CUSTOM SELECT WRAPPER FOR ANTD */
        .custom-select-wrapper {
           border: var(--border);
           background: var(--white);
        }
        /* Override Antd default borderless look to fill our wrapper */
        .ant-select-custom {
           width: 100% !important;
           font-family: var(--font) !important;
           font-weight: 600;
        }
        .ant-select-selector {
           padding: 0 10px !important;
        }

        /* SUBMIT BUTTON */
        .btn-create-product {
           width: 100%;
           padding: 18px;
           background: var(--black);
           color: var(--white);
           font-weight: 800;
           font-size: 1.1rem;
           border: var(--border);
           cursor: pointer;
           margin-top: 20px;
           transition: 0.2s;
           box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
        }
        .btn-create-product:hover {
           background: var(--green);
           color: var(--black);
           transform: translate(-2px, -2px);
           box-shadow: 6px 6px 0px var(--black);
        }

        @media (max-width: 900px) {
           .dashboard-grid { grid-template-columns: 1fr; }
           .form-row-2 { grid-template-columns: 1fr; }
        }
      `}</style>
      </Layout>
   );
};

export default CreateProduct;