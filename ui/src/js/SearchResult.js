import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const { text, lang, city } = this.props.result
    return <div>{text}</div>;
  }
}

SearchResult.propTypes = {
  result: PropTypes.object
};

export default SearchResult;
