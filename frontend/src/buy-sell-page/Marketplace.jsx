import React, { useState, useEffect} from "react";
import EditSellForm from './EditSellForm';
import EditBuyForm from './EditBuyForm';
import { useNavigate } from "react-router-dom";
import { getTimeAgo } from '../utils/timeUtils';
import {Link} from "react-router-dom" 
function BuyAndSell() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitloading, setsubmitloading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
 const navigate = useNavigate();
  // Load items from backend
  useEffect(() => {
    async function loadItems() {
      try {
        const sellRes = await fetch(`${import.meta.env.VITE_API_URL}/sell`);
        const buyRes = await fetch(`${import.meta.env.VITE_API_URL}/buy`);
        if (!sellRes.ok || !buyRes.ok) throw new Error(`Server error`);
        const sellItems = await sellRes.json();
        const buyItems = await buyRes.json();
        
      
        const sellWithType = sellItems.map(item => ({...item, type: 'sell'}));
        const buyWithType = buyItems.map(item => ({...item, type: 'buy'}));
        
        setItems([...sellWithType, ...buyWithType]);
      } catch (err) {
        console.error(err);
        setError("Failed to load items. Please try again later.");
      } finally {
        setLoading(false);
        
      }
    }
    loadItems();
  }, []);

  
  const confirmERP = (expectedERP) => {
    const userERP = prompt("Enter your ERP ID to continue:");
    if (!userERP) return false;
    return userERP.trim() === expectedERP.trim();
  };
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    contact: "",
    image: null,
    type: "sell",
    erp:"",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setsubmitloading(true);
    
    try {
      
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('contact', form.contact);
      formData.append('erp', form.erp); 
      
      
      if (form.image) {
        formData.append('image', form.image);
      }
      
      // Send to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${form.type}`, {
        method: 'POST',
        body: formData,
      });
     
      if (response.ok) {
        const newItem = await response.json();
        setItems([newItem, ...items]);
        alert(`${form.type === 'sell' ? 'Item posted for sale' : 'Buy request posted'} successfully!`);
       
        setForm({
          title: "",
          description: "",
          price: "",
          contact: "",
          erp: "",
          image: null,
          type: "sell",
        });
        setPreview(null);
        setShowForm(false);
       setsubmitloading(false);
        
      } else {
        alert('Failed to post item. Please try again.');
      setsubmitloading(false);
      }
    } catch (error) {
      console.error('Error posting item:', error);
      setsubmitloading(false);
      alert('Error posting item. Please try again.');
    }
  };

  const handleEdit = (item)=>{
    if (!confirmERP(item.erp)) {
      alert("ERP does not match. You are not authorized to edit this post.");
      return;
    }
    setEditingItem(item);
  };

  // Delete handler with authentication
  const handleDelete = async (id, itemERP, itemType) =>{
    if (!confirmERP(itemERP)) {
      alert("ERP does not match. You are not authorized to delete this post.");
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const endpoint = itemType === 'sell' ? 'sell' : 'buy';
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(prev => prev.filter(item => item._id !== id));
      } else {
        const errData = await response.json();
        alert(`Failed to delete: ${errData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Error deleting item. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Handle save after edit
  const handleSave = (updatedItem) => {
    setIsSaving(true);

    setTimeout(() => {
      setItems(prev =>
        prev.map(item => item._id === updatedItem._id ? {...updatedItem, type: item.type} : item)
      );
      setEditingItem(null);
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="container py-3 py-md-5">
      <h2 className="mb-3 mb-md-4 text-success fw-bold text-center">UU Buy & Sell Marketplace</h2>
      <p className="text-muted text-center mb-3 mb-md-4">
        Buy or sell books, gadgets, and student essentials. Post your item or browse listings below!
      </p>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4">
        <Link className="btn btn-outline-danger btn-lg" to="/"> ← Back to Main Page </Link>
        <button
          className="btn btn-primary fw-bold"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Post an Item"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="shadow p-4 rounded bg-white mb-5"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <h5 className="mb-3 fw-semibold">Post Your Item</h5>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="sell">Sell</option>
              <option value="buy">Buy</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Physics Textbook"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              placeholder="Describe the item, condition, etc."
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{form.type==="sell"?"Price":"Price (Optional)"}</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. ₹200 or Negotiable"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Us</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Email or phone number"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ERP ID</label>
            <input
              type="text"
              className="form-control"
              name="erp"
              value={form.erp}
              onChange={handleChange}
              placeholder="Your ERP ID"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image (optional)</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 rounded"
                style={{ maxWidth: "100%", maxHeight: 180 }}
              />
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold" disabled={submitloading}>
            {submitloading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            'Post Item'
          )}



          </button>
        </form>
      )}

      {/* Loading overlay */}
      {deletingId && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
          style={{ zIndex: 9999, backdropFilter: "blur(5px)" }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Deleting...</span>
          </div>
          &nbsp;&nbsp;
          <div className="fw-bold text-danger fs-5">Deleting the post...</div>
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading items...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row g-3 g-md-4">
          {items.length === 0 && (
            <div className="col-12 text-center text-muted">No items posted yet.</div>
          )}
          {items.map((item) => (
            <div className="col-12 col-sm-6 col-md-4" key={item._id || item.id}>
              <div className="card shadow-sm h-100">
                <img
                  src={item.image || 
                    (item.type === "sell"
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFs4xa_05ZRIvnlM2c7cVV43td4VHNubEuWw&s"
                      : "https://grafkom.io/wp-content/uploads/2021/01/wanttobuy.jpg")
                  }
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "250px", objectFit: "" }}
                />
                
                <div className="card-body">
                  <span
                    className={`badge mb-2 ${
                      item.type === "sell" ? "bg-primary" : "bg-warning text-dark"
                    }`}
                  >
                    {item.type === "sell" ? "For Sale" : "Wanted"}
                  </span>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <div className="mb-2 fw-semibold text-success">Price: {item.price}</div>
                  <div className="mb-2 small text-muted">
                    <span className="fw-semibold">Contact:</span> {item.contact}
                  </div>
                  <div className="mb-2 small text-muted d-flex align-items-center">
                    <i className="fas fa-clock me-1"></i>
                    <span>Posted {getTimeAgo(item.posted_at)}</span>
                  </div>
                  {/* Add Edit and Delete buttons below each post */}
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(item._id, item.erp, item.type)}
                      disabled={deletingId === item._id}
                    >
                      {deletingId === item._id ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        'Delete'
                      )}
                    </button>
                    
                  </div>
                  <a href={`tel:${item.contact}`}>
                <button className={`btn btn-primary btn-sm mt-3`}>
                 Contact Owner
                </button></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editingItem && (
        editingItem.type === 'sell' ? (
          <EditSellForm
            item={editingItem}
            onClose={() => setEditingItem(null)}
            onSave={handleSave}
          />
        ) : (
          <EditBuyForm
            item={editingItem}
            onClose={() => setEditingItem(null)}
            onSave={handleSave}
          />
        )
      )}

      <footer className="mt-5 text-center text-muted small">
        &copy; {new Date().getFullYear()} © 2025 Priyanshu Rawat, BCA. All rights reserved.
      </footer>
    </div>
  );
}

export default BuyAndSell;