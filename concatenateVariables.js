










class concatenateVariables extends baseModal {
    static dialogId = 'concatenateVariables'
    static t = baseModal.makeT(concatenateVariables.dialogId)

    constructor() {
        var config = {
            id: concatenateVariables.dialogId,
            label: concatenateVariables.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
{{if (options.selected.repString =="")}}.GlobalEnv\${{dataset.name}}\${{selected.newvar | safe}} <- with({{dataset.name}}, BSkyPaste5 ({{selected.concatenate | safe}}, sep="", collapse = NULL, na.rm = T) )
{{#else}}.GlobalEnv\${{dataset.name}}\${{selected.newvar | safe}} <- with({{dataset.name}}, BSkyPaste5 ({{selected.concatenate | safe}}, sep = "{{selected.repString | safe}}", collapse = NULL, na.rm = T) )\n{{/if}}
BSkyLoadRefresh("{{dataset.name}}")
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            newvar: {
                el: new input(config, {
                    no: 'newvar',
                    label: concatenateVariables.t('newvar'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    overwrite: "variable",
                    required: true,
                    type: "character"
                })
            },
            concatenate: {
                el: new dstVariableList(config, {
                    label: concatenateVariables.t('concatenate'),
                    no: "concatenate",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            repString: {
                el: new input(config, {
                    no: 'repString',
                    label: concatenateVariables.t('repString'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.newvar.el.content, objects.concatenate.el.content, objects.repString.el.content,],
            nav: {
                name: concatenateVariables.t('navigation'),
                icon: "icon-concatenate_values",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: concatenateVariables.t('help.title'),
            r_help: concatenateVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: concatenateVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new concatenateVariables().render()
}
