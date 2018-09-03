import Layout from '../components/layout.js'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'

const Index = (props) => (
  <Layout>
    <h1>🤖 LTS Releases 🤖</h1>
    <ul>
    {props.releases.map(({release}) => (
console.log(typeof release)
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  let releaseData = await fetch('https://raw.githubusercontent.com/nodejs/Release/master/schedule.json')
  let schedule = await releaseData.json()
    
  const data = Object.keys(schedule).filter(v => {
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

  console.log(`Release data fetched. Logging count: ${data.length}`)
  console.log('Logging type of object before being passed as prop: ' + typeof data)


  return {
    releases: data
  }
}

export default Index