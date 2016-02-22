'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const LoadingIndicator = React.createClass({
  propTypes: {
    message: React.PropTypes.string,
    isLoading: React.PropTypes.bool.isRequired,
  },
  mixins: [PureRenderMixin],

  render() {
    if (!this.props.isLoading) {
      return (null);
    }

    return (<div className="pulse"/>);
  },
});

export default LoadingIndicator;
