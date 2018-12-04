import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult'
import style from "./App.less";

class ResultList extends Component {

  render() {

    const resultsComponent = this.props.results.map(tweet=>{
      let moreLikeThis;
      if(this.props.moreLikeThis){
        moreLikeThis = this.props.moreLikeThis[tweet.id];
      }
      
      return <SearchResult key={tweet.id} result={tweet}
              moreLikeThis={moreLikeThis}
              onClickMore={this.props.onClick}/>
    });

    return <React.Fragment>{resultsComponent}</React.Fragment>;
  }
}

ResultList.propTypes = {
  results: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ResultList;
