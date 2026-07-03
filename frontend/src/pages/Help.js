import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>
      <div className="help-sections">
        <div className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How can I contact support?</h3>
            <p>You can reach us via the contact form on the Contact Us page or by emailing support@vcube.com.</p>
          </div>
          <div className="faq-item">
            <h3>What courses do you offer?</h3>
            <p>We offer a wide range of courses including Python, Java, Web Development, Data Science, and more.</p>
          </div>
        </div>
        <div className="help-section">
          <h2>Support Resources</h2>
          <div className="resource-item">
            <h3>Documentation</h3>
            <p>Find detailed information and tutorials in our <a href="/docs">documentation</a>.</p>
          </div>
          <div className="resource-item">
            <h3>Community Forum</h3>
            <p>Join our <a href="/forum">community forum</a> to ask questions and share knowledge with other users.</p>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Help;
