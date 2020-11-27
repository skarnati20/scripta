import React, { Component } from 'react';
import axios from "axios";
import $ from "jquery";
import './App.css';

class App extends Component {
  
  {/* establishing the states required for the app */}
  state = {
    texts: [],
    notes: [],
    excerpts: [],
    lockedQuote: ""
  };

  componentDidMount() {
    {/* the following lines are the get requests in order to update the states for live use */}
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
    
    {/* establishing and initializing a delete button that will fetch the /delete endpoint */}
    const deleteButton = document.querySelector('#delete-button')
    deleteButton.addEventListener('click', _ => {
      fetch('/delete', {
        method: 'delete',
      });
    })

    {/* establishing the download button and the alert it'll give */}
    const downloadButton = document.querySelector('#download-button')
    downloadButton.addEventListener('click', _ => {
      window.alert("I haven't figured out how to generate a document. So for now, try copy and pasting specfic quotes and notes. If you have any suggestions on what to do, that'd be dope!");
    })

    {/* establishing the locked quote mechanism */}
    document.addEventListener("keydown", this.checkKeyPressed, false);
  };

    {/* the function for the locked quote mechanism */}
  checkKeyPressed = (evt) => {
    if (evt.ctrlKey && evt.keyCode == "76") {
      this.setState({ lockedQuote: window.getSelection().toString() })
    }
  }

  {/* the function for the submit button on the right-hand side */}
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
    {/* variable for rendering the submitted text */}
    const textList = (
      this.state.texts.map(text => (
        <div key={text._id}>
          <h>{text.name}</h>
        </div>
      )));
    
    {/* variable for showing users' selected quotes */}
    const viewQuotes = (
      this.state.excerpts.map(excerpt => (
        <textarea readOnly rows="7" id="quotes-textarea">{excerpt.name}</textarea>
      ))
    );

    {/* variable for showing the notes users have taken so far */}
    const viewNotes = (
      this.state.notes.map(note => (
        <textarea readOnly rows="7" id="notes-textarea">{note.name}</textarea>
      ))
    )

    return (
      <>
        <style>@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');</style>
        <div id="everything">
          {/* this is just for special effect when you hover over the logo */}
          <h1 id="title"><span id="s">S</span><span id="c">c</span><span id="r">r</span><span id="i">i</span><span id="p">p</span><span id="t">t</span><span id="a">a</span></h1>
          <div id="both">
            {/* established the left-hand side of the app */}
            <div id="left">
              {/* form for submitting text */}
              <form id="submit" action="/text" method="POST">
                <input id="textInput" rows="2" type="text" placeholder="Insert Text Here" name="name" />
                <button id="submit-button" type="submit">Submit</button>
                <button id="delete-button">Delete</button>
              </form>
              {/* pane that displays submitted text */}
              <div id="text-pane">
                <p id="actual-text">
                  {textList}
                </p>
              </div>
            </div>
            {/* established the right side of the app */}
            <div id="right">
              {/* done to make it so that the right side can scroll*/}
              <div id="right-scroll">
                {/* the following is the form to show the locked in quote, let the reader write a note, and finally submit both */}
                <h1>Submit Notes</h1>
                <section name="quote">Quote: "{this.state.lockedQuote}"</section>
                <textarea id="submit-notes" rows="3" placeholder="Type notes here. Lock a quote by highlighting it and pressing Ctrl + L" name="name"></textarea>
                <br></br>
                <button id="quotes-notes" onClick={this.handleClick}>Submit</button>
                {/* the following will sepereate the quotes and notes data into two columns for the user to see */}
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
                {/* download button that calls previous function */}
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
