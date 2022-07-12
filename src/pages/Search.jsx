import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { ReactComponent as SearchImage } from '../svg/search.svg';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albums: null,
      searchedArtist: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
    this.renderAlbuns = this.renderAlbuns.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handlekeypress = this.handlekeypress.bind(this);
  }

  handleSubmitForm(event) {
    event.preventDefault();
  }

  handleInputChange({ target }) {
    const { value } = target;
    this.setState({ artistName: value });
  }

  handlekeypress(event) {
    if (event.key === 'Enter') {
      this.searchAlbums();
    }
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
    } = this.state;
    if (!albums) return null;

    return albums.length > 0 ? (
      <>
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
              <AlbumCard
                album={ { collectionId, artistName, collectionName, artworkUrl100 } }
                className="album-search"
              />
            </Link>))
        }
      </>
    ) : (<h2>Nenhum álbum foi encontrado</h2>);
  }

  render() {
    const {
      artistName,
      albums,
      searchedArtist,
    } = this.state;

    return (
      <div data-testid="page-search" className="page-search">
        <Header
          location="search"
        />
        <form
          className="form-search"
          onSubmit={ this.handleSubmitForm }
        >
          <input
            type="text"
            data-testid="search-artist-input"
            value={ artistName }
            onChange={ this.handleInputChange }
            onKeyPress={ this.handlekeypress }
            placeholder="Nome do Artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < 2 }
            onClick={ this.searchAlbums }
          >
            <SearchImage />
          </button>
        </form>
        {
          searchedArtist && albums && (
            <div className="result-text">
              <h2>
                Resultado de álbuns de
                { ` ${searchedArtist}` }
                :
              </h2>
            </div>
          )
        }
        <div className="albums-list">
          {
            albums && this.renderAlbuns()
          }
        </div>
      </div>
    );
  }
}
