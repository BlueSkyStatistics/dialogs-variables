







class convertToFactor extends baseModal {
    static dialogId = 'convertToFactor'
    static t = baseModal.makeT(convertToFactor.dialogId)

    constructor() {
        var config = {
            id: convertToFactor.dialogId,
            label: convertToFactor.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
#Converts one or more variables to factor variables
BSky.Temp.Obj <- BSkyMakeMultiColumnFactor(c({{selected.trg | safe}}), '{{dataset.name}}')
#Refreshes the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            trg: {
                el: new dstVariableList(config, {
                    label: convertToFactor.t('trg'),
                    no: "trg",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.trg.el.content],
            nav: {
                name: convertToFactor.t('navigation'),
                icon: "icon-shapes",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: convertToFactor.t('help.title'),
            r_help: "help(data,package='utils')",
            body: convertToFactor.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new convertToFactor().render()
}
