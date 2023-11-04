const {user} = require('../models/index');

class UserRepository {
    async create(data){
        try {
            const user = await user.create(data);
            return user;
        } catch (error) {
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
}