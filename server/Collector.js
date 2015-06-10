var Twitter = require('Twitter');
var Tweet = require('./model/Tweet');
var async = require('async');

// twitter init
var SEARCH_URL = 'search/tweets';

module.exports = function(twitterConfig, queryParam, collectCycleParam){
  var that = this;
  var client = new Twitter(twitterConfig);
  var collectingCycle = collectCycleParam
  var query = queryParam;

  var collect = function(){
    client.get(SEARCH_URL, queryParam, function(error, result, response){
      if(result !== null && result.hasOwnProperty('statuses')){
        var tweets = result.statuses;

        // TODO 제네레이터를 이용해서 좀 더 쉽게 비동기 처리할 수 있는 수단을 강구하자
        var works = [];
        for(var i = 0; i < tweets.length; i++){
          (function(searchTweet){
            works.push(function(next){
                Tweet
                  .find({tweetId: searchTweet.id})
                  .exec(function(err, result){
                    if(err !== null){
                      return next(err);
                    }else if(result.length > 0){
                      console.log(searchTweet.id + ' tweet already exists.');
                      return next();
                    }else{
                      var tweet = new Tweet({
                        tweetId: searchTweet.id,
                        text: searchTweet.text,
                        userId: searchTweet.user.id,
                        username: searchTweet.user.name,
                        displayName: searchTweet.user.screen_name,
                        profileImageUrl: searchTweet.user.profile_image_url
                      });

                      return tweet.save(function(err){
                        console.log(tweet.tweetId + ' tweet collected.')
                        return next(err);
                      });
                    }
                  });
            });
          })(tweets[i]);
        }

        // work start
        async.parallel(works, function(err){
          if(err !== null){
            console.log(err);
          }


          return setTimeout(collect, collectingCycle);
        });
      }
    });
  };


  this.collectStart = function(){
    console.log('collect start.');
    collect();
  };
};
