import axios from 'axios';
import sw from 'stopword'
import { SOLR_SERVER } from './constants'
// let SOLR_SERVER;
// if(process.env.NODE_ENV == "development")
//   SOLR_SERVER = require('./constants').SOLR_SERVER;


class SolrService {


  constructor(itemPerPage) {
    const defaultFacetParams = {
                                lang:{field:'tweet_lang'},
                                tdate:{field:'tweet_tdate',type:'range',start:'NOW/DAY-5MONTH',end:"NOW/DAY+5MONTH",gap:'+1MONTH',mincount:1}
                                };
    this.config = {
        headers: {crossDomain: true},
        params:{
          json:{
            limit:itemPerPage,
            query:"*:*",
            facet:defaultFacetParams
          },
          wt:'json',
          hl:'on',
          mlt:true
          }
    };
    this.config.params['hl.method'] = 'unified';
    this.config.params['mlt.fl']="text_en,text_fr,text_es";
    this.config.params['mlt.mindf']=2;
    this.config.params['mlt.mintf']=2;
    this.config.params['mlt.count']=4;

  }

  queryMap(search, successFn) {
    const mapConfig = {
        headers: {crossDomain: true},
        params:{json:{ limit:50, query:search, filter:'tweet_loc:[-90,-180 TO 90,180]'},
        wt:'json'}
    };
    axios.get(SOLR_SERVER,mapConfig).then(successFn)
  }

  query(search, start, filter, successFn) {

    if(search){
      this.config.params.json.query=search;
      this.config.params['hl.q']=sw.removeStopwords(search.split(' ')).join(' ');
      //console.log(sw.removeStopwords(search.split(' ')).join(' '));
      if(filter)
        this.config.params.json.filter=filter;

      this.config.params.json.offset=(start*this.config.params.json.limit);
      axios.get(SOLR_SERVER,this.config)
      .then(successFn)
    } else {
      //if empty we should get trending tweets
      //console.log("try to get trending")
    }
  }

}

export default SolrService;
