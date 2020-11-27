import React, { Component } from 'react';
import axios from "axios";
import $ from "jquery";
import './App.css';

class App extends Component {
  state = {
    texts: [],
    notes: [],
    excerpts: [],
    lockedQuote: ""
  };

  componentDidMount() {
    axios.get('/excerpts')
      .then((response) => {
        this.setState({ excerpts: response.data })
      })
    axios.get('/text')
      .then((response) => {
        this.setState({ texts: response.data })
      })
    axios.get('/notes')
      .then((response) => {
        this.setState({ notes: response.data })
      })
    const deleteButton = document.querySelector('#delete-button')

    deleteButton.addEventListener('click', _ => {
      fetch('/delete', {
        method: 'delete',
      });
    })

    const downloadButton = document.querySelector('#download-button')
    downloadButton.addEventListener('click', _ => {
      window.alert("I haven't figured out how to generate a document. So for now, try copy and pasting specfic quotes and notes. If you have any suggestions on what to do, that'd be dope!");
    })

    document.addEventListener("keydown", this.checkKeyPressed, false);
  };

  checkKeyPressed = (evt) => {
    if (evt.ctrlKey && evt.keyCode == "76") {
      this.setState({ lockedQuote: window.getSelection().toString() })
    }
  }

  handleClick = (e) => {
    var text = $("#submit-notes").val();
    axios.post('/notes', {
      name: text
    })
    axios.post('/excerpts', {
      name: this.state.lockedQuote
    })
    window.location.reload();
  }

  render() {
    const textList = (
      this.state.texts.map(text => (
        <div key={text._id}>
          <h>{text.name}</h>
        </div>
      )));

    const viewQuotes = (
      this.state.excerpts.map(excerpt => (
        <textarea readOnly rows="7" id="quotes-textarea">{excerpt.name}</textarea>
      ))
    );

    const viewNotes = (
      this.state.notes.map(note => (
        <textarea readOnly rows="7" id="notes-textarea">{note.name}</textarea>
      ))
    )

    return (
      <>
        <style>@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');</style>
        <div id="everything">
          <h1 id="title"><span id="s">S</span><span id="c">c</span><span id="r">r</span><span id="i">i</span><span id="p">p</span><span id="t">t</span><span id="a">a</span></h1>
          <div id="both">
            <div id="left">
              <form id="submit" action="/text" method="POST">
                <input id="textInput" rows="2" type="text" placeholder="Insert Text Here" name="name" />
                <button id="submit-button" type="submit">Submit</button>
                <button id="delete-button">Delete</button>
              </form>
              <div id="text-pane">
                <p id="actual-text">
                  {textList}
                </p>
              </div>
            </div>
            <div id="right">
              <div id="right-scroll">
                <h1>Submit Notes</h1>
                <section name="quote">Quote: "{this.state.lockedQuote}"</section>
                <textarea id="submit-notes" rows="3" placeholder="Type notes here. Lock a quote by highlighting it and pressing Ctrl + L" name="name"></textarea>
                <br></br>
                <button id="quotes-notes" onClick={this.handleClick}>Submit</button>
                <h1>View Notes</h1>
                <div id="viewing-notes">
                  <div id="quotes-column">
                    {viewQuotes}
                  </div>
                  <div id="notes-column">
                    {viewNotes}
                  </div>
                </div>
                <br></br>
                <button id="download-button">Download</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
