import React, { Component } from 'react';
import Item from '../Item';
import './Bookmarks.css';

class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      input: ''
    };
    this.addBookmark = this.addBookmark.bind(this);
    this.clearList = this.clearList.bind(this);
  }
  addBookmark() {
    const { input: bookmark } = this.state;
    if (bookmark) {
      let list = JSON.parse(localStorage.getItem('list')) || [];
      list.push(bookmark);
      localStorage.setItem('list', JSON.stringify(list));
      this.renderList();
    }
  }
  clearList() {
    localStorage.removeItem('list');
    this.renderList();
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
  /** Each element can be uniquely identified by its index and deleted from the list */
  deleteItem(index){
    const list = JSON.parse(localStorage.getItem('list'));
    list.splice(index, 1 );
    localStorage.setItem('list', JSON.stringify(list));
    this.renderList();
  }
  render() {
    return (
      <div className="BookMarks">
        <h1>Bookmarks</h1>
        <input placeholder='please enter list item' 
          onChange={event => this.updateInput(event.target.value)}
          onKeyDown={(event) => {            
            if (event.keyCode === 13) {
              this.addBookmark();
              event.target.value = ' ';
              this.setState({ input: '' });
            }
          }
          }/>
        {/* <button onClick={this.addBookmark}>Add to list</button> */}
        <button onClick={this.clearList}>Clear list</button>
        <table>
          <tbody>
            {this.state.list && this.state.list.map((bookmark, index) => {
              return <Item key={index} bookmark={bookmark} onClick={() => this.deleteItem(index)} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Bookmarks;