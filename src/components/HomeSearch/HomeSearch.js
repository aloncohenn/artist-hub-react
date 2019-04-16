import React, { Component } from 'react';

class HomeSearch extends Component {

  state = {
    search: '',
    wikiResults: null,
  };

  handleSubmit = (e, search) => {
    e.preventDefault();
    this.fetchWiki(search);
  };

  updateSearch = e => {
    this.setState({
      search: e.target.value
    });
  };

  generateCapitalStringWiki = search => {
    let inputArray = search.split(' ');
    inputArray = inputArray.map(word => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  
    search = inputArray.join(' ');
    return search;
  };
  
  disambiguationFetchWiki = search => {
      console.log('disambiguation ran');
      const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + search;
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(responseJson => {
          console.log(responseJson)
          this.setState({wikiResults: responseJson});
        })
        .catch(error => console.log(error));
    };
  
  fetchWiki = (search) => {
      console.log('fetchWiki ran');
      search = this.generateCapitalStringWiki(search);
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
            this.disambiguationFetchWiki(search);
          }
          if (responseJson.coordinates) {
            search += ' (band)';
            this.disambiguationFetchWiki(search);
          }
          this.setState({wikiResults: responseJson});
        })
        .catch(error => console.log(error));
    };

  render() {
    return (
      <form
        className="form"
        onSubmit={e => {this.handleSubmit(e, this.state.search)}}
      >
        <input
          type="text"
          placeholder="Want some suggestions?"
          id="search"
          onChange={this.updateSearch}
        />
        <button type="submit" id="submit-button">
          Go
        </button>
      </form>
    );
  }
}

export default HomeSearch;
