import React, { Component } from 'react';
import { Header, Loading } from '../components';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: null,
      loading: false,
    };

    this.handleAddSongToFavorites = this.handleAddSongToFavorites.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  async handleAddSongToFavorites(music, isItToRemove) {
    const { favorites } = this.state;
    this.isLoading(true);
    if (isItToRemove) {
      this.setState(
        { favorites: favorites.filter(({ trackId }) => trackId !== music.trackId) },
      );
      await removeSong(music);
    } else {
      this.setState({ favorites: [...favorites, music] });
      await addSong(music);
    }
    this.isLoading(false);
  }

  isLoading(bool) {
    this.setState({ loading: bool });
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading && <Loading />
        }
        {
          !favorites && <Loading />
        }
        {
          favorites && !loading && favorites.map(
            (music) => (
              <MusicCard
                music={ music }
                key={ music.trackId }
                checked
                handleAddSongToFavorites={ this.handleAddSongToFavorites }
              />
            ),
          )
        }
      </div>
    );
  }
}
