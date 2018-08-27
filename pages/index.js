import Layout from '../components/layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'


const Index = (props) => (
  <Layout>
    <h1>🤖 node.js ltsbot 🤖</h1>
    <ul>
      {props.releases.map(({release}) => (
        <li key={release.version}>
          <Link as={`/v/${release.version}`} href={`/release?version=${release.version}`}>
            <a>{release.version}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const releaseData = await fetch('https://raw.githubusercontent.com/nodejs/Release/master/schedule.json')
  const schedule = await releaseData.json()
  
  let data = Object.keys(schedule).filter(v => {
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

  console.log("Dataset:", data)

  return {
    releases: data
  }
}

export default Index