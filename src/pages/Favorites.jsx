import React, { Component } from 'react';
import { Header } from '../components';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: null,
    };
  }

  async componentDidMount() {
    const favorites = getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        
      </div>
    );
  }
}
