import Modal from 'react-bootstrap4-modal';
import Analytics from './Analytics'
import React, { Component } from 'react';

class AnalyticsDialog extends React.Component {

  render() {

    return <Modal visible={this.props.visible} onClickBackdrop={this.props.onClickMore}>
     <div className="modal-header">
       <h5 className="modal-title">Results by languages</h5>
     </div>
     <div className="modal-body">
        <Analytics langs={this.props.langs}/>
     </div>
     <div className="modal-footer">
       <button type="button" className="btn btn-primary" onClick={this.props.onClickMore}>
         Done
       </button>
     </div>
    </Modal>

  }
}

export default AnalyticsDialog;
