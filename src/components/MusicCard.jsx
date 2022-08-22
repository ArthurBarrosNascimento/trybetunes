import React, { Component } from 'react';

class MusicCard extends Component {
  state = {
  }

  render() {
    const { album } = this.props;
    console.log(album);
    return (
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
          </ul>
        ))}
      </div>
    );
  }
}

export default MusicCard;
