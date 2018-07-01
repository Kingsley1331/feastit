import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Item.css';

class Item extends Component {
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

Item.propTypes = {
  bookmark: PropTypes.string,
  onClick: PropTypes.func,
  editing: PropTypes.bool,
  editBookmark: PropTypes.func,
  stopEditing: PropTypes.func,
  editError: PropTypes.string
};

export default Item;