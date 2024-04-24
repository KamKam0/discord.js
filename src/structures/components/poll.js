const origin = require("../bases/components/base")

class Poll extends origin{
    constructor(data={}){
        super(data)
        this.question = data.question || null
        this.answers = data.answers || []
        this.duration = data.duration || 0
        this.allow_multiselect = data.allow_multiselect || false
        this.layout_type = 1
    }
    
    /**
    * @param {number} duration
    * @returns {Poll}
    */
    setDuration(duration){
        if (typeof duration !== 'number') return this
        if(duration < 1 || duration > 168) return this
        this.duration = duration
        return this
    }

    /**
    * @param {boolean} allowMultiselect 
    * @returns {Poll}
    */
    setAllowMultiselect(allowMultiselect){
        if (typeof allowMultiselect !== 'boolean') return this
        this.allow_multiselect = allowMultiselect
        return this
    }

    /**
    * @param {object} question
    * @param {string} question.text 
    * @param {string} question.emoji 
    * @returns {Poll}
    */
    setQuestion(question){
        if (typeof question !== 'object') return this
        if (typeof question.text !== 'string') return this
        if (question.emoji && typeof question.emoji !== 'string') return this
        this.question = question
        return this
    }

    /**
    * @param {object} questions
    * @returns {Poll}
    */
    addAnswers(array){
        if(!Array.isArray(array)) array = undefined
        let fields = array || [...arguments]
        fields.filter(e => typeof e === "object").forEach(field => this.addAnswer(field.answerId, field.text, field.emoji))
        return this
    }

    /**
    * @param {string} name
    * @param {string} value
    * @param {string} inline
    * @returns {Poll}
    */
    addAnswer(answerId, text, emoji){
        if (this.answers.length === 10) {
            return this
        }
        if (typeof answerId !== 'number') return this
        if (typeof text !== 'string') return this
        if (emoji && typeof emoji !== 'object') return this
        if (emoji && (typeof emoji.name !== 'string' && typeof emoji.id !== 'string')) return this
        this.answers.push({answer_id: answerId, poll_media: {text, emoji}})
        return this
    }
}

module.exports = Poll