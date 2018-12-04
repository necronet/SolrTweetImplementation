import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SummarizeService from './SummarizeService'
import Loader from 'react-loader-spinner'
//

class SummaryTranslation extends Component {

  constructor(props) {
    super(props);
    this.summarizeService = new SummarizeService();
    this.state = {fetching:false, summary:'', translation:'',ref:null, nosummary:false, showTranslation:false}
  }

  componentWillMount() {
    this.setState({fetching:true});
    this.summarizeService.summarize(
      this.props.results, (res)=>{
      if(res.data.length > 0) {
        this.setState({
        summary:res.data[0].summarization,
        translation:res.data[0].translation,
        ref:res.data[0].ref
      });
      } else {
        this.setState({nosummary:true})
      }
      this.setState({fetching:false});
    })
  }

  toggleSummary() {
    this.setState({showTranslation:!this.state.showTranslation});
  }

  render() {

    let summary;
    let textTranslate = "Translate"
    if(this.state.nosummary) {
      summary = "No summary available for this search"
    } else {
      summary = this.state.showTranslation? this.state.translation : this.state.summary;
      textTranslate = this.state.showTranslation ? "Original" : "Translate";
    }

    return <div className="card flex-md-row mb-4 box-shadow h-md-250 mt-3">
            <div className="card-body d-flex flex-column align-items-start">
              <h3 className="mb-0">
                Summary
              </h3>
              {this.state.fetching && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
              { (!this.state.fetching || this.state.nosummary) && <div className="mb-1 text-muted">
                <span><a href={this.state.ref}>Source</a></span> |

                {this.state.translation && <span onClick={this.toggleSummary.bind(this)} style={{cursor: 'pointer'}} >{textTranslate} </span>}
                </div>}
              {!this.state.fetching && <p className="card-text mb-auto">
                {summary}
              </p> }
              </div>

           </div>;
  }
}


export default SummaryTranslation;
