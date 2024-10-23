









class reorderByCount extends baseModal {
    static dialogId = 'reorderByCount'
    static t = baseModal.makeT(reorderByCount.dialogId)

    constructor() {
        var config = {
            id: reorderByCount.dialogId,
            label: reorderByCount.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
## [Reorder by Count]
require(forcats);
{{ if ( options.selected.grp10 =="Overwrite" && options.selected.specifyOrder =="Ascending" ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_rev(forcats::fct_infreq({{dataset.name}}\${{selected.target[0] | safe}},ordered={{selected.ordered | safe}})){{/if}}
{{ if ( options.selected.grp10 =="Overwrite" && options.selected.specifyOrder =="Descending" ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_infreq({{dataset.name}}\${{selected.target[0] | safe}},ordered={{selected.ordered | safe}}){{/if}}
{{ if ( options.selected.grp10 =="Prefix" && options.selected.specifyOrder =="Ascending" ) }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_rev(forcats::fct_infreq({{dataset.name}}\${{selected.target[0] | safe}},ordered={{selected.ordered | safe}})){{/if}}
{{ if ( options.selected.grp10 =="Prefix" && options.selected.specifyOrder =="Descending") }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_infreq({{dataset.name}}\${{selected.target[0] | safe}},ordered=TRUE){{/if}}
{{ if ( options.selected.grp10 =="Suffix" && options.selected.specifyOrder =="Ascending" ) }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_rev(forcats::fct_infreq({{dataset.name}}\${{selected.target[0] | safe}},ordered={{selected.ordered | safe}})){{/if}}
{{ if ( options.selected.grp10 =="Suffix" && options.selected.specifyOrder =="Descending") }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_infreq({{dataset.name}}\${{selected.target[0] | safe}},ordered={{selected.ordered | safe}}){{/if}}
\nBSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: reorderByCount.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
            target: {
                el: new dstVariableList(config, {
                    label: reorderByCount.t('target'),
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            label2: { el: new labelVar(config, { label: reorderByCount.t('label2'), style: "mt-3",h: 5 }) },
            rd3: { el: new radioButton(config, { label: reorderByCount.t('rd3'), no: "grp10", increment: "rd3", required: true, dependant_objects: ["txt3"], value: "Suffix", state: "checked", extraction: "ValueAsIs", }) },
            txt3: {
                el: new input(config, {
                    no: 'txt3',
                    label: reorderByCount.t('txt3'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd2: { el: new radioButton(config, { label: reorderByCount.t('rd2'), no: "grp10", increment: "rd2", required: true, value: "Prefix", dependant_objects: ["txt4"], state: "", extraction: "ValueAsIs", }) },
            txt4: {
                el: new input(config, {
                    no: 'txt4',
                    label: reorderByCount.t('txt4'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd1: { el: new radioButton(config, { label: reorderByCount.t('rd1'), no: "grp10", increment: "rd1", value: "Overwrite", state: "", extraction: "ValueAsIs" }) },
            label3: { el: new labelVar(config, { label: reorderByCount.t('label3'),style: "mt-3",h: 5 }) },
            Descending: { el: new radioButton(config, { label: reorderByCount.t('Descending'), no: "specifyOrder", increment: "Descending", value: "Descending", state: "checked", extraction: "ValueAsIs", }) },
            Ascending: { el: new radioButton(config, { label: reorderByCount.t('Ascending'), no: "specifyOrder", increment: "Ascending", value: "Ascending", state: "", extraction: "ValueAsIs", }) },
            ordered: {
                el: new checkbox(config, {
                    label: reorderByCount.t('ordered'), no: "ordered",
                    extraction: "BooleanValue",
                    bs_type: "valuebox",
                    true_value: "TRUE",
                    false_value: "NA",
                    style: "mt-4",
                    extraction: "Boolean"
                })
            },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.label3.el.content, objects.Descending.el.content, objects.Ascending.el.content, objects.ordered.el.content, objects.label2.el.content, objects.rd3.el.content, objects.txt3.el.content, objects.rd2.el.content, objects.txt4.el.content, objects.rd1.el.content],
            nav: {
                name: reorderByCount.t('navigation'),
                icon: "icon-reorder_by_count",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: reorderByCount.t('help.title'),
            r_help: "help(data,package='utils')",
            body: reorderByCount.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        let count = 0;
        var temp = "";
        var code_vars = "";
        instance.objects.target.el.getVal().forEach(function (value) {
            code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    target: instance.dialog.prepareSelected({ target: value }, instance.objects.target.r),
                    grp10: common.getCheckedRadio("reorderByCount_grp10"),
                    specifyOrder: common.getCheckedRadio("reorderByCount_specifyOrder"),
                    txt3: instance.objects.txt3.el.getVal(),
                    ordered: instance.objects.ordered.el.getVal() == true ? "TRUE" : "NA",
                    txt4: instance.objects.txt4.el.getVal(),
                }
            }
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            // temp = temp + cmd + "\n";
            if (count == 0) {
                res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
            }
            else {
                res.push({ cmd: cmd, cgid: newCommandGroup(), oriR: instance.config.RCode, code_vars: code_vars })
            }
            count++  
        })
        // res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        return res;
    }
}

module.exports = {
    render: () => new reorderByCount().render()
}
