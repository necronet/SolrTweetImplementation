import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { compose, withProps } from "recompose"
import style from "./App.less";
import SolrService from './SolrService'
import SummaryTranslation from './SummaryTranslation'
import ResultList from './ResultList'
import TopHeader from './TopHeader'
import MoreLikeThisModal from './MoreLikeThisModal'
import Pagination from "react-js-pagination";
import { ITEMS_PER_PAGE} from './constants'
import Loader from 'react-loader-spinner'
import Modal from 'react-bootstrap4-modal';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapWithAMarker = withScriptjs(withGoogleMap(props =>{

  return <GoogleMap
    defaultZoom={12}
    center={props.markers[0]}
  >
  {props.markers.map((m,i)=><Marker key={i}position={m}/>)}

  </GoogleMap>

}));


const Months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Bucket = ({results, onClick})=>{
  const bucketList = results.map((r,k)=>{
      return <li key={k} className="nav-item" style={{cursor: 'pointer'}} onClick={onClick.bind(this,r.val)}>
              <span className="nav-link badge badge-light">{r.val} ({r.count})</span>
            </li>
       });

  return <ul className="nav">
            {bucketList}
          </ul>

}

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      results:[],
      fetching:false,
      geo_results:[],
      search:'',
      activePage: 1,
      numFound:0,
      visible_more_like_this:false,
      docs:{},
      facets_lang:[],
      facets_date:[],
      moreLikeThis:[]}
    this.solrService = new SolrService(ITEMS_PER_PAGE);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData(filter=null) {
    this.setState({fetching:true});
    this.solrService.query(this.state.search, (this.state.activePage-1), filter, (res)=>{


      let tdate_bucket = [];
      let facets_lang = [];
      if(res.data.facets.count > 0) {
        tdate_bucket = res.data.facets.tdate.buckets.map(r=>({val:Months[new Date(r.val).getMonth()],count:r.count}));
        facets_lang = res.data.facets.lang.buckets;
      }

      const results = res.data.response.docs.map((r,i)=>{
          r.tweet_text = res.data.highlighting[r.id].tweet_text;
          return r;
      });

      let moreLikeThis = [];
      if(res.data.moreLikeThis)
        moreLikeThis = res.data.moreLikeThis;

      this.setState({
        fetching:false,
        results:results,
        numFound:res.data.response.numFound,
        facets_lang:facets_lang,
        facets_date:tdate_bucket,
        moreLikeThis:moreLikeThis
      })
      }
    );

    this.solrService.queryMap(this.state.search,(res)=>{
      this.setState({
        geo_results:res.data.response.docs
      });
    })

  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.fetchData();
    }
  }

  selectPlaceholder() {
    const hints = ["(i.e NYC criminal activity)",
                      "(i.e Bangladesh environmental problem)",
                      "(i.e Paris bridges and road condition)",
                      "(i.e Mexico riots and protest)",
                      "(i.e Bangladesh environmental problem)"];

    return "Topic search " + hints[Math.floor(Math.random() * hints.length)];
  }

  handlePageChange(pageNumber) {
    //pageNumber-1 in order to have the right start for search
    this.setState({activePage: pageNumber}, this.fetchData);
  }

  applyFilter(field,value) {
    const filter = `${field}:${value}`
    this.fetchData(filter);
  }

  onClickMore(docs) {
    //console.log('on Click more '+docs)
    this.setState({visible_more_like_this:!this.state.visible_more_like_this, docs:docs})
  }

  render() {

    const locationMarkers = this.state.geo_results.map(
            r=>({lat:parseFloat(r.tweet_loc.split(",")[0]),lng:parseFloat(r.tweet_loc.split(",")[1])})
          );

    return (
      <React.Fragment>
      <MoreLikeThisModal visible={this.state.visible_more_like_this}
          docs={this.state.docs}
          onClickMore={this.onClickMore.bind(this)}/>

      <TopHeader/>

      <div className="container-fluid">

      <div className="row m-1">
        <div className="col-12">
          <input type="text"
            className="form-control"
            name="search"
            value={this.state.search}
            onKeyPress={this.handleKeyPress.bind(this)}
            onChange={(e)=>this.setState({ search: e.target.value })}
            placeholder={this.selectPlaceholder()}/>
          </div>
      </div>


      { locationMarkers.length > 0 &&
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJxUyqBQTqyDiJsmR64LbYlHAJJpdyh4E&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `220px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={locationMarkers}
        />
      }

      {this.state.results.length > 0 &&
        <div className="row">
          <div className="col-6"><Bucket onClick={(v)=>this.applyFilter("tweet_lang",v)} results={this.state.facets_lang}/></div>
          <div className="col-6"><Bucket onClick={(v)=>this.applyFilter("tweet_tdate",v)} results={this.state.facets_date}/></div>
        </div>
      }
        <div className="row">
          { this.state.fetching &&
            <div className="col-12 text-center">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            </div>
          }
          { !this.state.fetching &&
          <React.Fragment>
          <div className="col-8">
            <div className="row">
            <ResultList results={this.state.results} moreLikeThis={this.state.moreLikeThis} onClick={this.onClickMore.bind(this)} />
            </div>
          </div>

          { this.state.results.length > 0 &&
          <div className="col-4">
          <SummaryTranslation results={this.state.results}/>
          </div>
          }
          </React.Fragment>

          }

        </div>
        { this.state.results.length > 0 &&
        <div className="row">
        <Pagination itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.activePage}
                itemsCountPerPage={this.itemsPerPage}
                totalItemsCount={this.state.numFound}
                pageRangeDisplayed={7}
                onChange={this.handlePageChange.bind(this)}
               />
          </div>}

        </div>
        </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('App'));
