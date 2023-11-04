const express = require('express');
const bodyParser = require('body-parser')
const {PORT} = require('./config/serverConfig')
const apiRoutes = require('./routes/index')
// const {User} = require('./models/index')

const app = express();

const prepateAndStartServer = () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api' ,apiRoutes)
    app.listen(3001, ()=> {
        console.log(`server started at port: ${PORT}`)
        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);
        // const incomingpassword ='123456';
        // const user = await user.findByPk(3);
        // const response = bcrypt.compateSync(incomingpassword , user.password);
        // console.log(response)
    })
}
prepateAndStartServer();