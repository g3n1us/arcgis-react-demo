import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import SimpleRenderer from "esri/renderers/SimpleRenderer";
import Point from 'esri/geometry/Point';
import SpatialReference from 'esri/geometry/SpatialReference';
import points from '../../public/pics.json';
import webMercatorUtils from 'esri/geometry/support/webMercatorUtils';
// console.log(points);

var mapped_points = points.filter(function(v){
	return typeof v.lat === "object";

});
mapped_points = mapped_points.map(function(v){
// 	console.log(v);
	var pointdata = {
		x: v.lon[0] + (v.lon[1]/60) + (v.lon[2]/3600), 
		y: v.lat[0] + (v.lat[1]/60) + (v.lat[2]/3600)
	};
	if(v.gps.GPSLongitudeRef == "W")
		pointdata.x = pointdata.x * -1;
	var newV = {geometry: new Point(pointdata)};
	newV.attributes = v;
	newV.attributes.x = pointdata.x;
	newV.attributes.y = pointdata.y;
	newV.attributes.ObjectID = v.url;
	return newV;
});

var avg = {x: 0, y: 0};
mapped_points.forEach(function(p){
	avg.x = avg.x + p.attributes.x;
	avg.y = avg.y + p.attributes.y;
});
avg.x = avg.x / mapped_points.length;
avg.y = avg.y / mapped_points.length;
// console.log(avg);

const map = (state = { }, action) => {


	if(action.type === 'CREATE_MAP'){
	    var citiesLayer = new FeatureLayer({
			fields: [
				{name: "ObjectID", alias: "ObjectID", type: "oid"},
				{name: "location", alias: "location", type: "object"},
			],
			source: mapped_points,
	
			renderer: new SimpleRenderer({ 
				symbol: new PictureMarkerSymbol({
					width: "30px",
					height: "40px",
					url: "http://reactapp.ebdev.americanmadeweb.com/icon.png",
				}),
			}),
			objectIdField: "ObjectID",
			geometryType: "point",
			// 4326
			// 4269
			spatialReference: {wkid: 4326},
			// popups
			popupEnabled: true,
			popupTemplate: {
		        title: "Photo taken at: {lat}, {lon}",
		        content: '<img src="http://reactapp.ebdev.americanmadeweb.com/{ObjectID}">',
	        },
	    });
		
		var thismap = new EsriMap({
			basemap: 'national-geographic',
			layers: [citiesLayer],
		});
	
		return {
			mapCtrl: new MapView({
				container: action.domNode,
				map: thismap,
				center: [avg.x, avg.y],
				zoom: 4,
			  
			})
		}
	}
		
	else
		return state;
}

export default map;
