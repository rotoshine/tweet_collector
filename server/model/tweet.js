var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TweetSchema = new Schema({
  tweetId: {
    type: Number,
    unique: true,
    required: true
  },
  text: {
    type: String
  },
  userId: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
    required: true
  },
  collectDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tweet', TweetSchema);;
