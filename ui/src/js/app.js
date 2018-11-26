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
    this.itemsPerPage = 10;
    this.solrService = new SolrService(this.itemsPerPage);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData(start=0) {
    this.solrService.query(this.state.search, start, (res)=>{
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
    //pageNumber-1 in order to have the right start for search
    this.setState({activePage: pageNumber},()=>this.fetchData(pageNumber-1));
  }

  render() {
    return (
      <div className="container">

      <div className="row">
        <input type="text"
          className="form-control"
          name="search"
          value={this.state.search}
          onKeyPress={this.handleKeyPress.bind(this)}
          onChange={(e)=>this.setState({ search: e.target.value })}
          placeholder={this.selectPlaceholder()}/>
      </div>
        <ResultList results={this.state.results} />

        <Pagination itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.activePage}
                itemsCountPerPage={this.itemsPerPage}
                totalItemsCount={this.state.numFound}
                pageRangeDisplayed={7}
                onChange={this.handlePageChange.bind(this)}
               />

          <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href="#">InfRet</a>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">About</a>
            </li>
            </ul>
          </nav>
        </div>

    );
  }
}

render(<App />, document.getElementById('App'));
