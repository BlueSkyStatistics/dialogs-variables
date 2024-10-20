









class addNewLevels extends baseModal {
    static dialogId = 'addNewLevels'
    static t = baseModal.makeT(addNewLevels.dialogId)

    constructor() {
        var config = {
            id: addNewLevels.dialogId,
            label: addNewLevels.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(forcats);
{{ if ( options.selected.grp10 =="Overwrite"  ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_expand({{dataset.name}}\${{selected.target[0] | safe}},{{selected.newLevels | safe}}){{/if}}
{{ if ( options.selected.grp10 =="Prefix"  ) }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_expand({{dataset.name}}\${{selected.target[0] | safe}},{{selected.newLevels | safe}}){{/if}}
{{ if ( options.selected.grp10 =="Suffix" ) }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_expand({{dataset.name}}\${{selected.target[0] | safe}},{{selected.newLevels | safe}}){{/if}}
\nBSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: addNewLevels.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: addNewLevels.t('target'),
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            newLevels: {
                el: new input(config, {
                    no: 'newLevels',
                    label: addNewLevels.t('newLevels'),
                    placeholder: "",
                    extraction: "CreateArray",
                    value: "",
                    allow_spaces:true,
                    ml: 4,
                    required: true,
                    type: "character",
                }),
            },
            label2: { el: new labelVar(config, { label: addNewLevels.t('label2'), h: 6, style: "mt-3" }) },
            rd3: { el: new radioButton(config, { label: addNewLevels.t('rd3'), required: true, no: "grp10", dependant_objects: ["txt3"], increment: "rd3", value: "Suffix", state: "checked", extraction: "ValueAsIs", dependant_objects: ["txt3"] }) },
            txt3: {
                el: new input(config, {
                    no: 'txt3',
                    label: addNewLevels.t('txt3'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd2: { el: new radioButton(config, { label: addNewLevels.t('rd2'), required: true, no: "grp10", increment: "rd2", dependant_objects: ["txt4"], value: "Prefix", state: "", extraction: "ValueAsIs", dependant_objects: ["txt4"] }) },
            txt4: {
                el: new input(config, {
                    no: 'txt4',
                    label: addNewLevels.t('txt4'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd1: { el: new radioButton(config, { label: addNewLevels.t('rd1'), no: "grp10", required: true, increment: "rd1", value: "Overwrite", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.newLevels.el.content, objects.label2.el.content, objects.rd3.el.content, objects.txt3.el.content, objects.rd2.el.content, objects.txt4.el.content, objects.rd1.el.content],
            nav: {
                name: addNewLevels.t('navigation'),
                icon: "icon-plus_sign",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: addNewLevels.t('help.title'),
            r_help: "help(data,package='utils')",
            body: addNewLevels.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        var temp = "";
        var code_vars = ""
        instance.objects.target.el.getVal().forEach(function (value) {
            code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    target: instance.dialog.prepareSelected({ target: value }, instance.objects.target.r),
                    grp10: common.getCheckedRadio("addNewLevels_grp10"),
                    newLevels: instance.objects.newLevels.el.getVal(),
                    txt3: instance.objects.txt3.el.getVal(),
                    txt4: instance.objects.txt4.el.getVal(),
                }
            }
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd + "\n";
        })
res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        return res;
    }
}

module.exports = {
    render: () => new addNewLevels().render()
}
