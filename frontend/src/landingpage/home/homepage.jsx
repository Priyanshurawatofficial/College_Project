import { Link } from 'react-router-dom';
import '../../styles/LandingPage.css'; // Optional for custom styles


const Homepage = () => {
  return (
    <div className="container-fluid px-0">
      {/* Header/Navbar */}
      <header
        className="navbar navbar-expand-lg"
        style={{
          background: "linear-gradient(90deg, #e3f2fd 60%, #90caf9 100%)", // Deeper blue gradient
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: "0.75rem 2rem",
        }}
      >
        <span className="navbar-brand fw-bold " style={{ fontSize: "1.25rem" }}>
          College Lost &amp; Found | Buy &amp; Sell Platform
        </span>
        <nav className="ms-auto">
          <Link
            className="nav-link d-inline px-3 fw-bold"
            style={{
              fontSize: "1.1rem",
              border: "2px solid rgb(0, 0, 0)",
              borderRadius: "2px",
              marginRight: "10px",
              color: "#1976d2",
              background: "#fff"
            }}
            to="/about"
          >
            About Us
          </Link>
          <Link
            className="nav-link d-inline px-3 fw-bold"
            style={{
              fontSize: "1.1rem",
              border: "2px solid rgb(0, 0, 0)",
              borderRadius: "2px",
              color: "#1976d2",
              background: "#fff"
            }}
            to="/contact"
          >
            Contact Us
          </Link>
        </nav>
      </header>

      <div className="container py-5 text-center">
        {/* Logo and University Image */}
        <div className="mb-5">
          <img src="/images/logo.png" alt="UU Logo" width="300" className="mb-3" />
          <h1 className="fw-bold">Uttranchal University</h1>
          <p className="text-muted">Lost & Found | Buy & Sell Platform</p>
          <img
            src="/images/uttaranchal-campus.jpg"
            alt="Campus"
            className="img-fluid rounded mt-4 shadow"
            style={{ maxHeight: "300px", width: "50%" }}
          />
        </div>

        {/* Cards Section */}
        <div className="row g-4 justify-content-center">
          {/* Lost and Found Card */}
          <div className="col-md-5">
            <div
              className="card h-100 shadow-sm text-white"
              style={{
                backgroundImage: "url('/images/lf.png')",
                backgroundPosition: "center",
                position: "relative",
                minHeight: "250px",
                backgroundSize: "400px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none"
                }}
              ></div>
              <div className="card-body mt-3">
                <h5 className="card-title fs-4 mb-5">UU Lost & Found</h5>
                <p className="card-text fs-5">
                  Report lost items or help return found ones. A simple way to connect and recover your belongings.
                </p>
                <Link to="/lost-and-found" className="btn btn-primary mt-3">
                  Go to Lost & Found
                </Link>
              </div>
            </div>
          </div>

          {/* Marketplace Card */}
          <div className="col-md-5">
            <div
              className="card h-100 shadow-sm text-white"
              style={{
                backgroundImage: "url('/images/market.png')",
                backgroundPosition: "center",
                minHeight: "2.5rem",
                backgroundSize: "400px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none"
                }}
              ></div>
              <div className="card-body">
                <h5 className="card-title mb-5 mt-3 fs-4">UU Marketplace</h5>
                <p className="card-text fs-5">
                  Buy or sell books, gadgets, and student essentials. Safe and easy trading for UU students.
                </p>
                <Link to="/buy-sell" className="btn btn-success mt-3">
                  Go to Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-5 text-muted small">
          &copy; {new Date().getFullYear()} Priyanshu Rawat, BCA. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
