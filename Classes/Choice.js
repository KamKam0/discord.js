class Choice{
    constructor(choice){
        this.name = choice.name
        this.name_localizations = choice.name_localizations ? choice.name_localizations : {}
        this.value = choice.value
    }

    compare(slash){
        for(const point of Object.keys(this)){
            let point2 = slash[point]
            if(point === "name_localizations"){
                let ppoint = Object.entries(this[point])
                let ppoint2 = Object.entries(point2)
                let errors
                ppoint.forEach(po => {
                    let po2 = ppoint2.find(e => e[0] === po[0])
                    if(!po2) errors = true
                    else if(po[1] !== po2[1]) errors=true
                })
                if(errors) return false
            }else if(this[point] !== point2) return false
        }
        return true
    }

}

module.exports = Choice