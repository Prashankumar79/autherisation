const express = require('express');
const {PORT} = require('./config/serverConfig')

const app = express();

const prepateAndStartServer = () =>{
    app.listen(3001, ()=> {
        console.log(`server started at port: ${PORT}`)
    })
}
prepateAndStartServer();