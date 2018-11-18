import React, { Component } from 'react';
import { render } from 'react-dom';
import style from "./app.less";

export default class App extends Component {

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log("Searching")
    }

  }

  render() {
    return (
      <div className={style.header}>
        Application boilerplate for Solr search
        <input type="text" name="search" onKeyPress={this.handleKeyPress} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
