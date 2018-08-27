let express = require("express")
let next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  
  server.get('/release/:version', (request, response) => {
    const actualPage = "/release"
    const queryParams = { title: request.params.version}
    app.render(request, response, actualPage, queryParams)
  })
  
  server.get('*', (request,response) => {
    return handle(request, response)
  })


  server.listen(9001, (error) => {
    if (error) throw error
    console.log("> Ready on http://localhost:9001")
  })
})
.catch((exception) =>{
  console.error(exception.stack)
  process.exit(1)
})