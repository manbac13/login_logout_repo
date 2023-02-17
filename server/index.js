const express = require("express")
const RegisterRouter = require("./routes/registerRoute")
const LoginRouter = require("./routes/loginRoute")
const mainPageRouter = require("./routes/mainPage")
const bodyParser = require("body-parser")
const secret = "secret"

const app = express()

app.use(bodyParser())
app.use("/register", RegisterRouter);
app.use("/login", LoginRouter)
app.use("/table", mainPageRouter)


app.get("/", (req,res)=>{
    res.send("Hii from login logout app.")
})

app.listen(5000, ()=>{
    console.log("Server up at port 5000")
})
