import Header from './header.js'

const layoutStyle = {
  margin: 100,
  padding: 20
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout
