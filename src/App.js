import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { post } from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.file)
    this.fileUpload(this.state.file).then((res) => {
      console.log(res)
    })
  }
  onChange = (e) => {
    this.setState({file: e.target.files[0]})
  }

  fileUpload = (file) => {
    const url = 'http://localhost:8000/file-upload'
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)
    const config = {
      hearders: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <body>
          <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </form>
        </body>
      </div>
    );
  }
}

export default App;
