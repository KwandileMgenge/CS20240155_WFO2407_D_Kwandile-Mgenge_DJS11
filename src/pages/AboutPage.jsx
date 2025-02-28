import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

function AboutPage() {
  return (
    <div className="about-page">
      <Logo/>
      <h1>About This Project</h1>
      <p>
        Welcome to the Podcast Explorer app! This project is designed to help users discover and enjoy podcasts from a variety of genres and shows. Whether you're a casual listener or a podcast enthusiast, our app provides an easy way to explore, filter, and play podcasts based on your preferences.
      </p>

      <h2>Features</h2>
      <ul>
        <li><strong>Browse Podcasts:</strong> Discover new podcasts and explore episodes.</li>
        <li><strong>Seasonal Navigation:</strong> Navigate through different seasons of your favorite shows.</li>
        <li><strong>Custom Audio Player:</strong> Listen to episodes with a built-in audio player that shows progress.</li>
        <li><strong>Search & Filter:</strong> Find podcasts based on title, genre, or fuzzy matching.</li>
        <li><strong>Responsive Design:</strong> Fully optimized for mobile, tablet, and desktop devices.</li>
      </ul>

      <h2>Technologies Used</h2>
      <p>This project is built with the following technologies:</p>
      <ul>
        <li><strong>React:</strong> For building the user interface and handling state.</li>
        <li><strong>React Router:</strong> For navigation and routing between pages.</li>
        <li><strong>React Query:</strong> For data fetching and caching.</li>
        <li><strong>CSS:</strong> For styling and layout design (with a responsive design approach).</li>
      </ul>

      <h2>Contact</h2>
      <p>
        If you have any questions, suggestions, or feedback, feel free to reach out to me:
      </p>
      <ul>
        <li>Email: <a href="mailto:kwandilen.mgenge@gmail.com">kwandilen.mgenge@gmail.com</a></li>
        <li>GitHub: <a href="https://github.com/KwandileMgenge" target="_blank" rel="noopener noreferrer">https://github.com/KwandileMgenge</a></li>
      </ul>

      <h2>Back to Home</h2>
      <Link to="/" className="back-to-home-link">
        Go back to the homepage
      </Link>
    </div>
  );
}

export default AboutPage;