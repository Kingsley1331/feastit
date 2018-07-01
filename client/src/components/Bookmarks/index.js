import React, { Component } from 'react';
import Item from '../Item';
import './Bookmarks.css';

class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      input: '',
      editInput: {},
      editIndex: false,
      inputError: '',
      editError: {}
    };
    this.addBookmark = this.addBookmark.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  addBookmark() {
    const { input: bookmark } = this.state;
    if (bookmark && this.isUrl(bookmark)) { // checks if bookmark in not empty and a valid url
      let list = JSON.parse(localStorage.getItem('list')) || [];
      list.push(bookmark);
      localStorage.setItem('list', JSON.stringify(list));
      this.renderList();
    } else if (bookmark && !this.isUrl(bookmark)) { // if a bookmark has been entered and its not valid
      this.setState({ inputError: 'Please enter a valid url' });
    }
  }
  
  editItem(editIndex, value) {
    const isValid = this.isUrl(value);
    const errorMessage = !value || isValid ? '' : 'Please enter a valid url';  // only display error message if the value is defined and is a valid url
    this.setState({ editIndex, editInput: { [editIndex]: value }, editError: { [editIndex]: errorMessage} });
    if (value && isValid) {
      const list = JSON.parse(localStorage.getItem('list'));
      list[editIndex] = value;
      localStorage.setItem('list', JSON.stringify(list));
      this.renderList();
    } 
  }

  stopEditing(event, index) {
    if (event.keyCode === 13 && !this.state.editError[index]) { //if the enter key is pressed and the bookmark has no errors
      event.target.value = null;
      this.setState({ editIndex: false });
    }
  }
  
  clearList() {
    localStorage.removeItem('list');
    this.renderList();
  }
  
  // renderList: purpose of this function is to make sure that state is updated with all the latest changes to local storage
  renderList(inputError) {
    const list = JSON.parse(localStorage.getItem('list'));
    this.setState({ list, inputError });
  }

  componentDidMount() {
    this.renderList();
  }

  updateInput(input) {
    this.setState({ input });
  }

  // Each element can be uniquely identified by its index and deleted from the list
  deleteItem(index) {
    const list = JSON.parse(localStorage.getItem('list'));
    list.splice(index, 1 );
    localStorage.setItem('list', JSON.stringify(list));
    this.renderList();
  }

  isUrl(url) {
    const regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
  }

  render() {
    return (
      <div className="BookMarks">
        <h1>Bookmarks</h1>
        <input placeholder='Enter item and press return' 
          onChange={event => this.updateInput(event.target.value)}
          onKeyDown={(event) => {            
            if (event.keyCode === 13) { // checks if 'return' is pressed on the keyboard
              this.addBookmark();
              event.target.value = null;
              this.setState({ input: '' });
            }
          }}/>
        <button className='clearList' onClick={this.clearList}>Clear list</button>
        <p className='error'>{this.state.inputError}</p>
        <p className='hint'>Double click on bookmark to edit and press return to submit</p>
        <table>
          <tbody>
            {this.state.list && this.state.list.map((bookmark, index) => {
              return <Item key={index}
                bookmark={bookmark} 
                editing={this.state.editIndex === index} 
                onClick={() => this.deleteItem(index)}
                stopEditing={event => this.stopEditing(event, index)}
                editBookmark={event => this.editItem(index, event.target.value)}
                editError={this.state.editError[index]}
              />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Bookmarks;