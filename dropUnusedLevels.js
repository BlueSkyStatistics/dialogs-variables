/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class dropUnusedLevels extends baseModal {
    static dialogId = 'dropUnusedLevels'
    static t = baseModal.makeT(dropUnusedLevels.dialogId)

    constructor() {
        var config = {
            id: dropUnusedLevels.dialogId,
            label: dropUnusedLevels.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
## [Reorder by Count]
require(forcats);
{{ if ( options.selected.grp10 =="Overwrite"  ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_drop( f={{dataset.name}}\${{selected.target[0] | safe}} {{if (options.selected.drop != "")}}, only=c({{selected.drop | safe}}){{/if}}){{/if}}
{{ if ( options.selected.grp10 =="Prefix"  ) }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_drop(f={{dataset.name}}\${{selected.target[0] | safe}}{{if (options.selected.drop != "")}},only=c({{selected.drop | safe}}){{/if}}){{/if}}
{{ if ( options.selected.grp10 =="Suffix" ) }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_drop(f={{dataset.name}}\${{selected.target[0] | safe}}{{if (options.selected.drop != "")}}, only=c({{selected.drop | safe}}){{/if}}){{/if}}
\nBSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: dropUnusedLevels.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
            target: {
                el: new dstVariableList(config, {
                    label: dropUnusedLevels.t('target'),
                    no: "target",
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            label3: { el: new labelVar(config, { label: dropUnusedLevels.t('label3'), h: 5, style: "mt-2" }) },
            dropUnused: { el: new radioButton(config, { label: dropUnusedLevels.t('dropUnused'), no: "method", increment: "dropUnused", value: "TRUE", state: "checked", extraction: "ValueAsIs", }) },
            levelsToDrop: { el: new radioButton(config, { label: dropUnusedLevels.t('levelsToDrop'), no: "method", required: true, dependant_objects: ["drop"], increment: "levelsToDrop", value: "FALSE", state: "", extraction: "ValueAsIs", }) },
            drop: {
                el: new input(config, {
                    no: 'drop',
                    label: dropUnusedLevels.t('drop'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    ml: 4,
                    allow_spaces:true,
                    type: "character",
                }),
            },
            label2: { el: new labelVar(config, { label: dropUnusedLevels.t('label2'),h: 5, style: "mt-2" }) },
            rd3: { el: new radioButton(config, { label: dropUnusedLevels.t('rd3'), no: "grp10", increment: "rd3", required: true, dependant_objects: ["txt3"], value: "Suffix", state: "checked", extraction: "ValueAsIs", }) },
            txt3: {
                el: new input(config, {
                    no: 'txt3',
                    label: dropUnusedLevels.t('txt3'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    ml: 4,
                    type: "character"
                }),
            },
            rd2: { el: new radioButton(config, { label: dropUnusedLevels.t('rd2'), no: "grp10", increment: "rd2", required: true, dependant_objects: ["txt4"], value: "Prefix", state: "", extraction: "ValueAsIs", }) },
            txt4: {
                el: new input(config, {
                    no: 'txt4',
                    label: dropUnusedLevels.t('txt4'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    ml: 4,
                    type: "character"
                }),
            },
            rd1: { el: new radioButton(config, { label: dropUnusedLevels.t('rd1'), no: "grp10", increment: "rd1", value: "Overwrite", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.label3.el.content, objects.dropUnused.el.content, objects.levelsToDrop.el.content, objects.drop.el.content, objects.label2.el.content, objects.rd3.el.content, objects.txt3.el.content, objects.rd2.el.content, objects.txt4.el.content, objects.rd1.el.content],
            nav: {
                name: dropUnusedLevels.t('navigation'),
                icon: "icon-trash",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: dropUnusedLevels.t('help.title'),
            r_help: dropUnusedLevels.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: dropUnusedLevels.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        var temp = "";
        var code_vars = "";
        instance.objects.target.el.getVal().forEach(function (value) {
            code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    target: instance.dialog.prepareSelected({ target: value }, instance.objects.target.r),
                    grp10: common.getCheckedRadio("dropUnusedLevels_grp10"),
                    drop: instance.objects.drop.el.getVal(),
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
    render: () => new dropUnusedLevels().render()
}
