exports.generatePassword = function randomString(length, chars, callback) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    callback (result);
};

exports.getYoutubeSuffix = function getYoutubeSuffix (url, callback) {

if (url != null) {
	try {
		var URLsplit = url.split("watch?v=");
		if (URLsplit[1] != undefined) {
		callback (URLsplit[1]);
		}
		else{
			callback (url);
		}
	}	
	catch (exception) {
		callback (null);
	}
}
else {
	callback (null);
}
	
};
