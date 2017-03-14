var AWS = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var mime = require('mime-types');

var accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIAI5QUNEYRQW4TWR2Q";
var secretAccessKey = process.env.AWS_SECRET_KEY || "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";



AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new AWS.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'shenkar-show2',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.' + mime.extension(file.mimetype))
    }
  })
});

exports.upload;