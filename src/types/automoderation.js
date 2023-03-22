let eventType = { 
    MessageSend: 1
}

let triggerType = { 
    Keyword: 1, 
    Spam: 3, 
    KeywordPreset: 4, 
    MentionSpam: 5 
}

let actionType = { 
    BlockMessage: 1, 
    SendAlertMessage: 2, 
    Timeout: 3 
}

module.exports = {
    eventType,
    triggerType,
    actionType
}

module.exports.revert = {
    eventType: () => revert(eventType),
    triggerType: () => revert(triggerType),
    actionType: () => revert(actionType)
}

function revert(){
    return require("../utils/functions").general.revertTypess(types)
}