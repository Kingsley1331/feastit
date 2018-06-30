import React, { Component } from 'react';
import './Bookmarks.css';

class Bookmarks extends Component {
  render() {
    return (
      <div className="BookMarks">
        <h1>Bookmarks</h1>
        <input placeholder='please enter list item'/><button>Add to list</button>
      </div>
    );
  }
}

export default Bookmarks;