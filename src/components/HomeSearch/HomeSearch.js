import React, { Component } from 'react';
import AppContext from '../../AppContext';

class HomeSearch extends Component {
  static contextType = AppContext;

  state = {
    search: '',
    loading: true,
    wikiResults: null,
  };

  updateSearch = e => {
    this.setState({
      search: e.target.value
    });
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={e => {this.context.handleSubmit(e, this.state.search)}}
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
