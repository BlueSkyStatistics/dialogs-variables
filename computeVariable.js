/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */














class computeVariable extends baseModal {
    static dialogId = 'computeVariable'
    static t = baseModal.makeT(computeVariable.dialogId)

    constructor() {
        var config = {
            id: computeVariable.dialogId,
            label: computeVariable.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(stringr);
require(dplyr);

## support for design object. 
### backup current attributes if design object
isdesign = FALSE
backupattr = NULL
if(c("design") %in% class({{dataset.name}}))
{
    isdesign = TRUE
    dsattr = attributes({{dataset.name}})
    # backup all except names and row.names because new col may get added 
    backupattr = dsattr[!(names(dsattr) %in% c("names", "row.names"))]
}

#Computes the new/existing column
local({tryCatch({ .GlobalEnv\${{dataset.name}} <- {{dataset.name}} %>% mutate( {{selected.newvar |safe}} = {{selected.formula | safe}} )}, error = function(e){  cat(conditionMessage(e))} )})

### restore design attributes
if(isdesign)
{
    attributes({{dataset.name}}) = c(attributes({{dataset.name}}), backupattr)
}

#Refresh the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")
`,
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            newvar: {
                el: new input(config, {
                    no: 'newvar',
                    label: computeVariable.t('newvar'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                    overwrite: "variable",
                    required: true
                }),
            },
            formulaBuilder: {
                el: new computeBuilder(config, {
                    no: "formula",
                    required:true,
                    label: computeVariable.t('label2'),
                    placeHolder: computeVariable.t('placeHolder')
                })
            },
          
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.newvar.el.content, objects.formulaBuilder.el.content ],
            nav: {
                name: computeVariable.t('navigation'),
                icon: "icon-sqrt_x",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: computeVariable.t('help.title'),
            r_help: computeVariable.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: computeVariable.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new computeVariable().render()
}
