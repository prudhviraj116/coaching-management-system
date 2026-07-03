// src/components/Ebooks.js
import React from 'react';
import './Ebooks.css';
import Dashboardbutton from '../components/Dashboardbutton';

const ebooks = [
  {
    title: 'Learning React',
    author: 'Alex Banks & Eve Porcello',
    description: 'A hands-on guide to building web applications using React and Redux.',
    image: 'path/to/learning-react.jpg',
  },
  {
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    description: 'Unearthing the excellence in JavaScript.',
    image: 'path/to/javascript-good-parts.jpg',
  },
  {
    title: 'Python for Data Analysis',
    author: 'Wes McKinney',
    description: 'Data wrangling with Pandas, NumPy, and IPython.',
    image: 'path/to/python-data-analysis.jpg',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship.',
    image: 'path/to/clean-code.jpg',
  },
  {
    title: 'You Don\'t Know JS',
    author: 'Kyle Simpson',
    description: 'A book series on JavaScript that explores the language in depth.',
    image: 'path/to/you-dont-know-js.jpg',
  },
];

const Ebooks = () => {
  return (
    <div className="ebooks-container">
      <h1 className="ebooks-title">Our Ebooks</h1>
      <div className="ebooks-list">
        {ebooks.map((ebook, index) => (
          <div key={index} className="ebook-card">
            <img src={ebook.image} alt={ebook.title} className="ebook-image" />
            <h2 className="ebook-title">{ebook.title}</h2>
            <p className="ebook-author">by {ebook.author}</p>
            <p className="ebook-description">{ebook.description}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Ebooks;
