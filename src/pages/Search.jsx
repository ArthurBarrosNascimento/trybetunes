import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    nameOfArtistOrBand: '',
    loading: false,
    artist: [],
    artistSearch: '',
  }

  inputChange = ({ target }) => {
    const { value } = target;

    this.setState({
      nameOfArtistOrBand: value,
    });
  }

  clearInput = () => {
    this.setState({
      nameOfArtistOrBand: '',
    });
  }

  saveButton = async () => {
    const { nameOfArtistOrBand } = this.state;
    this.setState({ loading: true });
    const artistRequest = await searchAlbumsAPI(nameOfArtistOrBand);
    this.setState({
      loading: false,
      artist: artistRequest,
      artistSearch: nameOfArtistOrBand,
    });

    this.clearInput();
  }

  render() {
    const { nameOfArtistOrBand, loading, artist, artistSearch } = this.state;
    const CHARACTERS_MAX = 2;

    return (
      <div data-testid="page-search">
        <Header />
        Search

        {!loading ? (
          <div>
            <label htmlFor="search-artista">
              <input
                type="text"
                id="search-artista"
                name="nameOfArtistOrBand"
                data-testid="search-artist-input"
                value={ nameOfArtistOrBand }
                onChange={ this.inputChange }
                placeholder="Search Artist or Band"
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ this.saveButton }
              disabled={ nameOfArtistOrBand.length < CHARACTERS_MAX }
            >
              Pesquisar
            </button>
            {artistSearch.length > 0 && (
              <h2>
                { `Resultado de álbuns de: ${artistSearch}`}
              </h2>
            )}
            {artistSearch.length > 0 && artist.length > 0
              ? artist.map(({
                artistId,
                artistName,
                collectionName,
                artworkUrl100,
                collectionId,
              }) => (
                <div key={ collectionId }>
                  <h2>{ collectionName }</h2>
                  <img src={ artworkUrl100 } alt={ artistId } />
                  <h4>{ artistName }</h4>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    Album
                  </Link>
                </div>
              )) : <p>Nenhum álbum foi encontrado</p>}
          </div>
        ) : <Loading />}

      </div>
    );
  }
}

export default Search;
