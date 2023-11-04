const jwt = require('jsonwebtoken');

const UserRepository= require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');

class userService {
    constructor(){
        this.userRepository= new this.userRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('there is error in the user service layer');
            throw error;
            
        }
    }
    createToken(user){
        try {
            const result = jwt.sign(user ,JWT_KEY , {expiresIn:'1h'});
            return result;
            
        } catch (error) {
            console.log('there is error in the user service layer')
            throw error;
            
        }
    }
    verifyToken(token){
        try {
            const response =jwt.verify(token ,JWT_KEY);
            return response;
        } catch (error) {
            console.log('there is error in the user service layer')
            throw error;
        }
    }
}
module.exports=userService