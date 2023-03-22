const BaseUser = require("../managers/Users")
class Users extends BaseUser{
    constructor(bot){
        super(bot)
    }
}

module.exports = Users