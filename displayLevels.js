/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */









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
            r_help: displayLevels.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: displayLevels.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new displayLevels().render()
}
