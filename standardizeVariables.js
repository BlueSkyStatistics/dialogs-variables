









class standardizeVariables extends baseModal {
    static dialogId = 'standardizeVariables'
    static t = baseModal.makeT(standardizeVariables.dialogId)

    constructor() {
        var config = {
            id: standardizeVariables.dialogId,
            label: standardizeVariables.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
#Standardize the variables
BSkyStandardizeVars(vars=c({{selected.dest | safe}}), center={{selected.Center | safe}}, scale={{selected.Scale | safe}}, stingToPrefixOrSuffix=c("{{selected.txt1 | safe}}"), prefixOrSuffix=c('{{selected.rdgrp1 | safe}}'), datasetname="{{dataset.name}}")
#Refresh the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: standardizeVariables.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            dest: {
                el: new dstVariableList(config, {
                    label: standardizeVariables.t('dest'),
                    no: "dest",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label2: { el: new labelVar(config, { label: standardizeVariables.t('label2'), style: "mt-3",h: 5  }) },
            suffix: { el: new radioButton(config, { label: standardizeVariables.t('suffix'), no: "rdgrp1", increment: "suffix", value: "Suffix", state: "checked", extraction: "ValueAsIs" }) },
            prefix: { el: new radioButton(config, { label: standardizeVariables.t('prefix'), no: "rdgrp1", increment: "prefix", value: "Prefix", state: "", extraction: "ValueAsIs" }) },
            txt1: {
                el: new input(config, {
                    no: 'txt1',
                    label: standardizeVariables.t('txt1'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                    ml: 4,
                    type: "character"
                }),
            },
            label3: { el: new labelVar(config, { label: standardizeVariables.t('label3'), h: 5, style: "mt-3"  }) },
            Center: { el: new checkbox(config, { label: standardizeVariables.t('Center'), no: "Center", extraction: "Boolean" }) },
            Scale: { el: new checkbox(config, { label: standardizeVariables.t('Scale'), no: "Scale", newline: true, extraction: "Boolean" }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.dest.el.content, objects.label2.el.content, objects.suffix.el.content, objects.prefix.el.content, objects.txt1.el.content,objects.label3.el.content, objects.Center.el.content, objects.Scale.el.content],
            nav: {
                name: standardizeVariables.t('navigation'),
                icon: "icon-standardize",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: standardizeVariables.t('help.title'),
            r_help: "help(data,package='utils')",
            body: standardizeVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new standardizeVariables().render()
}
