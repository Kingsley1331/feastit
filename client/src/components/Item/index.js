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
        <td onDoubleClick={editBookmark}>
          {editing ? <div><input defaultValue={bookmark} onChange={editBookmark} onKeyDown={stopEditing} />
            <p className='error'>{editError}</p></div> :
            <span> {bookmark}</span>
          }
        </td>
        <td className='delete'>
          <button className='button' onClick={onClick}>delete</button>
        </td>
      </tr>
    );
  }
}
export default Item;