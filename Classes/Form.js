class Form {
    constructor(){
        this.title = null
        this.custom_id = null
        this.components = []
    }
    
    AddTextInput(obj){
        this.components.push({type: 1, components: [obj]})
        return this
    }

    AddTextInputs(obj){
        this.components.push(...obj.map(e => { return {type: 1, components: [e]}}))
        return this
    }
    
    setCustomID(ID){
        if(!ID || !isNaN(ID) || ID.length < 1 || ID.length > 75) this.custom_id = null
        else this.custom_id = ID
        return this
    }
    
    setTitle(texte){
        if(!texte || !isNaN(texte) || texte.length < 1 || texte.length > 75) this.title = null
        else this.title = texte
        return this
    }
}

module.exports = Form