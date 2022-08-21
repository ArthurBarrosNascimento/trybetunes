import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFond from './NotFond';

class Home extends Component {
  render() {
    return (
      <div>
        <Route exact path="/"><Login /></Route>
        <Route exact path="/search"><Search /></Route>
        <Route exact path="/album/:id"><Album /></Route>
        <Route exact path="/favorites"><Favorites /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route exact path="/profile/edit"><ProfileEdit /></Route>
        <Route><NotFond /></Route>
      </div>
    );
  }
}

export default Home;
