import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      music,
      className,
      checked,
      handleAddSongToFavorites,
    } = this.props;
    const {
      trackName,
      previewUrl,
      trackId,
    } = music;
    return (
      <div className={ className }>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          type="checkbox"
          onChange={ () => handleAddSongToFavorites(music, checked) }
          data-testid={ `checkbox-music-${trackId}` }
          checked={ checked }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  className: PropTypes.string,
  // testid: PropTypes.string,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  handleAddSongToFavorites: PropTypes.func,
  checked: PropTypes.bool,
};

MusicCard.defaultProps = {
  className: '',
  handleAddSongToFavorites: () => {},
  checked: false,
  // testid: '',
};
