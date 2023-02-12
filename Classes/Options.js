class Option{
    constructor(option){
        this.type = option.type ?option.type : 3
        this.name = option.name
        this.name_localizations = option.name_localizations ?option.name_localizations : {}
        this.description = option.description ?option.description : null
        this.description_localizations = option.description_localizations ?option.description_localizations : {}
        this.required = option.required ? option.required : false
        this.choices = option.choices ? option.choices.map(choi => new (require("./Choice"))(choi)) : []
        this.min_value = option.min_value ? option.min_value : 0
        this.max_value = option.max_value ? option.max_value : 6000
        this.min_length = option.min_length ? option.min_length : 1
        this.max_length = option.max_length ? option.max_length : 6000
        this.autocomplete = option.autocomplete ? option.autocomplete : false
    }

    compare(slash){
        for(const point of Object.keys(this)){
            let point2 = slash[point]
            if(point === "description_localizations" || point === "name_localizations"){
                let ppoint = Object.entries(this[point])
                let ppoint2 = Object.entries(point2)
                let errors
                ppoint.forEach(po => {
                    let po2 = ppoint2.find(e => e[0] === po[0])
                    if(!po2) errors = true
                    else if(po[1] !== po2[1]) errors=true
                })
                if(errors) return false
            }else if(point === "choices"){
                for(const choice of this.choices){
                    if(!point2.find(opt => opt.name === choice.name)) return false
                    if(!choice.compare(point2.find(opt => opt.name === choice.name))) return false
                }
                for(const choice of slash.choices) if(!this.choices.find(opt => opt.name === choice.name)) return false
            }else if(this[point] !== point2) return false
        }
        return true
    }

}

module.exports = Option