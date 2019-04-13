import React, { Component } from 'react';
import Header from '../Header/Header';
import HomeSearch from '../HomeSearch/HomeSearch';
import HomeInfo from '../HomeInfo/HomeInfo';
import Nav from '../Nav/Nav';

class LandingPage extends Component {
  render() {
    return (
      <>
        <Header />
        <HomeSearch />
        <HomeInfo />
        <Nav />
      </>
    );
  }
}

export default LandingPage;
