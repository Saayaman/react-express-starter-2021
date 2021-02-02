import express from "express"
import bodyParser from "body-parser"
import mongooose from "mongoose"
import cors from "cors"

import postRoutes from "./routes/posts.js"

const app = express()

app.use("/posts", postRoutes)

const connectionUrl = process.env.ATLAS_URI
const PORT = process.env.PORT || 4000

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())


// app.get("/", (req, res) => {
//   res.send('Hello World')
// })
mongooose.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  }))
  .catch(error => console.log(error.message))

mongooose.set('useFindAndModify', false)

