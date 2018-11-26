import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult'

class ResultList extends Component {

  render() {

    const resultsComponent = this.props.results.map(tweet=>{
      return <SearchResult key={tweet.id} result={tweet} />
    });

    return <div>{resultsComponent}</div>;
  }
}

ResultList.propTypes = {
  results: PropTypes.array.isRequired
};

export default ResultList;
