import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footerTop">
                <div className="footerColumn">
                    <h4>Get to Know Us</h4>
                    <ul>
                        <li>About Free Bazar</li>
                        <li>Corporate Responsibility</li>
                        <li>News Center</li>
                        <li>Careers</li>
                    </ul>
                </div>

                <div className="footerColumn">
                    <h4>Make Money with Us</h4>
                    <ul>
                        <li>Start Selling</li>
                        <li>Become an Affiliate</li>
                        <li>Advertise Your Products</li>
                    </ul>
                </div>

                <div className="footerColumn">
                    <h4>Customer Service</h4>
                    <ul>
                        <li>Help Center</li>
                        <li>Report Abuse</li>
                        <li>Submit a Dispute</li>
                        <li>Policies & Rules</li>
                    </ul>
                </div>

                <div className="footerColumn newsletter">
                    <h4>Trade Alert - Delivering the latest product trends and industry news straight to your inbox.</h4>
                    <input type="email" placeholder="Your email" />
                    <button>Subscribe</button>
                </div>
            </div>

            <div className="container copyright">
                © 1999-2025 Free Bazar. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
