import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from "./App.less";

/*
Example of tweet object
city: ["mexico city"]
hashtags: "nofilter, sanangel, bazar, tianguis, mexico, food, friends, mezcal"
id: "5c369ad4d24450f0"
lang: ["en"]
text: ["Lovely morning in Mexico #nofilter #sanangel #baza…cal @ Mexico City, Mexico https://t.co/hPISFrjVMN"]
text_en: "Lovely morning in Mexico #nofilter #sanangel #bazar #tianguis #mexico #food #friends #mezcal @ Mexico City, Mexico https://t.co/hPISFrjVMN"
topic: ["environment"]
tweet_date: "2018-09-01T19:00:00Z"
tweet_lang: ["es"]
tweet_loc: "19.4326,-99.1332"
tweet_text: ["Lovely morning in Mexico #nofilter #sanangel #baza…cal @ Mexico City, Mexico https://t.co/hPISFrjVMN"]
tweet_urls: ["https://t.co/hPISFrjVMN"]
_version_: 1618188225645379600
*/

class SearchResult extends Component {

  flagStyle(city){

    switch (city[0]) {
      case "mexico city": return style.mx_flag
      case "nyc": return style.us_flag
      case "bangkok": return style.th_flag
      case "delhi": return style.in_flag
      case "paris": return style.fr_flag
    }
  }

  render() {
    const { text, tweet_lang, city, topic, tweet_date } = this.props.result



    return <div className="col-md-4">
            <div className="card mb-4 shadow-sm" >
              <div className="card-body">
                <p>{text}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{topic}</small>
                    <span className={this.flagStyle(city)}/>
                </div>
              </div>
            </div>
            </div>;
  }
}

SearchResult.propTypes = {
  result: PropTypes.object
};

export default SearchResult;
