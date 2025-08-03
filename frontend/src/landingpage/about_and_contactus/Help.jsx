import { Link } from "react-router-dom";

function Help() {
  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <h1 className="fw-bold text-primary mb-4 text-center">
        Complete Guide: How to Use This Website
      </h1>
      
      <div className="bg-white shadow rounded p-4">
        {/* Welcome Section */}
        <section className="mb-5">
          <div className="text-center mb-4">
            <img 
              src="/images/logo.png" 
              alt="UU Logo" 
              style={{ maxWidth: "120px", width: "100%" }} 
            />
            <h2 className="text-success mt-3">Welcome to Uttaranchal University Platform!</h2>
          </div>
          <p className="lead text-center">
            This comprehensive platform is designed specifically for Uttaranchal University students to:
          </p>
          <div className="row text-center mt-4">
            <div className="col-md-6">
              <div className="p-3 border rounded">
                <h5 className="text-primary">🔍 Lost & Found</h5>
                <p>Report lost items or help return found belongings</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 border rounded">
                <h5 className="text-success">🛒 Buy & Sell</h5>
                <p>Trade books, gadgets, and student essentials safely</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lost & Found Section */}
        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2 mb-3">📋 Lost & Found Portal</h3>
          
          <div className="row">
            <div className="col-md-6">
              <h5 className="text-danger">🔍 If You Lost Something:</h5>
              <ol>
                <li>Click on <strong>"Go to Lost & Found"</strong> from homepage</li>
                <li>Select <strong>"Report Lost Item"</strong></li>
                <li>Fill out the form with:
                  <ul>
                    <li>Item name and description</li>
                    <li>Location where you lost it</li>
                    <li>Date when you lost it</li>
                    <li>Your contact information</li>
                    <li>Your ERP ID (for security)</li>
                    <li>Upload a photo if available</li>
                  </ul>
                </li>
                <li>Submit the form</li>
                <li>Your lost item will appear in the portal for others to see</li>
              </ol>
            </div>
            
            <div className="col-md-6">
              <h5 className="text-success">✅ If You Found Something:</h5>
              <ol>
                <li>Click on <strong>"Go to Lost & Found"</strong> from homepage</li>
                <li>Select <strong>"Report Found Item"</strong></li>
                <li>Fill out the form with:
                  <ul>
                    <li>Item name and description</li>
                    <li>Location where you found it</li>
                    <li>Date when you found it</li>
                    <li>Your contact information</li>
                    <li>Your ERP ID (for security)</li>
                    <li>Upload a photo of the item</li>
                  </ul>
                </li>
                <li>Submit the form</li>
                <li>Item owners can contact you to claim their belongings</li>
              </ol>
            </div>
          </div>

          <div className="alert alert-info mt-3">
            <strong>💡 Pro Tips:</strong>
            <ul className="mb-0 mt-2">
              <li>Check the Lost & Found portal regularly - your item might already be posted!</li>
              <li>Click <strong>"Contact Owner"</strong> or <strong>"Claim Item"</strong> to reach out</li>
              <li>You can edit or delete your posts using your ERP ID</li>
            </ul>
          </div>
        </section>

        {/* Marketplace Section */}
        <section className="mb-5">
          <h3 className="text-success border-bottom pb-2 mb-3">🛍️ UU Marketplace</h3>
          
          <div className="row">
            <div className="col-md-6">
              <h5 className="text-primary">💰 Selling Items:</h5>
              <ol>
                <li>Click on <strong>"Go to Marketplace"</strong> from homepage</li>
                <li>Click <strong>"Post an Item"</strong></li>
                <li>Select <strong>"Sell"</strong> as type</li>
                <li>Fill out the details:
                  <ul>
                    <li>Item title (e.g., "Physics Textbook")</li>
                    <li>Detailed description and condition</li>
                    <li>Selling price</li>
                    <li>Your contact information</li>
                    <li>Your ERP ID (for security)</li>
                    <li>Upload clear photos of the item</li>
                  </ul>
                </li>
                <li>Submit and your item will be listed</li>
                <li>Buyers will contact you directly</li>
              </ol>
            </div>
            
            <div className="col-md-6">
              <h5 className="text-warning">🛒 Buying Items:</h5>
              <ol>
                <li>Browse the marketplace for available items</li>
                <li>Or post a <strong>"Buy Request"</strong>:
                  <ul>
                    <li>Select <strong>"Buy"</strong> as type</li>
                    <li>Describe what you're looking for</li>
                    <li>Mention your budget (optional)</li>
                    <li>Provide contact details</li>
                    <li>Your ERP ID</li>
                  </ul>
                </li>
                <li>Click <strong>"Contact Owner"</strong> on items of interest</li>
                <li>Negotiate and arrange meetup safely</li>
              </ol>
            </div>
          </div>

          <div className="alert alert-warning mt-3">
            <strong>🛡️ Safety Guidelines:</strong>
            <ul className="mb-0 mt-2">
              <li>Always meet in public places on campus</li>
              <li>Inspect items thoroughly before purchasing</li>
              <li>Use secure payment methods</li>
              <li>Report any suspicious activity</li>
            </ul>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-5">
          <h3 className="text-info border-bottom pb-2 mb-3">⚡ Key Features</h3>
          
          <div className="row">
            <div className="col-md-4">
              <div className="text-center p-3">
                <h5 className="text-primary">🔐 Secure Authentication</h5>
                <p>ERP ID verification ensures only you can edit/delete your posts</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3">
                <h5 className="text-success">📱 Mobile Friendly</h5>
                <p>Responsive design works perfectly on all devices</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3">
                <h5 className="text-warning">⚡ Real-time Updates</h5>
                <p>See new posts instantly as they're added</p>
              </div>
            </div>
          </div>
          
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="text-center p-3">
                <h5 className="text-danger">📸 Image Upload</h5>
                <p>Add photos to make your posts more effective</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3">
                <h5 className="text-info">📞 Direct Contact</h5>
                <p>One-click calling and messaging features</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3">
                <h5 className="text-secondary">✏️ Edit & Delete</h5>
                <p>Manage your posts easily with edit/delete options</p>
              </div>
            </div>
          </div>
        </section>

        {/* How This Helps Section */}
        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2 mb-3">🌟 How This Website Helps You</h3>
          
          <div className="row">
            <div className="col-md-6">
              <h5 className="text-success">💰 Save Money</h5>
              <ul>
                <li>Buy used textbooks at lower prices</li>
                <li>Sell items you no longer need</li>
                <li>Find affordable gadgets and essentials</li>
                <li>Get PG/Rooms/Room partner according to your convenience</li>
              </ul>
              
              <h5 className="text-info mt-4">🤝 Build Community</h5>
              <ul>
                <li>Connect with fellow UU students</li>
                <li>Help others by returning lost items</li>
                <li>Create a supportive campus environment</li>
              </ul>
            </div>
            
            <div className="col-md-6">
              <h5 className="text-warning">⏰ Save Time</h5>
              <ul>
                <li>Quick search through available items</li>
                <li>Instant notifications for new posts</li>
                <li>Direct contact without intermediaries</li>
              </ul>
              
              <h5 className="text-danger mt-4">🔒 Stay Safe</h5>
              <ul>
                <li>University-only platform</li>
                <li>ERP verification system</li>
                <li>Campus-based transactions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-5">
          <h3 className="text-secondary border-bottom pb-2 mb-3">❓ Frequently Asked Questions</h3>
          
          <div className="accordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed">
                  <strong>Q: Why do I need to provide my ERP ID?</strong>
                </button>
              </h2>
              
                <div className="accordion-body">
                  Your ERP ID serves as authentication to ensure only you can edit or delete your posts. This prevents spam and maintains security.
                </div>
              
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                  <strong>Q: Can I edit my post after submitting?</strong>
                </button>
              </h2>
             
                <div className="accordion-body">
                  Yes! Click the "Edit" button on your post and enter your ERP ID for verification. You can update all details including images.
                </div>
             
            </div>
            
            <div className="">
              <h2 className="">
                <button className="accordion-button collapsed">
                  <strong>Q: Is this platform free to use?</strong>
                </button>
              </h2>
                <div className="accordion-body">
                  Absolutely! This platform is completely free for all Uttaranchal University students. No hidden charges or fees.
                </div>
              
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-4">
          <h3 className="text-primary border-bottom pb-2 mb-3">📞 Need Help or Have Suggestions?</h3>
          
          <div className="row">
            <div className="col-md-8">
              <p>If you encounter any issues, have suggestions for improvements, or need technical support:</p>
              <div className="d-flex align-items-center">
                <span className="me-2">📧</span>
                <strong>Contact us at:</strong>
                <a href="mailto:vlogsbyrawat@gmail.com" className="text-decoration-none text-primary ms-2">
                  vlogsbyrawat@gmail.com
                </a>
              </div>
              <p className="mt-2 text-muted">We typically respond within 24 hours during weekdays.</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="p-3 bg-light rounded">
                <h6 className="text-success">💡 Quick Tip</h6>
                <p className="small mb-0">Bookmark this page for easy reference!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="text-center mb-4">
          <Link to="/" className="btn btn-outline-success btn-lg me-3">
            ← Back to Home Page
          </Link>
          <Link to="/lost-and-found" className="btn btn-outline-primary btn-lg me-3">
            Go to Lost & Found
          </Link>
          <Link to="/buy-sell" className="btn btn-outline-success btn-lg">
            Go to Marketplace
          </Link>
        </div>
        
        <footer className="text-center mt-5 pt-4 border-top">
          <p className="text-muted">
            &copy; {new Date().getFullYear()} Priyanshu Rawat, BCA. All rights reserved.
          </p>
          <p className="text-muted small">
            Made with ❤️ for Uttaranchal University Students
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Help;