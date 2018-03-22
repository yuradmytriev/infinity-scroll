import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import normalizeCss from 'normalize.css';

import coreUI from './../../../scss/style.scss';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
            <div className="container-fluid">
              <div className="wrapper">
                {this.props.children}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, coreUI)(Layout);
