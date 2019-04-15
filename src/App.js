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

  formatQueryParams = params => {
    const queryItems = Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join('&');
  };

  fetchWiki = search => {
    search = this.generateCapitalString(search);
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + search;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        if (responseJson.type === 'disambiguation') {
          search += ' (musician)';
          this.disambiguationFetch(search);
        }
        if (responseJson.coordinates) {
          search += ' (band)';
          this.disambiguationFetch(search);
        }
        console.log(responseJson);
      })
      .catch(error => console.log(error));
  };

  disambiguationFetch = search => {
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + search;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => console.log(responseJson))
      .catch(error => console.log(error));
  };

  generateCapitalString = search => {
    let inputArray = search.split(' ');
    inputArray = inputArray.map(word => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });

    search = inputArray.join(' ');
    return search;
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
