let types = {
    Role:	0,
    Member:	1,
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}