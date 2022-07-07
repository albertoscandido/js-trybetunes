import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albums: null,
      searchedArtist: null,
      // albumsWereSearched: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
    this.renderAlbuns = this.renderAlbuns.bind(this);
  }

  handleInputChange({ target }) {
    const { value } = target;
    this.setState({ artistName: value });
  }

  async searchAlbums() {
    const { artistName } = this.state;
    this.setState({ artistName: '', searchedArtist: artistName });
    const albums = await searchAlbumsAPI(artistName);
    this.setState({ albums });
  }

  renderAlbuns() {
    const {
      albums,
      searchedArtist,
    } = this.state;
    if (!albums) return null;

    return albums.length > 0 ? (
      <div>
        <h2>
          Resultado de álbuns de:
          { ` ${searchedArtist}` }
        </h2>
        {
          albums.map(({
            collectionId,
            artistName,
            collectionName,
            artworkUrl100,
          }) => (
            <Link
              to={ `/album/${collectionId}` }
              key={ collectionId }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <div>
                <img src={ artworkUrl100 } alt={ collectionName } />
                <h3>{collectionName}</h3>
                <h4>{artistName}</h4>
              </div>
            </Link>))
        }
      </div>
    ) : (<h2>Nenhum álbum foi encontrado</h2>);
  }

  render() {
    const {
      artistName,
      albums,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ artistName }
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < 2 }
            onClick={ this.searchAlbums }
          >
            Pesquisar
          </button>
        </div>
        {
          albums && this.renderAlbuns()
        }
      </div>
    );
  }
}
