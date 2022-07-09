import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Loading } from '../components';
import Input from '../components/Input';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      name: '',
      email: '',
      description: '',
      image: '',
      canSaveEditUser: false,
      loading: false,
      shouldRedrect: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateRules = this.validateRules.bind(this);
    this.submitEditUser = this.submitEditUser.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  async componentDidMount() {
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({ user, name, email, description, image });
    if (user && name && email && description) this.setState({ canSaveEditUser: true });
  }

  handleInputChange({ target }) {
    const { name, value, type, checked: ckd } = target;
    if (type === 'checkbox') this.setState({ [name]: ckd }, () => this.validateRules());
    else this.setState({ [name]: value }, () => this.validateRules());
  }

  validateRules() {
    const {
      user,
      name,
      email,
      description,
      image,
    } = this.state;

    if (user && name && description && image && email) {
      this.setState({ canSaveEditUser: true });
    } else {
      this.setState({ canSaveEditUser: false });
    }
  }

  async submitEditUser() {
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image });
    this.setState({ shouldRedrect: true });
  }

  redirect() {
    const { loading } = this.state;
    if (loading) {
      this.setState({ shouldRedrect: true });
    } else {
      this.redirect();
    }
  }

  render() {
    const {
      user,
      name,
      email,
      description,
      image,
      canSaveEditUser,
      loading,
      shouldRedrect,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          !user && <Loading />
        }
        {
          user && !loading && (
            <div className="header-options">
              <Input
                value={ name }
                testid="edit-input-name"
                name="name"
                onChange={ this.handleInputChange }
                label="name"
              />
              <Input
                value={ email }
                testid="edit-input-email"
                name="email"
                onChange={ this.handleInputChange }
                label="email"
              />
              <Input
                value={ description }
                testid="edit-input-description"
                name="description"
                onChange={ this.handleInputChange }
                label="description"
              />
              <Input
                value={ image }
                testid="edit-input-image"
                name="image"
                onChange={ this.handleInputChange }
                label="image"
              />
              <button
                type="button"
                disabled={ !canSaveEditUser }
                data-testid="edit-button-save"
                onClick={ this.submitEditUser }
              >
                Salvar
              </button>
            </div>
          )
        }
        {
          loading && <Loading />
        }
        {
          shouldRedrect && loading && <Redirect to="/profile" />
        }
      </div>
    );
  }
}
