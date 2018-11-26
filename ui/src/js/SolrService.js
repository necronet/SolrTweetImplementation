import axios from 'axios';
import { SOLR_SERVER } from './constants'

class SolrService {

  constructor(itemPerPage) {
    this.config = {
        headers: {crossDomain: true},
        params:{wt:"json",rows:itemPerPage}
    };
  }

  query(search, start, successFn) {

    if(search){
      this.config.params.q=search;
      this.config.params.start=(start*this.config.params.rows);
      axios.get(SOLR_SERVER,this.config)
      .then(successFn)
    } else {
      //if empty we should get trending tweets
      console.log("try to get trending")
    }
  }

}

export default SolrService;
