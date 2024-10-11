









class specifyLevelsToKeepOrReplace extends baseModal {
    static dialogId = 'specifyLevelsToKeepOrReplace'
    static t = baseModal.makeT(specifyLevelsToKeepOrReplace.dialogId)

    constructor() {
        var config = {
            id: specifyLevelsToKeepOrReplace.dialogId,
            label: specifyLevelsToKeepOrReplace.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
## [Specify levels to keep or replace]
require(forcats);
{{ if ( options.selected.grp10 =="Overwrite" && options.selected.method =="keepOption" ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_other(f={{dataset.name}}\${{selected.target[0] | safe}}, keep=c({{selected.keep | safe}}), other_level="{{selected.other | safe}}"){{/if}}
{{ if ( options.selected.grp10 =="Overwrite" && options.selected.method =="dropOption" ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_other(f={{dataset.name}}\${{selected.target[0] | safe}}, drop=c({{selected.drop | safe}}), other_level="{{selected.other | safe}}"){{/if}}
{{ if ( options.selected.grp10 =="Prefix" && options.selected.method =="keepOption"  ) }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_other(f={{dataset.name}}\${{selected.target[0] | safe}}, keep=c({{selected.keep | safe}}), other_level="{{selected.other | safe}}"){{/if}}
{{ if ( options.selected.grp10 =="Prefix" && options.selected.method =="dropOption") }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_other(f={{dataset.name}}\${{selected.target[0] | safe}}, drop=c({{selected.drop | safe}}), other_level="{{selected.other | safe}}"){{/if}}
{{ if ( options.selected.grp10 =="Suffix" && options.selected.method =="keepOption"  ) }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_other(f={{dataset.name}}\${{selected.target[0] | safe}}, keep=c({{selected.keep | safe}}), other_level="{{selected.other | safe}}"){{/if}}
{{ if ( options.selected.grp10 =="Suffix" && options.selected.method =="dropOption") }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_other(f={{dataset.name}}\${{selected.target[0] | safe}}, drop=c({{selected.drop | safe}}), other_level="{{selected.other | safe}}"){{/if}}
\nBSkyLoadRefresh("{{dataset.name}}")
            `
        }
        var objects = {
            label1: { el: new labelVar(config, { label: specifyLevelsToKeepOrReplace.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
            target: {
                el: new dstVariableList(config, {
                    label: specifyLevelsToKeepOrReplace.t('target'),
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            other: {
                el: new input(config, {
                    no: 'other',
                    label: specifyLevelsToKeepOrReplace.t('other'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                    type: "character",
                }),
            },
            label3: { el: new labelVar(config, { label: specifyLevelsToKeepOrReplace.t('label3'),style: "mt-3",h: 5 }) },
            keepOption: { el: new radioButton(config, { label: specifyLevelsToKeepOrReplace.t('keepOption'), no: "method", required: true, increment: "keepOption", value: "keepOption", state: "checked", extraction: "ValueAsIs", dependant_objects: ["keep"] }) },
            keep: {
                el: new input(config, {
                    no: 'keep',
                    label: specifyLevelsToKeepOrReplace.t('keep'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character",
                }),
            },
            dropOption: { el: new radioButton(config, { label: specifyLevelsToKeepOrReplace.t('dropOption'), no: "method", required: true, increment: "dropOption", value: "dropOption", state: "", extraction: "ValueAsIs", dependant_objects: ["drop"] }) },
            drop: {
                el: new input(config, {
                    no: 'drop',
                    label: specifyLevelsToKeepOrReplace.t('drop'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: "",
                    ml: 4,
                    type: "character",
                }),
            },
            label2: { el: new labelVar(config, { label: specifyLevelsToKeepOrReplace.t('label2'),style: "mt-3",h: 5}) },
            rd3: { el: new radioButton(config, { label: specifyLevelsToKeepOrReplace.t('rd3'), no: "grp10", required: true, dependant_objects: ["txt3"], increment: "rd3", value: "Suffix", state: "checked", extraction: "ValueAsIs", }) },
            txt3: {
                el: new input(config, {
                    no: 'txt3',
                    label: specifyLevelsToKeepOrReplace.t('txt3'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd2: { el: new radioButton(config, { label: specifyLevelsToKeepOrReplace.t('rd2'), no: "grp10", required: true, dependant_objects: ["txt4"], increment: "rd2", value: "Prefix", state: "", extraction: "ValueAsIs", }) },
            txt4: {
                el: new input(config, {
                    no: 'txt4',
                    label: specifyLevelsToKeepOrReplace.t('txt4'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd1: { el: new radioButton(config, { label: specifyLevelsToKeepOrReplace.t('rd1'), no: "grp10", increment: "rd1", value: "Overwrite", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.other.el.content, objects.label3.el.content, objects.keepOption.el.content, objects.keep.el.content, objects.dropOption.el.content, objects.drop.el.content, objects.label2.el.content, objects.rd3.el.content, objects.txt3.el.content, objects.rd2.el.content, objects.txt4.el.content, objects.rd1.el.content],
            nav: {
                name: specifyLevelsToKeepOrReplace.t('navigation'),
                icon: "icon-hand_pointing",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: specifyLevelsToKeepOrReplace.t('help.title'),
            r_help: "help(data,package='utils')",
            body: specifyLevelsToKeepOrReplace.t('help.body')
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
                    grp10: common.getCheckedRadio("specifyLevelsToKeepOrReplace_grp10"),
                    method: common.getCheckedRadio("specifyLevelsToKeepOrReplace_method"),
                    keep: instance.objects.keep.el.getVal(),
                    drop: instance.objects.drop.el.getVal(),
                    other: instance.objects.other.el.getVal(),
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
    render: () => new specifyLevelsToKeepOrReplace().render()
}
