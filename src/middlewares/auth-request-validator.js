const validateUserAuth =(req, res ,next) =>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message:'something went wrong',
            err:'email or pasword is missing in the signup request'
        })
    }
    next();
}
module.exports ={
    validateUserAuth
}