import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import MyContext from 'MyContext';

class Link extends React.Component {

  static contextType = MyContext;

  render() {
    if (this.context.isEmbed)
      return <ReactRouterLink target="_blank" {...this.props} />;
    else
      return <ReactRouterLink {...this.props} />;
  }

}

export default Link;
