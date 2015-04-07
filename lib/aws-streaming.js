// Initialize aws client
// =====================
var auth = require('../config/auth.js');
var Knox = require('knox');
var moment = require('moment');
var crypto = require('crypto');
var gm = require('gm');


// Create the knox client with your aws settings
Knox.aws = Knox.createClient({
    key: auth.amazon.key,
    secret: auth.amazon.secret,
    bucket: auth.amazon.bucket
});

// S3 upload service - stream buffers to S3
// ========================================
var s3UploadService = function(req, next) {
  req.files = {};
  var pathToFile;
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    if (!filename) {
      // If filename is not truthy it means there's no file
      return;
    }
    // Create the initial array containing the stream's chunks
    file.fileRead = [];

    file.on('data', function(chunk) {
      // Push chunks into the fileRead array
      this.fileRead.push(chunk);
    });

    file.on('error', function(err) {
      console.log('Error while buffering the stream: ', err);
    });

    file.on('end', function() {
      // Concat the chunks into a Buffer
      var finalBuffer = Buffer.concat(this.fileRead);
      gm(finalBuffer)
        .resize(1000)
        .toBuffer(function (err, buffer) {
          if (err) return console.log(err);

          req.files[fieldname] = {
            buffer: buffer,
            size: finalBuffer.length,
            filename: filename,
            mimetype: mimetype
          };

          // Generate date based folder prefix
          var datePrefix = moment().format('YYYY[/]MM');
          var key = crypto.randomBytes(10).toString('hex');
          var hashFilename = key + '-' + filename;

          pathToFile = '/files/' + datePrefix + '/' + hashFilename;

          var headers = {
            'Content-Length': req.files[fieldname].size,
            'Content-Type': req.files[fieldname].mimetype,
            'x-amz-acl': 'public-read'
          };

          Knox.aws.putBuffer( req.files[fieldname].buffer, pathToFile, headers, function(err, response){
            if (err) {
              console.error('error streaming image: ', new Date(), err);
              return next(err);
            }
            if (response.statusCode !== 200) {
              console.error('error streaming image[response.statusCode !== 200]: ', new Date(), err);
              return next(err);
            }
            console.log('Amazon response statusCode: ', response.statusCode);
            console.log('Your file was uploaded');
            next(null, pathToFile);
          });


      })


    });
  });

  req.busboy.on('error', function(err) {
    console.error('Error while parsing the form: ', err);
    next(err);
  });

  req.busboy.on('finish', function() {
    console.log('Done parsing the form!');
    // When everythin's done, render the view
    // next(null, pathToFile);
  });

  // Start the parsing
  req.pipe(req.busboy);
};

module.exports = s3UploadService;