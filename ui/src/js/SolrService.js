import axios from 'axios';
import { SOLR_SERVER } from './constants'

class SolrService {


  constructor(itemPerPage) {
    const defaultFacetParams = {lang:{field:'tweet_lang'}};
    this.config = {
        headers: {crossDomain: true},
        params:{json:{ limit:itemPerPage, query:"*:*", facet:defaultFacetParams}, wt:'json' }
    };
  }

  query(search, start, successFn) {

    if(search){
      this.config.params.json.query=search;
      this.config.params.json.offset=(start*this.config.params.json.limit);
      axios.get(SOLR_SERVER,this.config)
      .then(successFn)
    } else {
      //if empty we should get trending tweets
      console.log("try to get trending")
    }
  }

}

export default SolrService;
