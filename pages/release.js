import {withRouter} from 'next/router'
import Layout from '../components/layout.js'



const Content = withRouter((props) => (
  <div>
    <h2>{props.router.query.title} Statistics</h2>
    <p>Release Statistics ~~</p>
  </div>
))

const Page = (props) => (
  <Layout>
    <Content />
  </Layout>
)

export default Page