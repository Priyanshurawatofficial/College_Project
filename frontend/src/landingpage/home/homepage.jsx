import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/LandingPage.css'; // Optional for custom styles


const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container-fluid px-0">
      {/* Header/Navbar */}
      <header
        className="d-flex justify-content-between align-items-center"
        style={{
          background: "linear-gradient(90deg, #e3f2fd 60%, #90caf9 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: "0.75rem 1rem",
          position: "relative",
          zIndex: 1000
        }}
      >
        <span className="fw-bold" style={{ fontSize: "1.25rem" }}>
          <span className="d-none d-md-inline">College Lost &amp; Found | Buy &amp; Sell Platform</span>
          <span className="d-md-none">UU Lost &amp; Found</span>
        </span>
        
        {/* Desktop Navigation */}
        <nav className="d-none d-md-flex">
          <Link
            className="px-3 fw-bold me-2 text-decoration-none"
            style={{
              fontSize: "1.1rem",
              border: "2px solid rgb(0, 0, 0)",
              borderRadius: "2px",
              color: "#1976d2",
              background: "#fff",
              textAlign: "center",
              padding: "0.5rem 1rem"
            }}
            to="/about"
          >
            About Us
          </Link>
          <Link
            className="px-3 fw-bold text-decoration-none"
            style={{
              fontSize: "1.1rem",
              border: "2px solid rgb(0, 0, 0)",
              borderRadius: "2px",
              color: "#1976d2",
              background: "#fff",
              textAlign: "center",
              padding: "0.5rem 1rem"
            }}
            to="/contact"
          >
            Contact Us
          </Link>
        </nav>
        
        {/* Mobile Hamburger Button */}
        <button
          className={`d-md-none hamburger-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.5rem",
            zIndex: 1001
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      
      {/* Mobile Slide Menu */}
      <div
        className="mobile-menu"
        style={{
          position: "fixed",
          top: 0,
          right: isMenuOpen ? "0" : "-100%",
          width: "280px",
          height: "100vh",
          backgroundColor: "#fff",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
          transition: "right 0.3s ease",
          zIndex: 999,
          paddingTop: "80px"
        }}
      >
        <div className="p-4">
          <Link
            to="/about"
            className="d-block text-decoration-none mb-3 p-3 text-center fw-bold"
            style={{
              fontSize: "1.1rem",
              border: "2px solid rgb(0, 0, 0)",
              borderRadius: "2px",
              color: "#1976d2",
              background: "#f8f9fa"
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="d-block text-decoration-none mb-3 p-3 text-center fw-bold"
            style={{
              fontSize: "1.1rem",
              border: "2px solid rgb(0, 0, 0)",
              borderRadius: "2px",
              color: "#1976d2",
              background: "#f8f9fa"
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 998
          }}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div className="container py-3 py-md-5 text-center">
        {/* Logo and University Image */}
        <div className="mb-4 mb-md-5">
          <img src="/images/logo.png" alt="UU Logo" className="logo-image mb-3" style={{ maxWidth: "250px", width: "100%" }} />
          <h1 className="fw-bold">Uttranchal University</h1>
          <p className="text-muted">Lost & Found | Buy & Sell Platform</p>
        <p className='text-danger' style={{color:"#fff",textShadow:"0 0 5px #0ff,0 0 10px #0ff,0 0 20px #0ff,0 0 40px #0ff"}}>How to use this website? <p className='d-inline' style={{textShadow:"none"}}>&nbsp;</p> 
          <Link
            to="/help"
            className="text-decoration-none text-center"
            style={{
              fontSize: "1.1rem",
              border: "2px solid rgba(25, 135, 84, 1)",
              borderRadius: "10px",
              color:"green",
              textShadow:"none",
              maxWidth:"150px",
              maxHeight:"50px",
              padding:"3px"
            }}
            
          >
            Click Here
          </Link> </p>
        




          <img
            src="/images/uttaranchal-campus.jpg"
            alt="Campus"
            className="img-fluid rounded mt-4 shadow campus-image"
            style={{ maxHeight: "350px", width: "80%", maxWidth: "580px" }}
          />
        </div>

        {/* Cards Section */}
        <div className="row g-4 justify-content-center">
          {/* Lost and Found Card */}
          <div className="col-12 col-md-6 col-lg-5">
            <div
              className="card h-100 shadow-sm text-white"
              style={{
                backgroundImage: "url('/images/lf.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                position: "relative",
                minHeight: "350px",
                maxHeight: "400px",
                borderRadius: "10px",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.4)",
                  pointerEvents: "none"
                }}
              ></div>
              <div className="card-body d-flex flex-column justify-content-between p-4 position-relative">
                <div className="text-center">
                  <h5 className="card-title fs-3 fw-bold mb-3">UU Lost & Found</h5>
                  <p className="card-text fs-6" style={{color:"white"}}>
                    Report lost items or help return found ones. A simple way to connect and recover your belongings.
                  </p>
                </div>
                <div className="text-center mt-4">
                  <Link to="/lost-and-found" className="btn btn-primary btn-lg fw-bold">
                    Go to Lost & Found
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Marketplace Card */}
          <div className="col-12 col-md-6 col-lg-5">
            <div
              className="card h-100 shadow-sm text-white"
              style={{
                backgroundImage: "url('/images/market.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                position: "relative",
                minHeight: "350px",
                maxHeight: "400px",
                borderRadius: "10px",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.4)",
                  pointerEvents: "none"
                }}
              ></div>
              <div className="card-body d-flex flex-column justify-content-between p-4 position-relative">
                <div className="text-center">
                  <h5 className="card-title fs-3 fw-bold mb-3">UU Marketplace</h5>
                  <p className="card-text fs-6" style={{color:"white"}}>
                    Buy or sell books, gadgets, and student essentials. Safe and easy trading for UU students.
                  </p>
                </div>
                <div className="text-center mt-4">
                  <Link to="/buy-sell" className="btn btn-success btn-lg fw-bold">
                    Go to Marketplace
                  </Link>
                </div>
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
