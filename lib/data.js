const moment = require('moment')

const schedule = require('./lts.json')

// Function that can create the different messages in a human-readable format
const buildStatements = function(version, total, daysIn, daysLeft, percentage) {
  let statement = {
    "tweet": "📊 The @nodejs " + version + " release line is " + percentage + "% through its lifespan, having been around for " + daysIn + " days. There are " + daysLeft + " days until it goes EoL.", 
    "diff": "⏱  Diff between start/end: " + total,
    "toDate": "🏃‍  Current days through release: " + daysIn,
    "toEOL": "☠️  Current days until Release EOL: " + daysLeft,
    "percentage": "💯  Percentage so far: " + percentage +"%"
  }
  
  console.log("\n")
  console.log("      Node.js " + version + " information      ")
  console.log("\n")
  console.log(statement.diff)
  console.log(statement.toDate)
  console.log(statement.toEOL)
  console.log(statement.percentage)
  console.log("\n")
  console.log("" + version + " Statement:")
  console.log(statement.tweet)
}

let computeReleaseLineData = function(v) { // Expects `v` to be an object of version metadata
  //Values being pulled directly from the object
  let rawTotal = v.total // Total length of Release Line lifespan
  let rawDaysIn = v.daysIn // Progress through the Release Line's lifespan

  // Custom raw numbers being created with ✨ MATH ✨
  let rawPercentage = rawDaysIn / rawTotal * 100 // Raw and very long percentage
  let rawDaysLeft = rawTotal - rawDaysIn // Inverse of daysIn – how many days remain in a Relase Line's lifespan?


  let publishing = {
    "version": v.version,
    "total": Math.round(rawTotal - 0.5),
    "daysIn": Math.round(rawDaysIn - 0.5),
    "daysLeft": Math.round(rawDaysLeft - 0.5),
    "percentage": Math.round(rawPercentage - 0.5)
  }    

  buildStatements(publishing.version, publishing.total, publishing.daysIn, publishing.daysLeft, publishing.percentage)
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

filtered.forEach(computeReleaseLineData) // Run version check at application start