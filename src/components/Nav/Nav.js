import React from 'react';

const Nav = () => {
  return (
    <nav id="navigation">
      <button id="wiki-results-nav" className="nav-button">
        Wikipedia
      </button>
      <button id="youtube-results-nav" className="nav-button">
        Youtube
      </button>
      <button id="ticketmaster-results-nav" className="nav-button">
        Ticketmaster
      </button>
      <button id="music-links-nav" className="nav-button">
        Social Media
      </button>
      <button id="artist-news-nav" className="nav-button">
        News
      </button>
    </nav>
  );
};

export default Nav;
