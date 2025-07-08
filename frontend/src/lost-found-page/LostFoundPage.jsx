import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LostFoundPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadItems() {
      try {
        const res = await fetch("http://localhost:3000/lost");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load items. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  

const handleDelete = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this item?');
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:3000/lost/${id}`, {
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
  }
};






  const handleEdit = (item) => {
    alert(`Edit functionality for: ${item.title}`);
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Lost & Found Portal</h1>
        <p className="lead text-muted mt-3">Welcome to the College Lost & Found page...</p>
        <img src="/images/lf.png" alt="Lost and Found" style={{ maxWidth: "180px" }} className="my-3" />
      </div>

      <div className="d-flex justify-content-center gap-4 mb-5">
        <a href="/" className="btn btn-outline-danger btn-lg">
          ← Back to Main Page
        </a>
        <Link to="/report-lost" className="btn btn-outline-primary btn-lg">
          Report Lost Item
        </Link>
        <Link to="/report-found" className="btn btn-outline-success btn-lg">
          Report Found Item
        </Link>
      </div>

      <div className="row g-4">
        {items.length === 0 && <div className="text-center text-muted">No items posted yet.</div>}

        {items.map(item => (
          <div className="col-md-4" key={item._id || item.id}>
            <div className="card shadow-sm h-100">
              <img
                src={item.image || "/images/default-item.jpg"}
                className="card-img-top"
                alt={item.itemName}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className={`card-title ${item.type === "found" ? "text-success" : "text-danger"}`}>
                  {item.type === "found" ? "Found: " : "Lost: "}{item.itemName}
                </h5>
                <p className="card-text">Description: {item.description}</p>
                <p className="card-text">Lost Location: {item.location}</p>
                <p className="card-text">Contact Me: {item.contact}</p>
                <p className="card-text">Date_Lost: {item.dateLost}</p>
                
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
                <button className={`btn btn-${item.type === "found" ? "success" : "primary"} btn-sm mt-3`}>
                  {item.type === "found" ? "Claim Item" : "Contact Owner"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-5 text-center text-muted small">
        &copy; {new Date().getFullYear()} College Lost & Found. All rights reserved.
      </footer>
    </div>
  );
};

export default LostFoundPage;
