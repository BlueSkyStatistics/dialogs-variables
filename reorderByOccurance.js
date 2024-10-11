









class reorderByOccurance extends baseModal {
    static dialogId = 'reorderByOccurance'
    static t = baseModal.makeT(reorderByOccurance.dialogId)

    constructor() {
        var config = {
            id: reorderByOccurance.dialogId,
            label: reorderByOccurance.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
## [Reorder by Occurrence]
require(forcats);
{{ if ( options.selected.grp10 =="Overwrite" && options.selected.specifyOrder =="Ascending" ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_rev(forcats::fct_inorder({{dataset.name}}\${{selected.target[0] | safe}}, ordered={{selected.ordered | safe}})){{/if}}
{{ if ( options.selected.grp10 =="Overwrite" && options.selected.specifyOrder =="Descending" ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_inorder({{dataset.name}}\${{selected.target[0] | safe}}, ordered={{selected.ordered | safe}}){{/if}}
{{ if ( options.selected.grp10 =="Prefix" && options.selected.specifyOrder =="Ascending" ) }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_rev(forcats::fct_inorder({{dataset.name}}\${{selected.target[0] | safe}},ordered={{selected.ordered | safe}})){{/if}}
{{ if ( options.selected.grp10 =="Prefix" && options.selected.specifyOrder =="Descending") }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_inorder({{dataset.name}}\${{selected.target[0] | safe}},ordered=TRUE){{/if}}
{{ if ( options.selected.grp10 =="Suffix" && options.selected.specifyOrder =="Ascending" ) }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_rev(forcats::fct_inorder({{dataset.name}}\${{selected.target[0] | safe}},ordered={{selected.ordered | safe}})){{/if}}
{{ if ( options.selected.grp10 =="Suffix" && options.selected.specifyOrder =="Descending") }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_inorder({{dataset.name}}\${{selected.target[0] | safe}},ordered={{selected.ordered | safe}}){{/if}}
\nBSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: reorderByOccurance.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
            target: {
                el: new dstVariableList(config, {
                    label: reorderByOccurance.t('target'),
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            label2: { el: new labelVar(config, { label: reorderByOccurance.t('label2'), style: "mt-3",h: 5 }) },
            rd3: { el: new radioButton(config, { label: reorderByOccurance.t('rd3'), no: "grp10", increment: "rd3", required: true, dependant_objects: ["txt3"], value: "Suffix", state: "checked", extraction: "ValueAsIs", }) },
            txt3: {
                el: new input(config, {
                    no: 'txt3',
                    label: reorderByOccurance.t('txt3'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd2: { el: new radioButton(config, { label: reorderByOccurance.t('rd2'), no: "grp10", increment: "rd2", required: true, dependant_objects: ["txt4"], value: "Prefix", state: "", extraction: "ValueAsIs", }) },
            txt4: {
                el: new input(config, {
                    no: 'txt4',
                    label: reorderByOccurance.t('txt4'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd1: { el: new radioButton(config, { label: reorderByOccurance.t('rd1'), no: "grp10", increment: "rd1", value: "Overwrite", state: "", extraction: "ValueAsIs" }) },
            label3: { el: new labelVar(config, { label: reorderByOccurance.t('label3'), style: "mt-3",h: 5}) },
            Descending: { el: new radioButton(config, { label: reorderByOccurance.t('Descending'), no: "specifyOrder", increment: "Descending", value: "Descending", state: "checked", extraction: "ValueAsIs", }) },
            Ascending: { el: new radioButton(config, { label: reorderByOccurance.t('Ascending'), no: "specifyOrder", increment: "Ascending", value: "Ascending", state: "", extraction: "ValueAsIs", }) },
            ordered: { el: new checkbox(config, { label: reorderByOccurance.t('ordered'), style: "mt-4",no: "ordered", extraction: "Boolean" }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.label3.el.content, objects.Descending.el.content, objects.Ascending.el.content, objects.ordered.el.content, objects.label2.el.content, objects.rd3.el.content, objects.txt3.el.content, objects.rd2.el.content, objects.txt4.el.content, objects.rd1.el.content],
            nav: {
                name: reorderByOccurance.t('navigation'),
                icon: "icon-rank",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: reorderByOccurance.t('help.title'),
            r_help: "help(data,package='utils')",
            body: reorderByOccurance.t('help.body')
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
                    grp10: common.getCheckedRadio("reorderByOccurance_grp10"),
                    specifyOrder: common.getCheckedRadio("reorderByOccurance_specifyOrder"),
                    txt3: instance.objects.txt3.el.getVal(),
                    txt4: instance.objects.txt4.el.getVal(),
                    ordered: instance.objects.ordered.el.getVal() == true ? "TRUE" : "NA",
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
    render: () => new reorderByOccurance().render()
}
