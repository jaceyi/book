import React from 'react';
import {searchBook} from '../requests';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    searchBook()
  }

  render() {
    return (
      <div>Index</div>
    )
  }
}

export default Index;
