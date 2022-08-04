const fs = require('fs')

module.exports = function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {return cb && cb(err);}
    try {return cb && cb(null, JSON.parse(fileData));}
    catch (err) {return cb && cb(err);}
  });
}