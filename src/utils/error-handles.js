const {INTERNAL_SERVER_ERROR}= require('http-status-codes');
class AppErrors extends Error{
    constructor(
        name='AppError',
        message='something went wrong',
        explanation ='something went wrong',
        statusCode =statusCode.INTERNAL_SERVER_ERROR
    ){
        super();
        this.message = message,
        this.explanation=explanation,
        this.name = name,
        this.statusCode=statusCode

    }
}
module.exports=AppErrors