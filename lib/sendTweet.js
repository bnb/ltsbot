const twitter = require('twit')

const twitterConsumerKey = process.env.CONSUMER_KEY
const twitterConsumerSecret = process.env.CONSUMER_SECRET
const twitterAccessToken = process.env.ACCESS_TOKEN
const twitterAccessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const twitterAPI = new twitter({
  consumer_key:         twitterConsumerKey,
  consumer_secret:      twitterConsumerSecret,
  access_token:         twitterAccessToken,
  access_token_secret:  twitterAccessTokenSecret,
  timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
})


const sendTweet = (tweetContent) => {
  if(process.env.NODE_ENV === "production") {
    twitterAPI.post('statuses/update', { status: tweetContent }, (error, data, response) => {
      if (error) throw error
      console.log(`~~ PRODUCTION MODE ~~`)
      console.log(`\nTweet triggered. Publishing this content now: \n\n${tweetContent}\n`)
    })
  } else {
    console.log(`~~ DEVELOPMENT MODE ~~`)
    console.log(`\nTweet triggered. Here's what the content would look like in production: \n\n${tweetContent}\n`)
  }
}


module.exports = sendTweet