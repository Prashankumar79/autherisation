const jwt = require('jsonwebtoken');

const UserRepository= require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const AppErrors = require('../utils/error-handles');

class userService {
    constructor(){
        this.userRepository= new this.userRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name =='SequelizeValidationError'){
                throw error;
            }
            console.log('there is error in the user service layer');
            throw new AppErrors(
                'ServerError',
                'something went wrong in service',
                'logical issues found',
                500 
            );
            
        }
    }
    async signIn(email ,plainPassword){
        try {
            // step -1 fetch the user using email
            const user = await this.UserRepository.getByEmail(email)
            // step-2 compare the password with encrypted password
            const passwordsMatch = this.checkPassword(plainPassword , user.password);
            if(!passwordsMatch){
                console.log('password doesnot match');
                throw{error:'incorrect password'};

            }
            // step -3 if password match the then create a token ans send ti to the user
            const newJWT = this.createToken({email:user.email , id:user.id});
            return newJWT
        } catch (error) {
            console.log('ther is error in the service layer');
            throw error
        }
    }
    async isAuthenticated(token){
        try {
            const response =this.verifyToken(token);
            if(!response){
                throw {error:'invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error:'no user with the corresponding token exist'};
            }
            return user.id;
            
        } catch (error) {
            console.log('there is error in the userService layer');
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
    checkPassword(userInputPlainPassword ,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword ,encryptedPassword)
        } catch (error) {
            console.log('there is error in the user service layer')
            throw error; 
        }
    }
    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
}
module.exports=userService