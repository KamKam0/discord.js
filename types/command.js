let types = {
    ChatInput:	1,
    User:	2,
    Message:	3
}

module.exports = types

module.exports.revert = () => {
    return require("../Utils/functions").general.revertTypess(types)
}