import axios from 'axios';
import { SOLR_SERVER } from './constants'

class SolrService {

  constructor() {
    this.config = {
        headers: {crossDomain: true},
        params:{wt:"json"}
    };
  }

  query(search,successFn) {

    if(search){
      this.config.params.q=search;
      axios.get(SOLR_SERVER,this.config)
      .then(successFn)
    } else {
      //if empty we should get trending tweets
      console.log("try to get trending")
    }
  }

}

export default SolrService;
