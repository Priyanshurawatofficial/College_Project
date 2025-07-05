import React, { useState } from 'react';

function ReportFound() {
  const [form, setForm] = useState({
    itemName: '',
    description: '',
    location: '',
    dateFound: '',
    contact: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend
    alert('Found item reported successfully!');
    setForm({
      itemName: '',
      description: '',
      location: '',
      dateFound: '',
      contact: '',
      image: null,
    });
    setPreview(null);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4 text-success fw-bold text-center">Report Found Item</h2>
      <p className="text-muted text-center mb-4">
        Found something? Please fill out the form below to help return it to its rightful owner. Only a few details are required!
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
          <label className="form-label fw-semibold">Date Found (optional) </label>
          <input
            type="date"
            className="form-control"
            name="dateFound"
            value={form.dateFound}
            onChange={handleChange}
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
        <button type="submit" className="btn btn-success w-100 fw-bold">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default ReportFound;