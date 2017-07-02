var passwordHash = require('password-hash');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
    


exports.hashMake = function (text) {
	var hashedText = passwordHash.generate(text);
	return hashedText;

};

exports.hashCheck = function (text, hashedText) {
	
	var verify = passwordHash.verify(text, hashedText);
	return verify;
};


 exports.encrypt = function (text){
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};
 
exports.decrypt = function (text){
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};