let types = {
    Role:	1,
    User:	2,
    Channel:	3,
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}