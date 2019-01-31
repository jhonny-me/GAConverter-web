import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { post } from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      swiftLink: null,
      kotlinLink: null
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.file)
    this.fileUpload(this.state.file).then((res) => {
      this.setState({
        swiftLink: res.data.swift,
        kotlinLink: res.data.kotlin
      })
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
    const {swiftLink, kotlinLink} = this.state
    console.log('render')
    console.log(this.state)
    return (
      <div className="App">
        <body>
          <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </form>
          <div>
            <a class="btn" role="button" href={swiftLink} download="GeneratedGaEvents.swift">
              {swiftLink}
            </a>
          </div>
          <div>
            <a class="btn" role="button" href={kotlinLink} download="GeneratedGaEvents.kt">
              {kotlinLink}
            </a>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
