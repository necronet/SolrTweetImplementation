import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SummarizeService from './SummarizeService'
import Loader from 'react-loader-spinner'
//

class SummaryTranslation extends Component {

  constructor(props) {
    super(props);
    this.summarizeService = new SummarizeService();
    this.state = {fetching:false, summaries:[], nosummary:false, showTranslation:false,current_summary:-1}
  }

  componentWillMount() {
    this.setState({fetching:true});
    this.summarizeService.summarize(
      this.props.results, (res)=>{
        console.log(res.data.filter((r)=>r.summarization!=""))
      const summaries = res.data.filter((r)=>r.summarization!="");
      if(summaries.length > 0) {
        this.setState({summaries:summaries,current_summary:0});
      } else {
        this.setState({nosummary:true,current_summary:-1})
      }
      this.setState({fetching:false});
    });
  }

  toggleSummary() {
    this.setState({showTranslation:!this.state.showTranslation});
  }

  next() {
    if (this.state.current_summary < this.state.summaries.length-1) {
      this.setState({current_summary:this.state.current_summary+1});
    } else {
      this.setState({current_summary:0});
    }
  }

  render() {

    let summary, translation, ref;
    let textTranslate = "Translate"
    if(this.state.nosummary) {
      summary = "No summary available for this search"
    } else if(this.state.current_summary != -1){

      summary=this.state.summaries[this.state.current_summary].summarization;
      translation=this.state.summaries[this.state.current_summary].translation;
      ref=this.state.summaries[this.state.current_summary].ref;

      summary = this.state.showTranslation? translation : summary;
      textTranslate = this.state.showTranslation ? "Original" : "Translate";
    }

    return <div className="card flex-md-row mb-4 box-shadow h-md-250 mt-3">
            <div className="card-body d-flex flex-column align-items-start">

              <h3 className="mb-0">Summary</h3>
              {this.state.fetching && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
              { (!this.state.fetching || this.state.nosummary) && <div className="mb-1 text-muted">
                <span><a href={ref}>Source</a></span> |

                {translation && <span onClick={this.toggleSummary.bind(this)} style={{cursor: 'pointer'}} >{textTranslate} </span>}
                </div>}
              {!this.state.fetching && <p className="card-text mb-auto">
                {summary}
              </p> }
              {(!this.state.fetching && this.state.summaries.length > 1) && <button className="btn btn-primary" onClick={this.next.bind(this)}>Next</button>}
              </div>

           </div>;
  }
}


export default SummaryTranslation;
