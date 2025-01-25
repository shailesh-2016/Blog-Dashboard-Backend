const express = require('express')
const app = express()
const PORT = 5000
require("./config/db").main()
app.set("view engine","ejs")

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/post',express.static('uploads'))
// app.use('/profile',express.static('uploads'))
const cookieParser = require("cookie-parser");
const router = require('./Router/blog.route')
const View=require('./Router/view.route')
const Admin = require('./Router/admin.route')
app.use(cookieParser())
app.use(express.json())
app.use('/api',router)
app.use('/',View)
app.use("/api/admin",Admin)

app.get('/', (req, res) => res.render('Pages/index'))
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))