import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult'
import style from "./App.less";

class ResultList extends Component {

  render() {

    const resultsComponent = this.props.results.map(tweet=>{
      return <SearchResult key={tweet.id} result={tweet} />
    });

    return <div className="row">{resultsComponent}</div>;
  }
}

ResultList.propTypes = {
  results: PropTypes.array.isRequired
};

export default ResultList;
