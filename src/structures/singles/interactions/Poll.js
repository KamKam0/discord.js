const Base = require("../../bases/base")
const pollTypes = require("../../../types/poll")
const pollMethod = require("../../../methods/poll")

class Poll extends Base {
    constructor(poll, bot){
        super(bot)

        this._modifyConstants.push({name: "layout_type", data: pollTypes.revert()})

        this.message_id = poll.message_id
        this.channel_id = poll.channel_id
        this.question = poll.question || null
        this.answers = poll.answers || []
        this.results = poll.results || []
        this.expiry = poll.expiry || 0
        this.allow_multiselect = poll.allow_multiselect || false
        this.layout_type = this._typechange(this._modifyConstants.find(e => e.name === "layout_type").data, poll.layout_type)
    }

    async end(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            message_id: this.message_id,
            channel_id: this.channel_id
        }
        return pollMethod.endPoll(informations)
    }

    /**
     * 
     * @param {number} answerId 
     * @returns 
     */
    async getAnswers(answerId){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            message_id: this.message_id,
            channel_id: this.channel_id,
            answer_id: answerId
        }
        return pollMethod.getAnswers(informations, answerId)
    }
}

module.exports = Poll