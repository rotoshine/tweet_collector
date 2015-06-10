module.exports = function(app){
  var mongoose = require('mongoose');
  var Tweet = mongoose.model('Tweet');

  app
    .route('/api/tweets')
    .get(function(req, res){
      return Tweet.find().exec(function(err, tweets){
        return res.send(tweets);
      });
    });
};
