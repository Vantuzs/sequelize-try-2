class UserNotFound extends Error{
    constructor(message){
        super(message)
        this.message = 'User not found =('
    }
}

module.exports = UserNotFound