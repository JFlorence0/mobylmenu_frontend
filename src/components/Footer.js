import React from "react";
import '../styles/baseStyles/Footer.css';

const Footer = () => {
    return (
      <footer>
        <div className="footer-landing">
          {/* Action Column */}
          <div className="footer-column">
            <h4>Action</h4>
            <a className="footer-link" href="/claim-venue">Claim a Venue</a>
            <a className="footer-link" href="/delete-my-data">Delete My Data</a>
            <a className="footer-link" href="/submit-feedback">Submit Feedback</a>
          </div>
  
          {/* Product Column */}
          <div className="footer-column">
            <h4>Product</h4>
            <a className="footer-link" href="/faqs">FAQs</a>
            <a className="footer-link" href="https://apps.apple.com/us/app/mobylmenu/id6445874189">
              Download MobylMenu for iOS
            </a>
            <a className="footer-link" href="/download-android">Download MobylMenu for Android</a>
            <a className="footer-link" href="/purchase-our-datasets">Our Datasets</a>
            <a className="footer-link" href="/learn-about-spotlight">Learn about Spotlight</a>
          </div>
  
          {/* Legal Column */}
          <div className="footer-column">
            <h4>Legal</h4>
            <a className="footer-link" href="/privacy">Privacy</a>
            <a className="footer-link" href="/terms-and-conditions">Terms and Conditions</a>
            <a className="footer-link" href="/about-us">About Us</a>
          </div>
  
          {/* Get in Touch Column */}
          <div className="footer-column">
            <h4 id="contact">Get in touch</h4>
            <a href="mailto:support@mobylmenu.com" id="mail" className="footer-link">support@mobylmenu.com</a>
            <h4 id="connect">Connect With Us</h4>
            <div className="social-media">
              <a href="https://www.instagram.com/mobylmenu/">
                <img
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/insta-icon.png"
                  id="sm-icon"
                  alt="Instagram Icon"
                />
              </a>
              <a href="https://www.instagram.com/mobylmenu/">
                <img
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/fb-icon.png"
                  id="sm-icon"
                  alt="Facebook Icon"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;