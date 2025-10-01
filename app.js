const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const userModel = require("./models/user-model")
const app = express()
const port = 3000


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.set('view engine','ejs')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
