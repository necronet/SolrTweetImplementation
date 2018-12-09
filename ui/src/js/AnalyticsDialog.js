import Modal from 'react-bootstrap4-modal';
import Analytics from './Analytics'
import React, { Component } from 'react';

class AnalyticsDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {current_graph:0};
  }

  next() {
      if(this.state.current_graph >= 1) {
        this.setState({current_graph:0});
      } else
        this.setState({current_graph:this.state.current_graph+1});
  }

  render() {

    const results = [this.props.langs,this.props.topics];
    const titles = ["Results by languages","Results by topic"];

    return <Modal visible={this.props.visible} onClickBackdrop={this.props.onClickMore}>
     <div className="modal-header">
       <h5 className="modal-title">{titles[this.state.current_graph]}</h5>
     </div>
     <div className="modal-body">
          <Analytics results={results[this.state.current_graph]}/>
     </div>
     <div className="modal-footer">
       <button type="button" className="btn btn-primary" onClick={this.next.bind(this)}>
         Next
       </button>
     </div>
    </Modal>

  }
}

export default AnalyticsDialog;
