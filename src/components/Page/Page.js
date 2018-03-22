import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  };

  render() {
    const { title, html } = this.props;
    return (
      <div>
        <div>
          <h1>{title}</h1>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
}

export default Page;
