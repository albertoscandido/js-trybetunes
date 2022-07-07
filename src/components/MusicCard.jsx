import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { music, className } = this.props;
    const {
      trackName,
      previewUrl,
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
  }).isRequired,
};

MusicCard.defaultProps = {
  className: '',
  // testid: '',
};
