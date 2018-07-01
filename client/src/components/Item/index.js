import React, { Component } from 'react';

import './Item.css';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bookmark, onClick, editing, onDoubleClick, stopEditing, editError } = this.props;
      console.log('editError', editError);
    return (
      <tr>
        <td>
          {editing ? <input defaultValue={bookmark} onChange={onDoubleClick} onKeyDown={stopEditing} /> :
            <span onDoubleClick={onDoubleClick}> {bookmark}</span>}
        </td>
        <td>
          <button onClick={onClick}>delete</button>
        </td>
        <td>
          <p className='editError'>{editError}</p>
        </td>
      </tr>
    );
  }
}
export default Item;