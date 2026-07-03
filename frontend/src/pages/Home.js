import React, { useEffect, useState } from 'react';
import './Home.css';
import slide1 from '../assets/python.jpg';
import slide2 from '../assets/team.jpg';
import slide3 from '../assets/traning.webp';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* ── Parallax Hero Section ── */}
      <section className="hero-section">
        <div 
          className="hero-background"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        ></div>
        <div className="hero-content animate-slide-up">
          <span className="hero-badge delay-100">Future of Education</span>
          <h1 className="hero-title delay-200">
            Empower Your Learning Journey with <span className="text-accent">V-Cube</span>
          </h1>
          <p className="hero-subtitle delay-300">
            The elite software coaching platform designed for students, professionals, and visionaries aiming to soar in their careers.
          </p>
          <div className="hero-actions delay-400">
            <button className="btn-primary">Explore Courses</button>
            <button className="btn-secondary">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* ── 3D Interactive Features Grid ── */}
      <section className="features-section">
        <div className="section-header">
          <h2>Our Core Philosophy</h2>
          <p>Built for the modern era of competitive challenges.</p>
        </div>
        
        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-card3d">
            <div className="card-inner">
              <div className="card-image-wrapper">
                <img src={slide1} alt="Mission" />
              </div>
              <div className="card-content">
                <h3>Our Mission</h3>
                <p>Providing students with training in the world’s most exciting sectors to face competitive industry challenges.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card3d" style={{ animationDelay: '150ms' }}>
            <div className="card-inner">
              <div className="card-image-wrapper">
                <img src={slide2} alt="Vision" />
              </div>
              <div className="card-content">
                <h3>Our Vision</h3>
                <p>To create an evident aura of expertise that encompasses each graduate through direct quality instruction.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card3d" style={{ animationDelay: '300ms' }}>
            <div className="card-inner">
              <div className="card-image-wrapper">
                <img src={slide3} alt="Excellence" />
              </div>
              <div className="card-content">
                <h3>V Cube Excellence</h3>
                <p>The best software coaching center catering to students, businessmen, and freelancers in Hyderabad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
