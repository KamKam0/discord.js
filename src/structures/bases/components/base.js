class componentBase{
    
    constructor(data){
        this.custom_id = data.custom_id || null
    }
    
    /**
    * @param {string} ID
    * @returns {Button}
    */
    setCustomID(ID){
        if(!ID || !isNaN(ID) || ID.length < 1 || ID.length > 75) this.custom_id = null
        else this.custom_id = ID
        return this
    }
}

module.exports = componentBase