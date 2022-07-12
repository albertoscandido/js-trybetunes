import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AlbumCard extends Component {
  render() {
    const { album, className } = this.props;
    const {
      artworkUrl100,
      collectionName,
      artistName,
    } = album;
    return (
      <div className={ className }>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <div className="flex-column g-05">
          <h3 data-testid="album-name">{collectionName}</h3>
          <h4 data-testid="artist-name">{artistName}</h4>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  className: PropTypes.string,
  album: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
  }).isRequired,
};

AlbumCard.defaultProps = {
  className: '',
};
