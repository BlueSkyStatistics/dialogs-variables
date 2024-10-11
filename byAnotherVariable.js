










class byAnotherVariable extends baseModal {
    static dialogId = 'byAnotherVariable'
    static t = baseModal.makeT(byAnotherVariable.dialogId)

    constructor() {
        var config = {
            id: byAnotherVariable.dialogId,
            label: byAnotherVariable.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
## [Reorder by Another Variable]
require(forcats);
{{ if ( options.selected.grp10 =="Overwrite"  ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_reorder( .f={{dataset.name}}\${{selected.target[0] | safe}}, .x={{dataset.name}}\${{selected.variableToOrderBy | safe}},.fun = {{selected.function | safe}},.desc={{selected.specifyOrder | safe}}){{/if}}
{{ if ( options.selected.grp10 =="Prefix"  ) }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_reorder(.f={{dataset.name}}\${{selected.target[0] | safe}},.x={{dataset.name}}\${{selected.variableToOrderBy | safe}},.fun = {{selected.function | safe}},.desc={{selected.specifyOrder | safe}}){{/if}}
{{ if ( options.selected.grp10 =="Suffix" ) }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_reorder(.f={{dataset.name}}\${{selected.target[0] | safe}},.x={{dataset.name}}\${{selected.variableToOrderBy | safe}},.fun = {{selected.function | safe}},.desc={{selected.specifyOrder | safe}}){{/if}}
\nBSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: byAnotherVariable.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
            target: {
                el: new dstVariable(config, {
                    label: byAnotherVariable.t('target'),
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "Prefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            variableToOrderBy: {
                el: new dstVariable(config, {
                    label: byAnotherVariable.t('variableToOrderBy'),
                    no: "variableToOrderBy",
                    filter: "Numeric|Date|Scale",
                    extraction: "Prefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            function: {
                el: new comboBox(config, {
                    no: 'function',
                    label: byAnotherVariable.t('function'),
                    multiple: false,
                    required: true,
                    extraction: "NoPrefix|UseComma",
                    options: ["mean", "median", "sum", "min", "max",]
                })
            },
            label2: { el: new labelVar(config, { label: byAnotherVariable.t('label2'), style: "mt-3",h: 5 }) },
            rd3: { el: new radioButton(config, { label: byAnotherVariable.t('rd3'), no: "grp10", increment: "rd3", required: true, dependant_objects: ["txt3"], value: "Suffix", state: "checked", extraction: "ValueAsIs", }) },
            txt3: {
                el: new input(config, {
                    no: 'txt3',
                    label: byAnotherVariable.t('txt3'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd2: { el: new radioButton(config, { label: byAnotherVariable.t('rd2'), no: "grp10", increment: "rd2", dependant_objects: ["txt4"], required: true, value: "Prefix", state: "", extraction: "ValueAsIs", }) },
            txt4: {
                el: new input(config, {
                    no: 'txt4',
                    label: byAnotherVariable.t('txt4'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd1: { el: new radioButton(config, { label: byAnotherVariable.t('rd1'), no: "grp10", increment: "rd1", value: "Overwrite", state: "", extraction: "ValueAsIs" }) },
            label3: { el: new labelVar(config, { label: byAnotherVariable.t('label3'), style: "mt-3",h: 5 }) },
            Descending: { el: new radioButton(config, { label: byAnotherVariable.t('Descending'), no: "specifyOrder", increment: "Descending", value: "TRUE", state: "checked", extraction: "ValueAsIs", }) },
            Ascending: { el: new radioButton(config, { label: byAnotherVariable.t('Ascending'), no: "specifyOrder", increment: "Ascending", value: "FALSE", state: "", extraction: "ValueAsIs", }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.variableToOrderBy.el.content, objects.function.el.content, objects.label3.el.content, objects.Descending.el.content, objects.Ascending.el.content, objects.label2.el.content, objects.rd3.el.content, objects.txt3.el.content, objects.rd2.el.content, objects.txt4.el.content, objects.rd1.el.content],
            nav: {
                name: byAnotherVariable.t('navigation'),
                icon: "icon-reorder_by_one_var",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: byAnotherVariable.t('help.title'),
            r_help: "help(data,package='utils')",
            body: byAnotherVariable.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        var temp = "";
        instance.objects.target.el.getVal().forEach(function (value) {
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    target: instance.dialog.prepareSelected({ target: value }, instance.objects.target.r),
                    variableToOrderBy: instance.objects.variableToOrderBy.el.getVal(),
                    function: instance.objects.function.el.getVal(),
                    grp10: common.getCheckedRadio("byAnotherVariable_grp10"),
                    specifyOrder: common.getCheckedRadio("byAnotherVariable_specifyOrder"),
                    txt3: instance.objects.txt3.el.getVal(),
                    txt4: instance.objects.txt4.el.getVal(),
                }
            }
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd + "\n";
        })
        res.push({ cmd: temp, cgid: newCommandGroup() })
        return res;
    }
}

module.exports = {
    render: () => new byAnotherVariable().render()
}
