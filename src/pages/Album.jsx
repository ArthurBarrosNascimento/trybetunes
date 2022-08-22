import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    album: [],
    loading: false,
    artistInfo: [],
  }

  componentDidMount() {
    this.fetchApiMusics();
  }

  fetchApiMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const musics = await musicsAPI(id);
    this.setState({
      album: musics.slice(1),
      loading: false,
      artistInfo: musics[0],
    });
  }

  render() {
    const { album, loading, artistInfo } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <h2 data-testid="artist-name">
              { `Cantor(a): ${artistInfo.artistName}` }
            </h2>
            <h3 data-testid="album-name">
              {`Album: ${artistInfo.collectionName}`}
            </h3>
            <div>
              <MusicCard album={ album } />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
