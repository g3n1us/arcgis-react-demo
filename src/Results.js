import React, { Component } from 'react';
// import logo from './logo.svg';
import './Results.css';

class Results extends Component {
	
	constructor(props) {
		super(props);
		this.state = {hitcount: 0};
	}
	
	componentDidMount() {
		var hitcount = 0;
		var view = this.props.view;
		
		var handle = view.watch('popup.visible', function(newValue, oldValue, property, object) {
			if(newValue == true){
				this.setState({hitcount: this.state.hitcount + 1});
			}
				
		console.log(this.state.hitcount);
		
		
		
/*
		console.log(view.popup);
		view.on("click", function(event){
		view.hitTest(event)
		    .then(function(response){
			    console.log(response);

		    });
		});
*/
		
			
/*
		 console.log("New value: ", newValue,      // The new value of the property
		             "<br>Old value: ", oldValue,  // The previous value of the changed property
		             "<br>Watched property: ", property,  // In this example this value will always be "basemap.title"
		             "<br>Watched object: ", object);    
*/
		}.bind(this));
		
/*
var handle = map.watch('basemap.title', function(newValue, oldValue, property, object) {
 console.log("New value: ", newValue,      // The new value of the property
             "<br>Old value: ", oldValue,  // The previous value of the changed property
             "<br>Watched property: ", property,  // In this example this value will always be "basemap.title"
             "<br>Watched object: ", object);     // In this example this value will always be the map object
});
*/
		
    
	}
  
  render() {
// 	  console.log(this.props);
	  
    return (
        <div className='results_box'> <h2>There have been {this.state.hitcount} windows opened up.</h2></div>
    );
  }
}

export default Results;
