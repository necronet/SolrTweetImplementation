import axios from 'axios';
import { SUMMARIZE_SERVER } from './constants'

class SummarizeService {

  summarize(data, successFn) {
    axios.post(SUMMARIZE_SERVER,data, {headers: {
    'Content-Type': 'application/json'
    }}).then(successFn)
  }

}

export default SummarizeService;
