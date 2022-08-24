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
    email: '',
    description: '',
    image: '',
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
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    this.setState({ loadingApi: true });
    await createUser({ name, email, description, image });
    this.setState({ loadingApi: false, redirectPage: true });
  }

  render() {
    const {
      name,
      loadingApi,
      redirectPage,
      email,
      description,
      image,
    } = this.state;
    const CHARACTERS_MAX = 3;

    if (redirectPage) {
      return <Redirect to="/search" />;
    }

    return loadingApi ? <Loading /> : (
      <div data-testid="page-login">
        Login
        <label htmlFor="name">
          Name
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
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Type it your Email"
            onChange={ this.inputChange }
            value={ email }
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Description"
            onChange={ this.inputChange }
            value={ description }
          />
        </label>
        <label htmlFor="image">
          Image
          <input
            type="text"
            id="image"
            name="image"
            value={ image }
            onChange={ this.inputChange }
            placeholder="image"
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
