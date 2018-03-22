import React, {Component} from 'react';
import axios from 'axios';

import {getFormValues} from '../../helpers';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      status: null,
    }
  }

  setToken = async (userCredentials) => {
    try {
      const response = await axios.post('http://localhost:3000/authenticate', userCredentials);
      const token = response.data.token;

      localStorage.setItem('token', token);

      this.setState(() => {
        return {status: 'Success! You have access to a data table'};
      });
    }
    catch (e) {
      this.setState(() => {
        return {status: 'Authentication failed'};
      });
      console.error(e);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const userCredentials = getFormValues(this);
    this.setToken(userCredentials);
    this.form.reset();
  };

  render() {
    return (
      <div className="card">
        {this.state.status}
        <div className="card-header">
          <h5>{this.props.title}</h5>
        </div>
        <form ref={el => this.form = el} onSubmit={this.handleSubmit}>
          <div className="card-body">
            <label className='label' htmlFor="Name">
              Name
            </label>
            <input
              className='form-control'
              type="text"
              name="name"
              ref="name"
            />
            <label
              className='label'
              htmlFor="Password">
              Password:
            </label>
            <input
              className='form-control'
              type="password"
              name="password"
              ref="password"
            />
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary"
              type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login
