import React from "react";
import { LayoutGrid, Save } from "lucide-react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="pop-category-form">
        
        {/* INPUT GROUP */}
        <div className="pop-input-group">
          <LayoutGrid className="input-icon" size={20} strokeWidth={2.5} />
          <input
            type="text"
            className="pop-input"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            required
          />
        </div>

        {/* BUTTON */}
        <button type="submit" className="pop-btn-save">
          <Save size={18} strokeWidth={3} /> SAVE CATEGORY
        </button>

      </form>

      {/* STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap');

        .pop-category-form {
          font-family: 'Space Grotesk', sans-serif;
          width: 100%;
        }

        /* INPUT STYLING */
        .pop-input-group {
          position: relative;
          margin-bottom: 20px;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #000;
          pointer-events: none;
        }

        .pop-input {
          width: 100%;
          padding: 15px 15px 15px 45px; /* Left padding for icon */
          font-size: 1rem;
          font-weight: 600;
          color: #000;
          background-color: #fff;
          border: 2.5px solid #000;
          border-radius: 0; /* Sharp corners */
          outline: none;
          transition: all 0.2s ease;
        }

        .pop-input::placeholder {
          color: #888;
          font-weight: 500;
        }

        /* Input Focus State */
        .pop-input:focus {
          background-color: #fdfbf7; /* Off-white */
          box-shadow: 5px 5px 0px #a855f7; /* Purple shadow */
          border-color: #000;
        }

        /* BUTTON STYLING */
        .pop-btn-save {
          width: 100%;
          padding: 15px;
          background-color: #000;
          color: #fff;
          border: 2.5px solid #000;
          font-size: 1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
          box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
        }

        .pop-btn-save:hover {
          background-color: #4ade80; /* Green accent */
          color: #000;
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0px #000; /* Hard black shadow */
        }

        .pop-btn-save:active {
          transform: translate(0px, 0px);
          box-shadow: 0px 0px 0px #000;
        }
      `}</style>
    </>
  );
};

export default CategoryForm;