import React, { Component } from 'react';
import { render } from 'react-dom';
import style from "./app.less";

export default class App extends Component {
  render() {
    return (
      <div className={style.header}>
        Application boilerplate for Solr search
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
