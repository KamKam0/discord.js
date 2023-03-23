let types = {
    SubCommand:	1,
    SubCommandGroup:	2,
    String:	3,
    Integer:	4,
    Boolean:	5,
    User:	6,
    Channel:	7,
    Role:	8,
    Mentionnable:	9,
    Number:	10,
    Attachment:	11
}

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}