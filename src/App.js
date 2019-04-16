import React, { Component } from 'react';
import './App.css';
import AppContext from './AppContext';
import LandingPage from './components/LandingPage/LandingPage';
import ArtistNameHeader from './components/ArtistNameHeader/ArtistNameHeader';
import WikipediaResults from './components/WikipediaResults/WikipediaResults';
import YouTubeResults from './components/YouTubeResults/YouTubeResults';
import TicketMasterResults from './components/TicketMasterResults/TicketMasterResults';
import NewsResults from './components/NewsResults/NewsResults';
import SocialMediaResults from './components/SocialMedaResults/SocialMediaResults';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    wikiResults: null,
    youtubeResults: [],
    ticketmasterResults: [],
    newsResults: [],
    socialMediaResults: []
  };

  getWikiData = (wikiResults) => {
    this.setState({wikiResults});
  }
  
  render() {
    const contextValue = {
      handleSubmit: this.handleSubmit,
      getWikiData: this.getWikiData
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
