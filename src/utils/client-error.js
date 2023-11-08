const AppErrors = require('./error-handles');
const {StatusCode} = require('http-status-codes');

class ClientError extends AppErrors{
    constructor(name , message , explanation ,StatusCode){
        super(
            name,
            message,
           explanation,
            StatusCode
        )
    }
}
module.exports =ClientError