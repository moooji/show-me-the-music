'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const LoadingIndicator = React.createClass({
  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
  },
  mixins: [PureRenderMixin],

  render() {
    return this.props.isLoading ? <div className="pulse"></div> : null;
  },
});

export default LoadingIndicator;
