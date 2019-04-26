import React, { Component } from 'react';
import './App.css';
import AppContext from './AppContext';
import { fetchWiki, fetchYouTube, fetchTicketMaster } from './Service/Service'
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
    loading: true,
    wikiResults: {},
    youtubeResults: [],
    ticketmasterResults: [],
    newsResults: []
  };

  handleSubmit = (e, search) => {
    e.preventDefault();
    fetchYouTube(search)
      .then(response => {
        this.setState({
          youtubeResults: response
        })
      })
      .catch(err => console.log(err));

    fetchWiki(search)
      .then(response => {
        this.setState({
          wikiResults: response
        })
      })
      .catch(err => console.log(err))

    fetchTicketMaster(search)
      .then(response => {
        this.setState({
          ticketmasterResults: response
        })
      })
      .catch(err => console.log(err))

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
