// src/components/FAQ.js
import React, { useState } from 'react';
import './Faq.css';
import Dashboardbutton from '../components/Dashboardbutton';


const faqs = [
  {
    question: 'What is Vcube Software Solutions?',
    answer: 'Vcube Software Solutions is a leading provider of technology and software development services.',
  },
  {
    question: 'How can I enroll in a course?',
    answer: 'You can enroll in a course by visiting our Courses page and selecting the course you are interested in.',
  },
  {
    question: 'What are the payment methods available?',
    answer: 'We accept various payment methods including credit cards, debit cards, and online banking.',
  },
  {
    question: 'How do I access the course materials?',
    answer: 'Course materials are accessible through our online portal once you have enrolled in a course.',
  },
  {
    question: 'Can I get a refund if I am not satisfied with a course?',
    answer: 'Yes, we offer a refund policy. Please refer to our refund policy page for more details.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = index => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
            </div>
            <div className="faq-answer" style={{ display: activeIndex === index ? 'block' : 'none' }}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default FAQ;
