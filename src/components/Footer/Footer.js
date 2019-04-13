import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-flex">
        <p>
          Built by: <a href="https://github.com/cohencodes">@cohencodes</a>
          <a href="https://github.com/jonespi">@jonespi</a>
        </p>
        <a href="javascript:" id="scroll-button">
          <i className="far fa-arrow-alt-circle-up" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
