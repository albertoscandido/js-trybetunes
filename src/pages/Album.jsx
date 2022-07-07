import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Loading } from '../components';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import AlbumCard from '../components/AlbumCard';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: null,
      loading: false,
      favorites: [],
    };

    this.isLoading = this.isLoading.bind(this);
    this.handleAddSongToFavorites = this.handleAddSongToFavorites.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({ musics, favorites });
  }

  async handleAddSongToFavorites(music) {
    const { favorites } = this.state;
    this.isLoading(true);
    this.setState({ favorites: [...favorites, music] });
    await addSong(music);
    this.isLoading(false);
  }

  isLoading(bool) {
    this.setState({ loading: bool });
  }

  render() {
    const {
      musics,
      loading,
      favorites,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {
          loading && <Loading />
        }
        {
          musics && !loading && (
            <AlbumCard album={ musics[0] } />
          )
        }
        {
          musics && !loading && (
            musics.slice(1)
              .map((music) => (
                <MusicCard
                  music={ music }
                  key={ music.trackId }
                  handleAddSongToFavorites={ this.handleAddSongToFavorites }
                  checked={ favorites.some(({ trackId }) => trackId === music.trackId) }
                />
              ))
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
