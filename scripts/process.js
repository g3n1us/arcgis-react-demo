var fs = require( "fs" );
var ExifImage = require('exif').ExifImage;

var baseDir = __dirname + '/../public/pics/';
var urlPrefix = 'pics/';
var output = [];
fs.readdir(baseDir, function(err, items) {
	if(items){
		items.forEach(function(photo){
			var outputitem = {url: urlPrefix+photo}
		    new ExifImage({ image : baseDir+photo }, function (error, exifData) {
		        if (error)
		            console.log('Error: '+error.message);
		        else{
			        console.log(exifData.gps);
			        outputitem.lat = exifData.gps.GPSLatitude;
			        outputitem.lon = exifData.gps.GPSLongitude;
			        outputitem.gps = exifData.gps;
			        output.push(outputitem);
			        if(output.length == items.length)
				        fs.writeFileSync( __dirname + '/../public/pics.json', JSON.stringify(output));
		        }
		    });
			
		});
		
		
		
	}
});
	