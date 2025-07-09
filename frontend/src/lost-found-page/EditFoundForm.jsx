import React, { useState } from 'react';
import '../styles/LandingPage.css';

const EditFoundForm = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    itemName: item.itemName,
    description: item.description,
    contact: item.contact,
    location: item.location,
    dateFound: item.dateFound,
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/found/${item._id}`, {
        method: 'PATCH',
        body: form,
      });

      if (!res.ok) throw new Error('Failed to update item');

      const updated = await res.json();
      onSave(updated);  // Update list in parent component
      onClose();        // Close modal
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update item.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block', background: '#00000099' }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Edit Found Item</h5>
          <form onSubmit={handleSubmit}>
            <input
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="form-control my-1"
              placeholder="Item Name"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control my-1"
              placeholder="Description"
            />
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-control my-1"
              placeholder="Contact"
            />
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control my-1"
              placeholder="Location"
            />
            <input
              name="dateFound"
              value={formData.dateFound}
              onChange={handleChange}
              className="form-control my-1"
              placeholder="Date Found"
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="form-control my-2"
            />

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <span className="loading-text">
                    <div className="loader_lostform"></div>
                    Saving...
                  </span>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFoundForm;

