import React, { Component } from 'react';
import {connect} from 'react-redux';

import './RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    phone_number: '',
    payment_username: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          phone_number: this.state.phone_number,
          payment_username: this.state.payment_username,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="registerPage">
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h2>Become A Event-Portfolio User Today!</h2>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                placeholder='Full Email Address'
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                placeholder='8+ characters'
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                placeholder='Full Name'
                value={this.state.name}
                onChange={this.handleInputChangeFor('name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="name">
              Phone Number:
              <input
                type="text"
                name="phone_number"
                placeholder='Phone Number'
                value={this.state.phone_number}
                onChange={this.handleInputChangeFor('phone_number')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Venmo Username:
              <input
                type="text"
                name="payment_username"
                placeholder='Venmo'
                value={this.state.payment_username}
                onChange={this.handleInputChangeFor('payment_username')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
          <br />
          <center>
            <button
              type="button"
              className="link-button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
            >
              Login
          </button>
          </center>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

