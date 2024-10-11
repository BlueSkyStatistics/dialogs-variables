












class missValsFormula extends baseModal {
    static dialogId = 'missValsFormula'
    static t = baseModal.makeT(missValsFormula.dialogId)

    constructor() {
        var config = {
            id: missValsFormula.dialogId,
            label: missValsFormula.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
#If_else does type checking, 10 is adouble in R, 10L is an integer
#{{dataset.name}}\${{selected.depVar | safe}}<-with ({{dataset.name}}, dplyr::if_else(is.na({{selected.depVar | safe}}),{{selected.formula | safe}},{{selected.depVar | safe}}))
{{dataset.name}}\${{selected.depVar | safe}}<-with ({{dataset.name}}, base::ifelse(is.na({{selected.depVar | safe}}),{{selected.formula | safe}},{{selected.depVar | safe}}))
BSkyLoadRefresh("{{dataset.name}}")
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            depVar: {
                el: new dstVariable(config, {
                    label: missValsFormula.t('depVar'),
                    no: "depVar",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label1: {el: new labelVar(config, {no: 'label1', label: missValsFormula.t('label1'), style: "mt-3",h: 9}) },
            formulaBuilder: {
                el: new formulaBuilder(config, {
                    no: "formula",
                    required: true,
                    label: missValsFormula.t('formula'),
                })
            },

          
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [ objects.depVar.el.content, objects.formulaBuilder.el.content],
            nav: {
                name: missValsFormula.t('navigation'),
                icon: "icon-formula",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: missValsFormula.t('help.title'),
            r_help: "help(data,package='utils')",
            body: missValsFormula.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new missValsFormula().render()
}
