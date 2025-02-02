










class applyFunctionAcrossRows extends baseModal {
    static dialogId = 'applyFunctionAcrossRows'
    static t = baseModal.makeT(applyFunctionAcrossRows.dialogId)

    constructor() {
        var config = {
            id: applyFunctionAcrossRows.dialogId,
            label: applyFunctionAcrossRows.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
#Apply function to all rows
{{dataset.name}}\${{selected.newvar | safe}} <-{{dataset.name}}  %>%\n\tdplyr::select({{selected.target | safe}}) %>%\n\tbase::apply(1, {{selected.selectctrl | safe}}, na.rm = TRUE)
#Refresh the dataset in the grid
BSkyLoadRefresh("{{dataset.name}}")
            `
        }
        var objects = {
            label1: { el: new labelVar(config, { label: applyFunctionAcrossRows.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            newvar: {
                el: new input(config, {
                    no: 'newvar',
                    label: applyFunctionAcrossRows.t('newvar'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                    overwrite: "variable",
                    required: true
                }),
            },
            target: {
                el: new dstVariableList(config, {
                    label: applyFunctionAcrossRows.t('target'),
                    no: "target",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            selectctrl: {
                el: new comboBox(config, {
                    no: 'selectctrl',
                    label: applyFunctionAcrossRows.t('selectctrl'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    default: "mean",
                    options: ["mean", "median", "min", "max", "sd", "sum", "var",]
                })
            },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.newvar.el.content, objects.target.el.content, objects.selectctrl.el.content,],
            nav: {
                name: applyFunctionAcrossRows.t('navigation'),
                icon: "icon-calculator_across_rows",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: applyFunctionAcrossRows.t('help.title'),
            r_help: applyFunctionAcrossRows.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: applyFunctionAcrossRows.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new applyFunctionAcrossRows().render()
}
