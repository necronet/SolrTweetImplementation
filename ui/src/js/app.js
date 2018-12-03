import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { compose, withProps } from "recompose"
import style from "./App.less";
import SolrService from './SolrService'
import ResultList from './ResultList'
import TopHeader from './TopHeader'
import Pagination from "react-js-pagination";
import { ITEMS_PER_PAGE} from './constants'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapWithAMarker = withScriptjs(withGoogleMap(props =>{

  return <GoogleMap
    defaultZoom={12}
    defaultCenter={props.markers[0]}
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
      geo_results:[],
      search:'Crime in NYC',
      activePage: 1,
      numFound:0,
      facets_lang:[],
      facets_date:[]}
    this.solrService = new SolrService(ITEMS_PER_PAGE);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData(filter=null) {
    this.solrService.query(this.state.search, (this.state.activePage-1), filter, (res)=>{

      const tdate_bucket = res.data.facets.tdate.buckets.map(r=>({val:Months[new Date(r.val).getMonth()],count:r.count}))

      const results = res.data.response.docs.map((r,i)=>{
          r.tweet_text = res.data.highlighting[r.id].tweet_text;
          return r;
      });

      //console.log(results);

      this.setState({
        results:results,
        numFound:res.data.response.numFound,
        facets_lang:res.data.facets.lang.buckets,
        facets_date:tdate_bucket
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

  render() {

    const locationMarkers = this.state.geo_results.map(
            r=>({lat:parseFloat(r.tweet_loc.split(",")[0]),lng:parseFloat(r.tweet_loc.split(",")[1])})
          );
    //console.log(locationMarkers)
    return (
      <React.Fragment>
      <div className="row">
        <TopHeader/>
      </div>
      <div className="container-fluid">
      <div className="row">
        <div className="col-8">
        <input type="text"
          className="form-control"
          name="search"
          value={this.state.search}
          onKeyPress={this.handleKeyPress.bind(this)}
          onChange={(e)=>this.setState({ search: e.target.value })}
          placeholder={this.selectPlaceholder()}/>
          </div>
      </div>


      { this.state.results.length > 0 &&
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAM_1OnMhcKtkg3lpIeH2MTsT6dP__7Fq4&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `220px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={locationMarkers}
        />
      }

        <div className="row">
          <div className="col-6"><Bucket onClick={(v)=>this.applyFilter("tweet_lang",v)} results={this.state.facets_lang}/></div>
          <div className="col-6"><Bucket onClick={(v)=>this.applyFilter("tweet_tdate",v)} results={this.state.facets_date}/></div>
        </div>

        <ResultList results={this.state.results} />
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
