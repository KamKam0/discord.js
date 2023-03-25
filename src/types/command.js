let types = {
    ChatInput:	1,
    User:	2,
    Message:	3
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}