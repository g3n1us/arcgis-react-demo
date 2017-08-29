import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { createMap } from './actions/map';
// import { Button } from 'react-bootstrap';
import Results from './Results';

const mapStateToProps = (state) => {
	console.log(state.map.mapCtrl);
  return {
    mapCtrl: state.map.mapCtrl
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createMap: (domNode) => {
      dispatch(createMap(domNode))
    }
  }
}

class App extends Component {
  componentDidMount() {
    
    if (!this.props.mapCtrl) {
      this.props.createMap(this.refs.mapView);
    }
  }

  render() {
	  console.log(this.props);
	  
	var results = typeof this.props.mapCtrl !== "undefined" ? <Results view={this.props.mapCtrl} /> : null;
	  
    return (
        <div ref='mapView' className='map-view' >
	        {results}
        </div>
    );
  }
}
// console.log(new createMap(document.body));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

/*

view.on("click", function(event){
  view.hitTest(event)
    .then(function(response){
       // do something with the result graphic
       var graphic = response.results[0].graphic;
    });
});
*/
