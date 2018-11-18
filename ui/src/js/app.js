import React, { Component } from 'react';
import { render } from 'react-dom';
import style from "./app.less";
import axios from 'axios';

// Constants
const SOLR_SERVER="http://localhost:8888/search/solr/tweets/select?q=mexico"
var config = {
    headers: {'crossDomain': true}
};


export default class App extends Component {

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log("Searching on " + SOLR_SERVER);
      axios.get(SOLR_SERVER,config)
      .then(res => {
        console.log(res);
      })
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
