const BaseUser = require("../managers/users")
class Users extends BaseUser{
    constructor(bot){
        super(bot)
    }
}

module.exports = Users