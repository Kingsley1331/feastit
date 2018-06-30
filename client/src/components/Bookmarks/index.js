import React, { Component } from 'react';
import './Bookmarks.css';

class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      input: ''
    };
    this.addBookmark = this.addBookmark.bind(this);
  }
  addBookmark() {
    const { input: bookmark } = this.state;
    let list = JSON.parse(localStorage.getItem('list')) || [];
    list.push(bookmark);
    localStorage.setItem('list', JSON.stringify(list));
    this.renderList();
  }
  clearList() {
    localStorage.removeItem('list');
  }
  renderList() {
    const list = JSON.parse(localStorage.getItem('list'));
    this.setState({list});
  }
  componentDidMount(){
    this.renderList();
  }
  updateInput(input){
    this.setState({ input });
  }
  render() {
    return (
      <div className="BookMarks">
        <h1>Bookmarks</h1>
        <input placeholder='please enter list item' onChange={(event) => {
          const value = event.target.value;
          this.updateInput(value);} }/>
        <button onClick={this.addBookmark}>Add to list</button>
        <button onClick={this.clearList}>Clear list</button>
        {this.state.list && this.state.list.map((bookmark, index) => {
          return <li key={index}>{bookmark}</li>
        })}
      </div>
    );
  }
}

export default Bookmarks;