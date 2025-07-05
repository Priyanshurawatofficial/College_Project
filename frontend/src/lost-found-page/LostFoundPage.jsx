import React from "react";
import "../styles/LandingPage.css";

const LostFoundPage = () => {
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

      {/* Example Lost/Found Items List */}
      <div className="row g-4">
        {/* Example Card 1 */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <img
              src=""
              className="card-img-top"
              alt="Lost Bag"
              style={{height: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title text-danger">Lost: Black Backpack</h5>
              <p className="card-text">
                Lost near the library on July 2nd. Contains books and a water bottle. Please contact if found!
              </p>
              <button className="btn btn-primary btn-sm">Contact Owner</button>
            </div>
          </div>
        </div>
        {/* Example Card 2 */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYpXHekZ71OwHAvzt648mNklj8YvCD7DV3g&s"
              className="card-img-top"
              alt="Found Watch"
              style={{ height: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title text-success">Found: Wrist Watch</h5>
              <p className="card-text">
                Found in the cafeteria. Describe the brand and color to claim.
              </p>
              <button className="btn btn-success btn-sm">Claim Item</button>
            </div>
          </div>
        </div>
        {/* Example Card 3 */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <img
              src="/images/lost-id.jpg"
              className="card-img-top"
              alt="Lost ID Card"
              style={{ objectFit: "cover", height: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title text-danger">Lost: Student ID Card</h5>
              <p className="card-text">
                Lost near Block B. Name: Priya Sharma. Please return if found!
              </p>
              <button className="btn btn-primary btn-sm">Contact Owner</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5 text-center text-muted small">
        &copy; {new Date().getFullYear()} College Lost & Found. All rights reserved.
      </footer>
    </div>
  );
};

export default LostFoundPage;