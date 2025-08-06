import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import EditLostForm from './EditLostForm';
import EditFoundForm from './EditFoundForm';
import { getTimeAgo, formatLostFoundDate } from '../utils/timeUtils';

const LostFoundPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // modal editing state

  useEffect(() => {
    async function loadItems() {
      try {
        const lostRes = await fetch(`${import.meta.env.VITE_API_URL}/lost`);
        const foundRes = await fetch(`${import.meta.env.VITE_API_URL}/found`);
        if (!lostRes.ok || !foundRes.ok) throw new Error(`Server error`);
        const lostItems = await lostRes.json();
        const foundItems = await foundRes.json();
        
        // Add type field to distinguish between lost and found items
        const lostWithType = lostItems.map(item => ({...item, type: 'lost'}));
        const foundWithType = foundItems.map(item => ({...item, type: 'found'}));
        
        setItems([...lostWithType, ...foundWithType]);
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

  //  Edit button handler
  const [isSaving, setIsSaving] = useState(false); // Loader while saving edited post

  const handleEdit = (item) => {
const erpField = item.erp;
      if (!confirmERP(erpField)) {
    alert("ERP ID does not match. You are not authorized to edit this post.");
    return;
  }
    setEditingItem(item);
  };

  // After successful save from modal
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

  // Delete item from server and state
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, itemERP, itemType) => {
 if (!confirmERP(itemERP)) {
    alert("ERP ID does not match. You are not authorized to delete this post.");
    return;
  }

  const confirmed = window.confirm('Are you sure you want to delete this item?');
  if (!confirmed) return;

  setDeletingId(id); //show loader for this item

  try {
    const endpoint = itemType === 'lost' ? 'lost' : 'found';
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
    setDeletingId(null); //  stop showing loader
  }
};


 


  return (
    <>
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

    <div className="container py-3 py-md-5">
      <div className="text-center mb-4 mb-md-5">
        <h1 className="fw-bold text-primary">Lost & Found Portal</h1>
        <p className="lead text-muted mt-3">Welcome to the College Lost & Found page...</p>
        <img src="/images/lf.png" alt="Lost and Found" style={{ maxWidth: "180px" }} className="my-3" />
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-center gap-3 gap-md-4 mb-4 mb-md-5">
        <a href="/" >
          
        </a>
        <Link className="btn btn-outline-danger btn-lg" to="/"> ← Back to Main Page </Link>
        <Link to="/report-lost" className="btn btn-outline-primary btn-lg">
          Report Lost Item
        </Link>
        <Link to="/report-found" className="btn btn-outline-success btn-lg">
          Report Found Item
        </Link>
      </div>

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
          {items.length === 0 && <div className="col-12 text-center text-muted">No items posted yet.</div>}

          {items.map(item => (
          <div className="col-12 col-sm-6 col-md-4" key={item._id || item.id}>
            <div className="card shadow-sm h-100">
              <img
                src={item.image || "/images/default-item.jpg"}
                className="card-img-top"
                alt={item.itemName}
                style={{ objectFit: "", height: "250px" }}
              />
              <div className="card-body">
                <h5 className={`card-title ${item.type === "found" ? "text-success" : "text-danger"}`}>
                  {item.type === "found" ? "Found: " : "Lost: "}{item.itemName}
                </h5>
                <p className="card-text">Description: {item.description}</p>
                <p className="card-text">{item.type === 'found' ? 'Found Location' : 'Lost Location'}: {item.location}</p>
                <p className="card-text">Contact Me: {item.contact}</p>
                <p className="card-text">{item.type === 'found' ? 'Date Found' : 'Date Lost'}: {formatLostFoundDate(item.type === 'found' ? item.dateFound : item.dateLost)}</p>
                <div className="mb-2 small text-muted d-flex align-items-center mt-4">
                  <i className="fas fa-clock me-1"></i>
                  <span>Posted {getTimeAgo(item.posted_at)}</span>
                </div>
                
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item._id, item.erp, item.type)} disabled={deletingId === item._id}>
  {deletingId === item._id ? (
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : ('Delete')}</button>

                </div> 
                <a href={`tel:${item.contact}`}>
                <button className={`btn btn-${item.type === "found" ? "success" : "primary"} btn-sm mt-3`}>
                  {item.type === "found" ? "Claim Item" : "Contact Owner"}
                </button></a>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

    
      {editingItem && (
        editingItem.type === 'lost' ? (
          <EditLostForm
            item={editingItem}
            onClose={() => setEditingItem(null)}
            onSave={handleSave}
          />
        ) : (
          <EditFoundForm
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
  </>);
};

export default LostFoundPage;
