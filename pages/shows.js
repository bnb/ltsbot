import Layout from '../components/layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Shows = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
console.log(typeof show)
      ))}
    </ul>
  </Layout>
)

Shows.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)
  console.log(typeof data)

  return {
    shows: data
  }
}

export default Shows
