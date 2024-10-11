







class displayLevels extends baseModal {
    static dialogId = 'displayLevels'
    static t = baseModal.makeT(displayLevels.dialogId)

    constructor() {
        var config = {
            id: displayLevels.dialogId,
            label: displayLevels.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(tidyverse)
require(dplyr)
{{dataset.name}} %>%\n\tdplyr::select({{selected.target | safe}}) %>%\n\tpurrr::map(levels) 
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: displayLevels.t('target'),
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.target.el.content],
            nav: {
                name: displayLevels.t('navigation'),
                icon: "icon-eye_white_comp",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: displayLevels.t('help.title'),
            r_help: "help(data,package='utils')",
            body: displayLevels.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new displayLevels().render()
}
