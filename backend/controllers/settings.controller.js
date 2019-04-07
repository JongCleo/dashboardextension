let path = require('path')
let UserModel = require('../models/user.model')

exports.show_page = function(req, res) {

  //check cookies or request param
  // grab service availabilites
  // render page

  UserModel.findOne({
    email: req.session.email
  })
  .select("name graph_order")
  .exec(function(error, document) {
    if(document != null) {
      var fields = {
        name: document.name.split(' ')[0]
      };

      for (var i = 0; i < document.graph_order.length; i++) {
        fields[document.graph_order[i].graph_name] = true
      }
      
      res.render(path.join(__dirname,'../assets','index.ejs'),fields)
    }
  })

}
