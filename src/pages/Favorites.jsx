import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    loading: false,
  }

  componentDidMount() {
    this.songsFavorite();
  }

  songsFavorite = async () => {
    this.setState({ loading: true });
    const songsLocalStorege = await getFavoriteSongs();

    this.setState({
      favoriteSongs: songsLocalStorege,

    });
    this.setState({ loading: false });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return loading ? <Loading /> : (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        <MusicCard album={ favoriteSongs } functionFavorite={ this.songsFavorite } />
      </div>
    );
  }
}

export default Favorites;
