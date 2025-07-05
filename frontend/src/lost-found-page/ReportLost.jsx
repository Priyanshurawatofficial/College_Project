import React, { useState } from 'react';

function ReportLost() {
  const [form, setForm] = useState({
    itemName: '',
    description: '',
    location: '',
    dateLost: '',
    contact: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    // If the input is for the image
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setForm({ ...form, image: file }); // Save the file in form state
      setPreview(URL.createObjectURL(file)); // Show image preview
    } else {
      // For all other inputs (text, date, etc.)
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend
    alert('Lost item reported successfully!');
    setForm({
      itemName: '',
      description: '',
      location: '',
      dateLost: '',
      contact: '',
      image: null,
    });
    setPreview(null);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4 text-primary fw-bold text-center">Report Lost Item</h2>
      <p className="text-muted text-center mb-4">
        Please fill out the form below with accurate details to help us reunite you with your lost item.
      </p>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
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
        <button type="submit" className="btn btn-primary w-100 fw-bold">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default ReportLost;