const moment = require('moment')

// Local requires:
// const sendTweet = require("./lib/sendTweet")
const schedule = require('./lts.json')

// Function to create the different messages in a human-readable format
const buildStatements = function(version, total, daysIn, daysLeft, percentage) {
  const statement = "📊 The @nodejs " + version + " release line is " + percentage + "% through its lifespan, having been around for " + daysIn + " days. There are " + daysLeft + " days until it goes EoL."
  const statementDiff = "⏱  Diff between start/end: " + total
  const statementToDate = "🏃‍  Current days through release: " + daysIn
  const statementToEOL = "☠️  Current days until Release EOL: " + daysLeft
  const statementPercentage = "💯  Percentage so far: " + percentage +"%"
  
  console.log("\n")
  console.log("      Node.js " + version + " information      ")
  console.log("\n")
  console.log(statementDiff)
  console.log(statementToDate)
  console.log(statementToEOL)
  console.log(statementPercentage)
  console.log("\n")
  console.log("" + version + " Statement:")
  console.log(statement)
  
  // sendTweet(tweet)
}

// Build out JSON filtering
let filtered = Object.keys(schedule).filter(v => {
  let release = schedule[v]
  if(moment(release.start).isBefore() && moment(release.end).isAfter()) return true
  return false
}).map(v => {
  let r = schedule[v]
  return {
    version: v, // Release Line
    start: moment(r.start), // Release Line Start Date
    end: moment(r.end), // Release Line End Date
    total: moment(r.end).diff(r.start) / 1000 / 60 / 60 / 24, // Difference between `start` and `end`
    daysIn: moment().diff(r.start) / 1000 / 60 / 60 / 24 // How many days have elapsed since `start`
  }
});

filtered.forEach(checkForPublishing) // Run version check at application start

setInterval(function(){ // Run version check every 10 hours
  filtered.forEach(checkForPublishing)
}, 1000 * 60 * 10);

function checkForPublishing(v) { // Expects `v` to be an object of version metadata
  //Values being pulled directly from the object
  let version = v.version // Release Line Version
  let rawTotal = v.total // Total length of Release Line lifespan
  let rawDaysIn = v.daysIn // Progress through the Release Line's lifespan
  
  // Custom raw numbers being created with ✨ MATH ✨
  let rawPercentage = rawDaysIn / rawTotal * 100 // Raw and very long percentage
  let rawDaysLeft = rawTotal - rawDaysIn // Inverse of daysIn – how many days remain in a Relase Line's lifespan?
  
  // Clean numbers being created by rounding each raw number and subtracting 0.5 (to "force" always rounding down)
  let total = Math.round(rawTotal - 0.5)
  let daysIn = Math.round(rawDaysIn - 0.5)
  let percentage = Math.round(rawPercentage - 0.5)
  let daysLeft = Math.round(rawDaysLeft - 0.5)
  
  buildStatements(version, total, daysIn, daysLeft, percentage)
}