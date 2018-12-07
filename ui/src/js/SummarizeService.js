import axios from 'axios';
//import { SUMMARIZE_SERVER } from './constants'

let SUMMARIZE_SERVER;
if(process.env.NODE_ENV == "development")
  SUMMARIZE_SERVER = require('./constants').SUMMARIZE_SERVER;

class SummarizeService {

  summarize(data, successFn) {
    axios.post(SUMMARIZE_SERVER,data, {headers: {
    'Content-Type': 'application/json'
    }}).then(successFn)
  }

}

export default SummarizeService;
