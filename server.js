const express = require("express");
const app = express();
const PORT = 5000;

const cookieParser = require("cookie-parser");
const router = require("./Router/blog.route");
const catRouter = require("./Router/cat.route");
const View = require("./Router/view.route");
const Admin = require("./Router/admin.route");
const session = require("express-session");
const flash=require("connect-flash")

app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/post", express.static("uploads"));



app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(express.json());

const passport=require("passport")
const passportAuth=require("./config/passport")
passportAuth(passport)
app.use(passport.initialize())
app.use(passport.session())





// app.use('/profile',express.static('uploads'))



app.use("/api", router);
app.use("/", View);
app.use("/api/admin", Admin);

require("./config/db").main();

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
