import React, { useState } from "react";
import "../styles/LandingPage.css";

const initialItems = [
  {
    id: 1,
    type: "lost",
    title: "Black Backpack",
    description:
      "Lost near the library on July 2nd. Contains books and a water bottle. Please contact if found!",
    image: "",
    contact: "Contact Owner",
  },
  {
    id: 2,
    type: "found",
    title: "Wrist Watch",
    description:
      "Found in the cafeteria. Describe the brand and color to claim.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYpXHekZ71OwHAvzt648mNklj8YvCD7DV3g&s",
    contact: "Claim Item",
  },
  {
    id: 3,
    type: "lost",
    title: "Student ID Card",
    description:
      "Lost near Block B. Name: Priya Sharma. Please return if found!",
    image: "/images/lost-id.jpg",
    contact: "Contact Owner",
  },
];

const LostFoundPage = () => {
  const [items, setItems] = useState(initialItems);

   
  const handleEdit = (item) => {
    // Implement edit logic or open a modal/form
    alert(`Edit functionality for: ${item.title}`);
  };

  const handleDelete = (itemToDelete) => {
    setItems(items.filter((item) => item.id !== itemToDelete.id));
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Lost & Found Portal</h1>
        <p className="lead text-muted mt-3">
          Welcome to the College Lost & Found page. Here, you can report lost items, browse found items, and help reunite belongings with their owners. Please provide clear details and check regularly for updates!
        </p>
        <img
          src="/images/lf.png"
          alt="Lost and Found"
          style={{ maxWidth: "180px" }}
          className="my-3"
        />
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-4 mb-5">
        <a href="/report-lost" className="btn btn-outline-primary btn-lg">
          Report Lost Item
        </a>
        <a href="/report-found" className="btn btn-outline-success btn-lg">
          Report Found Item
        </a>
      </div>

      {/* Lost/Found Items List */}
      <div className="row g-4">
        {items.length === 0 && (
          <div className="text-center text-muted">No items posted yet.</div>
        )}
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card shadow-sm h-100">
              <img
                src={item.image || "/images/default-item.jpg"}
                className="card-img-top"
                alt={item.title}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className={`card-title ${item.type === "found" ? "text-success" : "text-danger"}`}>
                  {item.type === "found" ? "Found: " : "Lost: "}{item.title}
                </h5>
                <p className="card-text">{item.description}</p>
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
                <button className={`btn btn-${item.type === "found" ? "success" : "primary"} btn-sm mt-3`}>
                  {item.contact}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-5 text-center text-muted small">
        &copy; {new Date().getFullYear()} College Lost & Found. All rights reserved.
      </footer>
    </div>
  );
};

export default LostFoundPage;