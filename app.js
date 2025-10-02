const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const userModel = require("./models/user-model")
const db = require("./config/mongo-connection")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")
const ownersRouter = require("./routes/ownersRouter")
const index = require("./routes/index")
const app = express()
const port = 3000


app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())

app.use("/",index)
app.use("/users",usersRouter)
app.use("/products",productsRouter)
app.use("/owners",ownersRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
