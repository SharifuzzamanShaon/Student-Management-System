const express = require("express");
const app = express()
const bodyParser = require('body-parser');
const authenticate = require("./middleware/auth");
const { connectDB } = require("./configDB/connectDB");
const routes = require("./router");
const User = require("./model/User");
const logger = require('./config/logger');
const rateLimitMiddleware = require("./middleware/rateLimit");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Private router
app.get("/private", authenticate, async (req, res) => {
    const validUser = req.userss
    return res.status(200).send({ message: "Welcome to private router", validUser })
})

app.get("/getSingle/:userId", async(req, res, next) => {
    try {
        const { userId } = req.params
        const user =await User.findById( userId );
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }

})

app.get("/health",(req,res)=>{
    res.status(200).send("Server is running")
})

app.use(routes)
app.get("/test", rateLimitMiddleware, (req, res) => {
    res.send("Hello World")
})

app.use((error, req, res, text) => {
    const message = error.message ? error.message : "Server Error Occured"
    const status = error.status ? error.status : 500
    res.status(status).send(message)
})

app.listen(5020, async () => {
    console.log("server running at http://localhost:5020");
    await connectDB();
})