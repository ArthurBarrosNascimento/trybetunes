import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.saveButton = this.saveButton.bind(this);
  }

  state = {
    name: '',
    loadingApi: false,
    redirectPage: false,
  }

  inputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  async saveButton() {
    const { name } = this.state;
    this.setState({ loadingApi: true });
    await createUser({ name });
    this.setState({ loadingApi: false, redirectPage: true });
  }

  render() {
    const { name, loadingApi, redirectPage } = this.state;
    const CHARACTERS_MAX = 3;

    if (redirectPage) {
      return <Redirect to="/search" />;
    }

    return loadingApi ? <Loading /> : (
      <div data-testid="page-login">
        Login
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.inputChange }
            placeholder="Type it your Name"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ name.length < CHARACTERS_MAX }
          onClick={ this.saveButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
