import React from 'react';

const HomeSearch = () => {
  return (
    <form role="form" className="form">
      <input type="text" placeholder="Want some suggestions?" id="search" />
      <button type="submit" id="submit-button">
        Go
      </button>
    </form>
  );
};

export default HomeSearch;
