import React, { Component } from 'react';
import Item from '../Item';
import './Bookmarks.css';

class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      input: '',
      editIndex: false
    };
    this.addBookmark = this.addBookmark.bind(this);
    this.clearList = this.clearList.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
  }
  addBookmark() {
    const { input: bookmark } = this.state;
    // console.log('bookmark', bookmark);
    // console.log(this.isUrl(bookmark));
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
  componentDidMount() {
    this.renderList();
  }
  updateInput(input) {
    this.setState({ input });
  }
  /** Each element can be uniquely identified by its index and deleted from the list */
  deleteItem(index) {
    const list = JSON.parse(localStorage.getItem('list'));
    list.splice(index, 1 );
    localStorage.setItem('list', JSON.stringify(list));
    this.renderList();
  }
  editItem(editIndex, value) {
    this.setState({ editIndex });
    if (value) {
      const list = JSON.parse(localStorage.getItem('list'));
      list[editIndex] = value;
      localStorage.setItem('list', JSON.stringify(list));
      this.renderList();
    }
  }
  isUrl(url) {
    const regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
  }

  stopEditing(event) {
    if (event.keyCode === 13) {
      this.addBookmark();
      event.target.value = null;
      this.setState({ editIndex: false });
    }
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
              event.target.value = null;
              this.setState({ input: '' });
            }
          }
          }/>
        <button onClick={this.clearList}>Clear list</button>
        <table>
          <tbody>
            {this.state.list && this.state.list.map((bookmark, index) => {
              return <Item key={index}
                bookmark={bookmark} 
                editing={this.state.editIndex === index} 
                onClick={() => this.deleteItem(index)}
                stopEditing={this.stopEditing}
                onDoubleClick={(event) => { this.editItem(index, event.target.value); }}
              />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Bookmarks;