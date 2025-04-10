/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */









class deleteVariables extends baseModal {
    static dialogId = 'deleteVariables'
    static t = baseModal.makeT(deleteVariables.dialogId)

    constructor() {
        var config = {
            id: deleteVariables.dialogId,
            label: deleteVariables.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
#Deletes the specified variables
{{dataset.name}} <- {{dataset.name}} %>% \n\tdplyr::select(-c({{selected.trg | safe}}))
BSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            trg: {
                el: new dstVariableList(config, {
                    label: deleteVariables.t('trg'),
                    no: "trg",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.trg.el.content],
            nav: {
                name: deleteVariables.t('navigation'),
                icon: "icon-trash",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: deleteVariables.t('help.title'),
            r_help: deleteVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: deleteVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new deleteVariables().render()
}
