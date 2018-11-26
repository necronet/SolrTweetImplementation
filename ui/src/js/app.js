import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import style from "./App.less";
import SolrService from './SolrService'
import ResultList from './ResultList'
import Pagination from "react-js-pagination";

export default class App extends Component {

  constructor() {
    super()
    this.state = { results:[], search:'mexico', activePage: 1, numFound:0}

    this.solrService = new SolrService();
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    this.solrService.query(this.state.search, (res)=>{

      this.setState({results:res.data.response.docs, numFound:res.data.response.numFound})
      }
    );

  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.fetchData();
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

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  render() {
    return (
      <div className={style.header}>
        Application boilerplate for Solr search
        <input type="text" name="search"
        value={this.state.search}
        onKeyPress={this.handleKeyPress.bind(this)}
        onChange={(e)=>this.setState({ search: e.target.value })}
        placeholder={this.selectPlaceholder()}/>
        <ResultList results={this.state.results} />
        <Pagination itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.numFound}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
               />
      </div>
    );
  }
}

render(<App />, document.getElementById('App'));
