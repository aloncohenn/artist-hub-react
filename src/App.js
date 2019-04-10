import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import HomeSearch from './components/HomeSearch/HomeSearch';
import HomeInfo from './components/HomeInfo/HomeInfo';
import Nav from './components/Nav/Nav';
import ArtistNameHeader from './components/ArtistNameHeader/ArtistNameHeader';
import WikipediaResults from './components/WikipediaResults/WikipediaResults';
import YouTubeResults from './components/YouTubeResults/YouTubeResults';
import TicketMasterResults from './components/TicketMasterResults/TicketMasterResults';
import NewsResults from './components/NewsResults/NewsResults';
import SocialMediaResults from './components/SocialMedaResults/SocialMediaResults';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HomeSearch />
        <HomeInfo />
        <Nav />
        <ArtistNameHeader />
        <WikipediaResults />
        <YouTubeResults />
        <TicketMasterResults />
        <NewsResults />
        <SocialMediaResults />
        <Footer />
      </div>
    );
  }
}

export default App;
