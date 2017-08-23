var AWS = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var mime = require('mime-types');
var credentials = require ('./credentials.js');



AWS.config.update({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey
});

var s3 = new AWS.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'shenkar-show2',
    
      limits: { fileSize: 1000*1000*1 },
   fileFilter: function (req, file, cb) {
 if (file.mimetype !== 'image/png' || file.originalname =='') {

  req.fileValidationError = 'goes wrong on the mimetype';
  return cb(null, false, new Error('goes wrong on the mimetype'));
 }

 file.key = '';
 cb(null, true);
},
      
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
  
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.' + mime.extension(file.mimetype));
    }
  })
});

exports.upload = upload;