function AboutUs() {
    return (
        <div className="container py-5" style={{ maxWidth: 700 }}>
            <h2 className="fw-bold text-primary mb-4 text-center">About Us</h2>
            <div className="bg-white shadow rounded p-4">
                <p>
                    <strong>College Lost &amp; Found | Buy &amp; Sell Platform</strong> is a student-focused web application designed to help our college community easily report lost and found items, as well as buy and sell student essentials in a safe and convenient way.
                </p>
                <p>
                    This project was developed by <strong>Priyanshu Rawat</strong>, a BCA student, with the goal of making campus life easier and more connected.
                </p>
                <ul>
                    <li>
                        <strong>Lost &amp; Found:</strong> Report lost items, browse found items, and help return belongings to their rightful owners.
                    </li>
                    <li>
                        <strong>Buy &amp; Sell:</strong> Post and browse listings for books, gadgets, and other student essentials.
                    </li>
                    <li>
                        <strong>Safe &amp; Simple:</strong> No login required. Easy to use for all students and staff.
                    </li>
                </ul>
                <p>
                    <strong>Contact:</strong> For suggestions or support, please visit our <a href="/contact" className="fw-bold text-decoration-underline">Contact Us</a> page.
                </p>
                <p className="text-muted mt-3">
                    &copy; {new Date().getFullYear()} Priyanshu Rawat, BCA. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;