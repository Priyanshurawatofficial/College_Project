import React, { useState } from "react";

const initialItems = [
  {
    id: 1,
    title: "Engineering Mathematics Book",
    description: "Good condition, 2nd edition. Useful for 1st year students.",
    price: "₹250",
    image: "/images/book.jpg",
    contact: "9876543210",
    type: "sell",
  },
  {
    id: 2,
    title: "Casio Scientific Calculator",
    description: "Almost new, with cover.",
    price: "₹400",
    image: "/images/calculator.jpg",
    contact: "9876543210",
    type: "sell",
  },
  {
    id: 3,
    title: "Looking to Buy: Drawing Board",
    description: "Need a drawing board for architecture course.",
    price: "₹Negotiable",
    image: "/images/drawing-board.jpg",
    contact: "student@email.com",
    type: "buy",
  },
];

function BuyAndSell() {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    contact: "",
    image: null,
    type: "sell",
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
    
    try {
      // Create FormData to send image and other data
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('contact', form.contact);
      formData.append('password', 'temp123'); // You can add a password field or use a default
      
      // Add image if selected
      if (form.image) {
        formData.append('image', form.image);
      }
      
      // Send to backend
      const response = await fetch(`http://localhost:3000/${form.type}`, {
        method: 'POST',
        body: formData, // Don't set Content-Type header, let browser set it for FormData
      });
      
      if (response.ok) {
        const newItem = await response.json();
        setItems([newItem, ...items]);
        alert(`${form.type === 'sell' ? 'Item posted for sale' : 'Buy request posted'} successfully!`);
        
        // Reset form
        setForm({
          title: "",
          description: "",
          price: "",
          contact: "",
          image: null,
          type: "sell",
        });
        setPreview(null);
        setShowForm(false);
      } else {
        alert('Failed to post item. Please try again.');
      }
    } catch (error) {
      console.error('Error posting item:', error);
      alert('Error posting item. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setPreview(item.image);
    setShowForm(true);
  };

  const handleDelete = (itemToDelete) => {
    setItems(items.filter((item) => item.id !== itemToDelete.id));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-success fw-bold text-center">UU Buy & Sell Marketplace</h2>
      <p className="text-muted text-center mb-4">
        Buy or sell books, gadgets, and student essentials. Post your item or browse listings below!
      </p>
       <a href="/" className="btn btn-outline-danger btn-lg">
          ← Back to Main Page
        </a>
      <div className="d-flex justify-content-center mb-4">
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
          <button type="submit" className="btn btn-success w-100 fw-bold">
            Post Item
          </button>
        </form>
      )}

      <div className="row g-4">
        {items.length === 0 && (
          <div className="text-center text-muted">No items posted yet.</div>
        )}
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card shadow-sm h-100">
              <img
                src={
                  item.type === "sell"
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFs4xa_05ZRIvnlM2c7cVV43td4VHNubEuWw&s"
                    : "https://grafkom.io/wp-content/uploads/2021/01/wanttobuy.jpg"
                }
                className="card-img-top"
                alt={item.title}
                style={{ height: "180px" }}
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
                <div className="mb-2 fw-semibold text-success">{item.price}</div>
                <div className="mb-2 small text-muted">
                  <span className="fw-semibold">Contact:</span> {item.contact}
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
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-5 text-center text-muted small">
        &copy; {new Date().getFullYear()} UU Buy & Sell Marketplace. All rights reserved.
      </footer>
    </div>
  );
}

export default BuyAndSell;