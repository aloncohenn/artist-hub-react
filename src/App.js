import React, { Component } from 'react';
import './App.css';
import AppContext from './AppContext';
import LandingPage from './components/LandingPage/LandingPage';
import ArtistNameHeader from './components/ArtistNameHeader/ArtistNameHeader';
import WikipediaResults from './components/WikipediaResults/WikipediaResults';
import { fetchWiki } from './Service/Service'
import YouTubeResults from './components/YouTubeResults/YouTubeResults';
import TicketMasterResults from './components/TicketMasterResults/TicketMasterResults';
import NewsResults from './components/NewsResults/NewsResults';
import SocialMediaResults from './components/SocialMedaResults/SocialMediaResults';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    wikiResults: {},
    youtubeResults: [],
    ticketmasterResults: [],
    newsResults: [],
    socialMediaResults: []
  };

  handleSubmit = (e, search) => {
    e.preventDefault();
    console.log('form submitted', search);
    fetchWiki(search);
  };
  
  render() {
    const contextValue = {
      handleSubmit: this.handleSubmit
    };
    return (
      <AppContext.Provider value={contextValue}>
        <div className="App">
          <LandingPage />
          <ArtistNameHeader />
          <WikipediaResults />
          <YouTubeResults />
          <TicketMasterResults />
          <NewsResults />
          <SocialMediaResults />
          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
