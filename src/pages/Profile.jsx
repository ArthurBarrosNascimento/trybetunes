import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    user: [],
    loading: false,
  }

  componentDidMount() {
    this.infoUserAPI();
  }

  infoUserAPI = async () => {
    this.setState({
      loading: true,
    });
    const infoUser = await getUser();
    this.setState({
      user: [infoUser],
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;

    console.log(user);
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
        { loading ? <Loading /> : (user.map((info) => (
          <div key={ info.name }>
            <ul>
              <li>
                <img src={ info.image } alt={ info.name } data-testid="profile-image" />
              </li>
              <li>{ info.name }</li>
              <li>{ info.email }</li>
              <li>{ info.description }</li>
            </ul>

            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )))}
      </div>
    );
  }
}

export default Profile;
