


class conditionalCompute extends baseModal {
    static dialogId = 'conditionalCompute'
    static t = baseModal.makeT(conditionalCompute.dialogId)

    constructor() {
        var config = {
            id: conditionalCompute.dialogId,
            label: conditionalCompute.t('title'),
            splitProcessing:false,
            modalType: "two",
            RCode: `
require(stringr);
require(dplyr);
#If you are computing a new variable, we initialize the new variable to hold NAs
if ( is.null({{dataset.name}}\${{selected.newvar | safe}}))
{
    {{dataset.name}}\${{selected.newvar | safe}} <-NA
}
#Runs the conditional compute
{{dataset.name}}\${{selected.newvar | safe}} <- with( {{dataset.name}}, ifelse( {{selected.formulaBuilderCondition | safe}}, 
    {{selected.formulaBuilderConditionTrue | safe}}, {{selected.formulaBuilderConditionFalse | safe}} ) )
#Refreshes the dataset in the grid
BSkyLoadRefresh("{{dataset.name}}")
`,
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {scroll: true}) },
            newvar: {
                el: new input(config, {
                    no: 'newvar',
                    label: conditionalCompute.t('newvar'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                    overwrite: "variable",
                    required: true
                }),
            },
            formulaBuilderCondition: {
                el: new computeBuilder(config, {
                    no: "formulaBuilderCondition",
                    required:true,
                    label :conditionalCompute.t('formulaBuilderCondition'),
                    placeHolder: conditionalCompute.t('placeHolder1')
                })
            },
            formulaBuilderConditionTrue: {
                el: new computeBuilder(config, {
                    no: "formulaBuilderConditionTrue",
                    required:true,
                    label :conditionalCompute.t('formulaBuilderConditionTrue'),
                    placeHolder: conditionalCompute.t('placeHolder2')
                })
            },
            formulaBuilderConditionFalse: {
                el: new computeBuilder(config, {
                    no: "formulaBuilderConditionFalse",
                    required:true,
                    label :conditionalCompute.t('formulaBuilderConditionFalse'),
                    placeHolder: conditionalCompute.t('placeHolder3')
                })
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.newvar.el.content, objects.formulaBuilderCondition.el.content,objects.formulaBuilderConditionTrue.el.content,objects.formulaBuilderConditionFalse.el.content],
            nav: {
                name: conditionalCompute.t('navigation'),
                icon: "icon-sqrt_qmark",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: conditionalCompute.t('help.title'),
            r_help: conditionalCompute.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: conditionalCompute.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new conditionalCompute().render()
}
