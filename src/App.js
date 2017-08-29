import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { createMap } from './actions/map';
// import { Button } from 'react-bootstrap';

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
    return (
        <div ref='mapView' className='map-view'></div>
    );
  }
}
// console.log(new createMap(document.body));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
