import React, { Component } from 'react';

import './Item.css';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bookmark, onClick} = this.props;
    return (
      <tr>
        <td>{bookmark}</td>
        <td>
          <button onClick={onClick}>delete</button>
        </td>
      </tr>
    );
  }
}
export default Item;