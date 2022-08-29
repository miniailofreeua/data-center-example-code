import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NonAuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.capitalizeFirstLetter.bind(this);
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  componentDidMount() {
    const getNameOfThePage = (pathname) => {
      const indexOfLastPath = pathname.lastIndexOf('/');
      const pageName = pathname.substring(indexOfLastPath);

      const actionPage = ['/create', '/edit'].find((a) => a === pageName);
      if (actionPage) {
        const previousPath = pathname.substring(0, indexOfLastPath);
        const previousPathIndex = previousPath.lastIndexOf('/');
        const pageName = previousPath.substring(previousPathIndex);

        return `${this.capitalizeFirstLetter(
          actionPage,
        )} ${this.capitalizeFirstLetter(pageName)}`;
      }

      return this.capitalizeFirstLetter(pageName);
    };

    const currentPage = getNameOfThePage(this.props.location.pathname);
    document.title = currentPage + ' | Data Center';
  }

  render() {
    return <>{this.props.children}</>;
  }
}

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default withRouter(NonAuthLayout);
