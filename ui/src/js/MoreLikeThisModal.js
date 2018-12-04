import Modal from 'react-bootstrap4-modal';
import React, { Component } from 'react';
import ResultList from './ResultList'

class MoreLikeThisModal extends React.Component {

  render() {
    let moreLikeThisDocs = <span/>;
    if(Object.keys(this.props.docs).length === 3) {
      console.log(this.props.docs.docs)
      moreLikeThisDocs = <div className="row"><ResultList
                            results={this.props.docs.docs}
                            onClick={()=>{}} /></div>
      // moreLikeThisDocs = this.props.docs.docs.map(d=> {
      //     return <ul key={d.id} className="list-group">
      //               <li className="list-group-item d-flex justify-content-between align-items-center">
      //               {d.tweet_text}
      //               </li>
      //            </ul>
      //});
    }

    return <Modal visible={this.props.visible} onClickBackdrop={this.props.onClickMore}>
     <div className="modal-header">
       <h5 className="modal-title">More like this</h5>
     </div>
     <div className="modal-body">
       {moreLikeThisDocs}
     </div>
     <div className="modal-footer">
       <button type="button" className="btn btn-primary" onClick={this.props.onClickMore}>
         Done
       </button>
     </div>
    </Modal>

  }
}

export default MoreLikeThisModal;
