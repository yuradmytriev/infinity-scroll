import React from 'react';

import config from './../../config';

import {sendData, getFormValues} from '../../helpers';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      status: null,
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = getFormValues(this);
    const link = `${config.api.serverUrl}/register`;

    try {
      const response = await sendData(link, data);
      console.info(response.data);

      this.setState(() => {
        return {status: 'User created successfully'};
      });
    }
    catch (err) {
      console.error(err);

      this.setState(() => {
        return {status: 'Registration failed'};
      });
    }

    this.form.reset();
  };

  render() {
    return (
      <div className="card">
        {this.state.status}
        <div className="card-header">
          <h5>{this.props.title}</h5>
        </div>
        <form
          ref={el => this.form = el}
          onSubmit={this.handleSubmit}>
          <div className="card-body">
            <label
              htmlFor="name">
              Name
            </label>
            <input
              ref="name"
              name="name"
              className="form-control"
            />
            <label
              htmlFor="password">
              Password
            </label>
            <input
              ref="password"
              name="password"
              className="form-control"
              type="password"
            />
          </div>
          <div className="card-footer">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
