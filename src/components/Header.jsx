import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: {
      name: '',
    },
    loading: false,
  };

  componentDidMount() {
    this.requestUserAPI();
  }

  requestUserAPI = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        Header

        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>

        {!loading
          ? <p data-testid="header-user-name">{ user.name}</p> : <Loading />}
      </header>
    );
  }
}

export default Header;
