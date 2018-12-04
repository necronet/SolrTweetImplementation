import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from "./App.less";
import Linkify from 'react-linkify';

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

  sentiment(sentiment){

    switch (sentiment) {
      case "positive": return style.positive
      case "negative": return style.negative
      case "neutral": return style.neutral
    }
  }


  getHighlightHashtags(text) {
    const HashtagRegex = /\B(\#[a-zA-Z]+\b)(?!;)/
    let parts = text.split(new RegExp(HashtagRegex, 'gm'))

    return <span> { parts.map((part, i) =>
        <span key={i} className={ HashtagRegex.test(part)? style.hashtag : ""}>
            { part }
        </span>)
    } </span>;
  }

  moreLikeThis(e) {
    e.preventDefault();
    this.props.onClickMore(this.props.moreLikeThis);
  }

  render() {
    const { text, tweet_text, tweet_lang, city, topic, tweet_date } = this.props.result;

    let showMoreLikeThis = false;
    if(this.props.moreLikeThis)
      showMoreLikeThis = this.props.moreLikeThis.numFound>0;

    return <div className="col-md-6 d-flex align-items-stretch mt-3">
            <div className="card mb-6 shadow-sm" >
            <span className={this.flagStyle(city)}/>
              <div className="card-body">
                <Linkify>
                  <div dangerouslySetInnerHTML={{__html:tweet_text[0]}} />
                </Linkify>
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{topic}</small>
                    {showMoreLikeThis && <a href="#" onClick={this.moreLikeThis.bind(this)} className="card-link">See more</a >}

                    <span className={this.sentiment("neutral")}/>
                </div>
              </div>
            </div>
            </div>;
  }
}

SearchResult.propTypes = {
  result: PropTypes.object,
  moreLikeThis: PropTypes.object
};

export default SearchResult;
