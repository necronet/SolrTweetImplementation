import React, { Component } from 'react';
import { render } from 'react-dom';
import style from "./App.less";
import axios from 'axios';
import ResultList from './ResultList'

// Constants
const SOLR_SERVER="http://localhost:8888/search/solr/tweets/select?q=mexico&wt=json"
var config = {
    headers: {'crossDomain': true}
};

export default class App extends Component {

  constructor() {
    super()
    this.state = { results:[] }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get(SOLR_SERVER,config)
    .then(res => {
      //console.log(res.data.response);
      this.setState({results:res.data.response.docs});
    })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log("Searching on " + SOLR_SERVER);
      fetchData();
    }

  }

  render() {
    return (
      <div className={style.header}>
        Application boilerplate for Solr search
        <input type="text" name="search" onKeyPress={this.handleKeyPress} />
        <ResultList results={this.state.results} />
      </div>
    );
  }
}

render(<App />, document.getElementById('App'));
