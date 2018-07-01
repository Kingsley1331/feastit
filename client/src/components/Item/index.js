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
                {editing ? <div><input defaultValue={bookmark} onChange={editBookmark} onKeyDown={stopEditing} /><p className='editError'>{editError}</p></div> :
            <span onDoubleClick={editBookmark}> {bookmark}</span>
          }
         
        </td>
        <td className='delete'>
          <button className='button' onClick={onClick}>delete</button>
        </td>
        {/* <td>
          <p className='editError'>{editError}</p>
        </td> */}
      </tr>
    );
  }
}
export default Item;