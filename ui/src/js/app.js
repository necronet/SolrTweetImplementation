import React, { Component } from 'react';
import { render } from 'react-dom';
import style from "./App.less";
import SolrService from './SolrService'
import ResultList from './ResultList'

export default class App extends Component {

  constructor() {
    super()
    this.state = { results:[], search:'mexico'}
    this.solrService = new SolrService();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    this.solrService.query(this.state.search, (res)=>this.setState({results:res.data.response.docs}) );
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      fetchData();
    }

  }

  selectPlaceholder() {
    const hints = ["(i.e NYC criminal activity)",
                      "(i.e Bangladesh environmental problem)",
                      "(i.e Paris bridges and road condition)",
                      "(i.e Mexico rios and protest)",
                      "(i.e Bangladesh environmental problem)"];

    return "Topic search " + hints[Math.floor(Math.random() * hints.length)];
  }

  render() {
    return (
      <div className={style.header}>
        Application boilerplate for Solr search
        <input type="text" name="search"
        value={this.state.search}
        onKeyPress={this.handleKeyPress}
        onChange={(e)=>this.setState({ search: e.target.value })}
        placeholder={this.selectPlaceholder()}/>
        <ResultList results={this.state.results} />
      </div>
    );
  }
}

render(<App />, document.getElementById('App'));
