const { ValidationError } = require('sequelize');
const {user , Role} = require('../models/index');
const ClientError = require('../utils/client-error');

class UserRepository {
    async create(data){
        try {
            const user = await user.create(data);
            return user;
        } catch (error) {
            if(error.name =='SequelizeValidationError'){
                throw new ValidationError(error);
            }
            console.log('something went wrong on repository leyer');
            throw error;
            
        }
    }
    async destroy(userId){
        try {
            await user.destroy({
                where:{
                    id:userId
                }
            });
            return true;
            
        } catch (error) {
            console.log('something went wrong on repository leyer');
            throw error;
            
        }
    }
    async getById(userId){
        try {
            const user = await User.findByPk(userId ,{
                attributes:['email' ,'id']
            })
            return user;
            
        } catch (error) {
            console.log('something went wrong in the repository layer');
            throw error;
            
        }
    }
    async getByEmail(userEmail){
        try {
            const user = await User.findOne({where :{
                email:userEmail
            }})
            if(!user){
                throw new ClientError(
                    'Email not found',
                    'invalid email sent in the request',
                    'please check the email, as there is no record of the email',
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log('there is error in the repository layer');
            throw error;
        }
    }
    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            });
            return user.hasRole(adminRole);
            
        } catch (error) {
            console.log('something went wrong in the userRepository');
            throw error;
        }
    }
}
module.exports = UserRepository;