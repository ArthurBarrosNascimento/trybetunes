import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    favoritesSongs: [],
    loading: false,
  }

  componentDidMount() {
    this.songsFavorite();
  }

  songsFavorite = async () => {
    this.setState({ loading: true });
    const songsLocalStorege = await getFavoriteSongs();

    this.setState({
      favoritesSongs: songsLocalStorege,

    });
    this.setState({ loading: false });
  }

  favoriteSong = async (trackId, { target }) => {
    const { album } = this.props;
    const { checked } = target;
    this.setState({ loading: true });

    const songFavoriteChecked = album.find((song) => song.trackId === trackId);
    if (checked) {
      await addSong(songFavoriteChecked);
    } else {
      await removeSong(songFavoriteChecked);
    }
    this.songsFavorite();
  }

  ableChecked = (trackId) => {
    const { favoritesSongs } = this.state;

    const result = favoritesSongs.some((song) => song.trackId === trackId);

    return result;
  }

  render() {
    const { album } = this.props;
    const { loading } = this.state;

    return (loading ? <Loading /> : (
      <div>
        {album.map(({ previewUrl, trackId, trackName }) => (
          <ul key={ trackId }>
            <li>
              <h2>{ trackName }</h2>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
            </li>
            <label htmlFor="favorite-music">
              Favorita
              <input
                type="checkbox"
                id="favorite-music"
                name="favorite-music"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ this.ableChecked(trackId) }
                onChange={ (event) => this.favoriteSong(trackId, event) }
              />
            </label>
          </ul>
        ))}
      </div>
    ));
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  })).isRequired,
};

export default MusicCard;
