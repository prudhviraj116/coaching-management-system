import React from 'react';
import Dashboardbutton from '../components/Dashboardbutton';
import './Gallery.css'; // Import your CSS for styling
import image1 from '../assets/image1.jpg'; // Import images
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import video1 from '../assets/video1.mp4'; // Import videos
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h2>Gallery</h2>
      <div className="gallery-content">
        {/* Displaying images */}
        <div className="gallery-item">
          <img src={image1} alt="Scene1" />
          <p>"Our coaching center offers structured courses in programming languages such as Python, Java, JavaScript, and more, catering to beginners and advanced learners.</p>
        </div>
        <div className="gallery-item">
          <img src={image2} alt="scene2" />
          <p>"Join our coding academy where students learn essential programming skills through hands-on projects and industry-relevant curriculum."</p>
        </div>
        <div className="gallery-item">
          <img src={image3} alt="scene3" />
          <p>"Explore our comprehensive courses in web development, covering HTML, CSS, and JavaScript, with a focus on building dynamic and responsive websites."</p>
        </div>
        <div className="gallery-item">
          <img src={image4} alt="scene4" />
          <p>"Develop your coding skills with our intensive bootcamps, designed to immerse students in programming languages like Python, Java, and Go."</p>
        </div>
        <div className="gallery-item">
          <img src={image5} alt="scene5" />
          <p>"Our programming language workshops provide practical training in algorithms, data structures, and problem-solving techniques, essential for mastering languages like C++, Python, and Ruby."</p>
        </div>

        {/* Displaying videos */}
        <div className="gallery-item">
          <video width="100%" controls>
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>"Master the art of software development with our tailored courses in popular programming languages, featuring hands-on projects and expert guidance."</p>
        </div>
        <div className="gallery-item">
          <video width="100%" controls>
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>"At our coaching center, we provide comprehensive training in versatile programming languages, helping students build a strong foundation in computer science."</p>
        </div>
        <div className="gallery-item">
          <video width="100%" controls>
            <source src={video3} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>"Join our coding academy where students learn essential programming skills through hands-on projects and industry-relevant curriculum."</p>
        </div>
      </div>
      
    </div>
  );
};

export default Gallery;
