const base = require("../bases/components/base")
const textInput = require("./textinput")
class Form extends base{

    constructor(data){
        super()

        this.title = null
        this.components = []

        if(data) this._handleInitiationData(data)
    }
    
    AddTextInput(obj){
        if(!(obj instanceof textInput) && (typeof obj !== "object" || typeof obj.type !== "number" || !Array.isArray(obj.components) || !obj.components.length)) return this
        if(obj instanceof textInput) this.components.push({type: 1, components: [obj]})
        else this.components.push(obj)
        return this
    }

    AddTextInputs(array){
        if(!Array.isArray(array)) array = undefined
        let texts = array || [...arguments]
        texts.forEach(e => this.AddTextInput(e))
        return this
    }
    
    setTitle(texte){
        if(!texte || !isNaN(texte) || texte.length < 1 || texte.length > 75) return this
        else this.title = texte
        return this
    }
}

module.exports = Form