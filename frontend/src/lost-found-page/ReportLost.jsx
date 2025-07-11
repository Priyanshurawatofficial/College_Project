import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const MAX_IMAGE_SIZE_MB = 5;
import { Link } from 'react-router-dom';
function ReportLost() {
  const [form, setForm] = useState({
    itemName: '',
    description: '',
    location: '',
    dateLost: '',
    erp:'',
    contact: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
       if (file && file.size / (1024 * 1024) > MAX_IMAGE_SIZE_MB) {
      alert('Image is too large. Please upload an image smaller than 5MB.');
      return;
    }
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
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
      formData.append('dateLost', form.dateLost);
      formData.append('contact', form.contact);
      formData.append('erp', form.erp);

      if (form.image) {
        formData.append('image', form.image);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/lost`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Report submitted successfully!');
        navigate('/lost-and-found');
      } else {
        alert('Failed to report lost item. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error reporting lost item:', error);
      alert('Error reporting lost item. Please try again.');
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
      <h2 className="mb-3 mb-md-4 text-primary fw-bold text-center">Report Lost Item</h2>
      <p className="text-muted text-center mb-3 mb-md-4">
        Please fill out the form below with accurate details to help us reunite you with your lost item.
      </p>

      
        <Link to="/lost-and-found" className="mb-3 btn btn-outline-primary btn-lg w-100 w-md-auto">
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
            placeholder="e.g. Black Backpack"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Describe the item, color, brand, unique features, etc."
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Location Lost <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Library, Cafeteria"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Date Lost <span className="text-danger">*</span></label>
          <input
            type="date"
            className="form-control"
            name="dateLost"
            value={form.dateLost}
            onChange={handleChange}
            required
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
          <label className="form-label fw-semibold">Contact Information <span className="text-danger">*</span></label>
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
          className="btn btn-primary w-100 fw-bold"
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

export default ReportLost;