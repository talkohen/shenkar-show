var credentials = require ('./credentials.js');

var AWS = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var mime = require('mime-types');



AWS.config.update({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey
});

var s3 = new AWS.S3();




exports.update = function (file, fileKey , callback) {
	
	var updatedKey = undefined;
	
	console.log ("FILEKEY : " + fileKey);
	
	if (file == '' ){
			
			console.log ("1111111");
			callback (fileKey);
		
	}

console.log ("FILE NAME : " +  file.key);
if (file == '' ) 
		{ 
			if (fileKey)
				{
					updatedKey = fileKey;
				}
			else 
				{
					updatedKey = undefined;
				}
		} 
		else 
		{
			updatedKey = "https://shenkar-show2.s3.amazonaws.com/" + file.key;
			if (fileKey != undefined) {
				try {
			splitKey = fileKey.split ("https://shenkar-show2.s3.amazonaws.com/");
			console.log (splitKey); 
			
			s3.deleteObjects({
    		Bucket: 'shenkar-show2',
    		Delete: { Objects: [{ Key: splitKey[0]}]}
			}, function(err, data) {

    		if (err)
        	console.log(err);
			});
			}
			catch (exception) {
				console.log (exception);
			}
			}
		}	
	
	callback (updatedKey);
	
};


exports.delete = function (fileKey, callback) {
	if (fileKey != undefined) {
	splitKey = fileKey.split ("https://shenkar-show2.s3.amazonaws.com/");
	
	if (splitKey != undefined) {
	s3.deleteObjects({
    Bucket: 'shenkar-show2',
    Delete: {
        Objects: [
             { Key: splitKey}
        ]
    }
}, function(err, data) {

    if (err)
        return console.log(err);

    console.log('success');

});
	}
	}
};

// 
// exports.deleteFile = function (request, response) {
// 	
	// if ( request.headers['x-access-token'] != undefined){
// 		
		// var userId = request.headers['x-access-token'];
// 	
	// user.findOne ({_id : userId}).exec (function (err , user) {
// 		
		// if ( request.body.institute != undefined){
// 			
			// institute.findOne ({_id: request.body.institute}).exec (function (err , institue) {
// 				
// 				
			// });
		// }
// 		
	// });
// 	
	// }
// 	
// };
