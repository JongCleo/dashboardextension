let path = require('path')

exports.show_page = function(req, res) {

  //check cookies or request param
  // grab service availabilites
  // render page
  res.sendFile(path.join(__dirname,'../assets','index.html'))

}
