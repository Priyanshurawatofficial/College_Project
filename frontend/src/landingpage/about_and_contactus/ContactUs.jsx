function ContactUs() {
    return (
        <div className="container py-5" style={{ maxWidth: 700 }}>
            <h2 className="fw-bold text-primary mb-4 text-center">Contact Us</h2>
            <div className="bg-white shadow rounded p-4 text-center">
                <p className="mb-3">
                    For any suggestions, support, or queries, feel free to reach out to:
                </p>
                <p className="fw-bold fs-5">
                    <a href="mailto:vlogsbyrawat@gmail.com" className="text-decoration-none text-primary">
                        vlogsbyrawat@gmail.com
                    </a>
                </p>
                <p className="text-muted mt-4">
                    &copy; {new Date().getFullYear()} Priyanshu Rawat, BCA. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default ContactUs;