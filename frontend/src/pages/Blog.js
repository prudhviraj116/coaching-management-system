// src/pages/Blog.js

import React from 'react';
import './blog.css'; // Import updated CSS for styling
import Dashboardbutton from '../components/Dashboardbutton';
import image1 from '../assets/blog1.jpg'; // Import images
import image2 from '../assets/blog2.jpg'; // Replace with your images
import image3 from '../assets/blog3.jpg';
import image4 from '../assets/blog4.jpg';

const Blog = () => {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Explore Our Blog</h1>
        <p>Welcome to our insightful articles and stories!</p>
      </div>
      <div className="blog-content">
        {/* Blog Post 1 */}
        <div className="blog-post">
          <div className="blog-image">
            <img src={image1} alt="pic1" />
          </div>
          <div className="blog-text">
            <h2>Best Developer</h2>
            <p className="blog-meta">Posted by Admin | July 1, 2024</p>
            <p>
              Development is fun - when the right information reaches you at the right time. We make this easy by bringing to you the best developer blogs that can get you the latest technology and software updates right away. Get your Bookmark buttons ready!
            </p>
          </div>
        </div>

        {/* Blog Post 2 */}
        <div className="blog-post">
          <div className="blog-image">
            <img src={image2} alt="pic2" />
          </div>
          <div className="blog-text">
            <h2>DevOps</h2>
            <p className="blog-meta">Posted by Admin | June 25, 2024</p>
            <p>
              DevOpsCube stands out for its comprehensive tutorials and how-to guides aimed at DevOps beginners and experts alike. The blog covers various DevOps tools, continuous integration techniques, and automation practices.
            </p>
          </div>
        </div>

        {/* Blog Post 3 */}
        <div className="blog-post">
          <div className="blog-image">
            <img src={image3} alt="pic3" />
          </div>
          <div className="blog-text">
            <h2>Computer Networking</h2>
            <p className="blog-meta">Posted by Admin | June 20, 2024</p>
            <p>
              The concept of a computer network might seem complex, but in reality, it's fundamentally quite straightforward. A computer network is just a group of computers and devices linked together in a way that allows them to communicate and share resources with each other.
            </p>
          </div>
        </div>

        {/* Blog Post 4 */}
        <div className="blog-post">
          <div className="blog-image">
            <img src={image4} alt="pic4" />
          </div>
          <div className="blog-text">
            <h2>Artificial Intelligence (AI)</h2>
            <p className="blog-meta">Posted by Admin | June 15, 2024</p>
            <p>
              The field of artificial intelligence (AI) is rapidly evolving, with researchers and companies at the forefront of innovation pushing the boundaries of what is possible. OpenAI, a non-profit AI research company co-founded by Elon Musk, has emerged as a powerhouse in this domain. Their blog serves as a window into the cutting-edge developments in AI, exploring the intricacies of model development and the ethical considerations that come with such powerful technology.
            </p>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Blog;
