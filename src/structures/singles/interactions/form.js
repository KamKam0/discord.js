const Base = require("../../bases/interactions/basecomponent")

class Modal extends Base{
    constructor(modal, bot){
        super("modal", modal, bot)
        let mappedComponents = modal.data.components?.filter(e => e.components[0].value !== "")?.map(component => component.components)
        this.components = []
        if(mappedComponents) mappedComponents.forEach(compo => {
            delete compo.type
            this.components.push(...compo)
        })
    }

    getComponent(name){
        return this.components.find(compo => compo.custom_id === name) || null
    }
}

module.exports = Modal