import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../components';
import getMusics from '../services/musicsAPI';
import AlbumCard from '../components/AlbumCard';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: null,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musics });
  }

  render() {
    const {
      musics,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {
          musics && (
            <AlbumCard album={ musics[0] } />
          )
        }
        {
          musics && (
            musics.slice(1)
              .map((music) => <MusicCard music={ music } key={ music.trackId } />)
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
