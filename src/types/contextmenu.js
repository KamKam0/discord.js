let types = {
    String:	3,
    User:	5,
    Role:	6,
    Mentionnable:	7,
    Channel:	8,
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}