import React, { Component } from 'react';
import { Header } from '../components';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target }) {
    const { value } = target;
    this.setState({ artistName: value });
  }

  render() {
    const { artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
