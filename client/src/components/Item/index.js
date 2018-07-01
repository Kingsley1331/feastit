import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bookmark, onClick, editing, editBookmark, stopEditing, editError } = this.props;
    return (
      <tr>
        <td>
          {editing ? <input defaultValue={bookmark} onChange={editBookmark} onKeyDown={stopEditing} /> :
            <span onDoubleClick={editBookmark}> {bookmark}</span>}
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