import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const MAX_IMAGE_SIZE_MB = 5;
import {Link} from "react-router-dom"
function ReportFound() {
  const [form, setForm] = useState({
    itemName: '',
    description: '',
    location: '',
    dateFound: '',
    erp: '',
    contact: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file && file.size / (1024 * 1024) > MAX_IMAGE_SIZE_MB) {
        alert('Image is too large. Please upload an image smaller than 5MB.');
        return;
      }
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('itemName', form.itemName);
      formData.append('description', form.description);
      formData.append('location', form.location);
      formData.append('dateFound', form.dateFound);
      formData.append('contact', form.contact);
      formData.append('erp', form.erp);

      if (form.image) {
        formData.append('image', form.image);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/found`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Found item reported successfully!');
        navigate('/lost-and-found');
      } else {
        alert('Failed to report found item. Please try again.');
      }
    } catch (error) {
      console.error('Error reporting found item:', error);
      alert('Error reporting found item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="container py-3 py-md-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-3 mb-md-4 text-success fw-bold text-center">Report Found Item</h2>
      <p className="text-muted text-center mb-3 mb-md-4">
        Found something? Please fill out the form below to help return it to its rightful owner. Only a few details are required!
      </p>

     
  
   <Link to="/lost-and-found" className="mb-3 btn btn-outline-success btn-lg w-100 w-md-auto">
           ← Back to Lost & Found Page
        </Link>


      <form onSubmit={handleSubmit} className="shadow p-3 p-md-4 rounded bg-white">
        <div className="mb-3">
          <label className="form-label fw-semibold">Item Name <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            name="itemName"
            value={form.itemName}
            onChange={handleChange}
            placeholder="e.g. Blue Water Bottle"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Location Found <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Playground, Block C"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Date Found (optional)</label>
          <input
            type="date"
            className="form-control"
            name="dateFound"
            value={form.dateFound}
            onChange={handleChange}
          />
        </div>

         <div className="mb-3">
          <label className="form-label fw-semibold">
            Last 3 Digits of ERP<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="erp"
            value={form.erp}
            onChange={handleChange}
            pattern="\d{3}"
            maxLength={3}
            placeholder="e.g. 123"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Description (optional)</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            placeholder="Describe the item, color, brand, unique features, etc. (optional)"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Your Contact Information <span className="text-danger">*</span></label>
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
          <label className="form-label fw-semibold">Upload Image (optional)</label>
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
              style={{ maxWidth: '100%', maxHeight: 180 }}
            />
          )}
        </div>
        <button
          type="submit"
          className="btn btn-success w-100 fw-bold"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
        </button>
      </form>
    </div>
  );
}

export default ReportFound;
