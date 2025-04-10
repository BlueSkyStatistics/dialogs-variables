/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class labelNAasMissing extends baseModal {
    static dialogId = 'labelNAasMissing'
    static t = baseModal.makeT(labelNAasMissing.dialogId)

    constructor() {
        var config = {
            id: labelNAasMissing.dialogId,
            label: labelNAasMissing.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
## [Specify a label for NA values]
require(forcats);
{{ if ( options.selected.grp10 =="Overwrite"  ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_explicit_na( f={{dataset.name}}\${{selected.target[0] | safe}} {{if (options.selected.newLevels != "")}}, na_level=c("{{selected.newLevels | safe}}"){{/if}}){{/if}}
{{ if ( options.selected.grp10 =="Prefix"  ) }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_explicit_na(f={{dataset.name}}\${{selected.target[0] | safe}}{{if (options.selected.newLevels != "")}},na_level=c("{{selected.newLevels | safe}}"){{/if}}){{/if}}
{{ if ( options.selected.grp10 =="Suffix" ) }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_explicit_na(f={{dataset.name}}\${{selected.target[0] | safe}}{{if (options.selected.newLevels != "")}}, na_level=c("{{selected.newLevels | safe}}"){{/if}}){{/if}}
\nBSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: labelNAasMissing.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: labelNAasMissing.t('target'),
                    no: "target",
                    filter: "Numeric|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            newLevels: {
                el: new input(config, {
                    no: 'newLevels',
                    label: labelNAasMissing.t('newLevels'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    allow_spaces:true,
                    required: true,
                    type: "character",
                }),
            },
            label2: { el: new labelVar(config, { label: labelNAasMissing.t('label2'), h: 5, style: "mt-3" }) },
            rd3: { el: new radioButton(config, { label: labelNAasMissing.t('rd3'), no: "grp10", required: true, dependant_objects: ["txt3"], increment: "rd3", value: "Suffix", state: "checked", extraction: "ValueAsIs", }) },
            txt3: {
                el: new input(config, {
                    no: 'txt3',
                    label: labelNAasMissing.t('txt3'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd2: { el: new radioButton(config, { label: labelNAasMissing.t('rd2'), no: "grp10", required: true, dependant_objects: ["txt4"], increment: "rd2", value: "Prefix", state: "", extraction: "ValueAsIs", }) },
            txt4: {
                el: new input(config, {
                    no: 'txt4',
                    label: labelNAasMissing.t('txt4'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd1: { el: new radioButton(config, { label: labelNAasMissing.t('rd1'), no: "grp10", increment: "rd1", value: "Overwrite", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.newLevels.el.content, objects.label2.el.content, objects.rd3.el.content, objects.txt3.el.content, objects.rd2.el.content, objects.txt4.el.content, objects.rd1.el.content],
            nav: {
                name: labelNAasMissing.t('navigation'),
                icon: "icon-na",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: labelNAasMissing.t('help.title'),
            r_help: labelNAasMissing.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: labelNAasMissing.t('help.body')
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
                    grp10: common.getCheckedRadio("labelNAasMissing_grp10"),
                    newLevels: instance.objects.newLevels.el.getVal(),
                    txt3: instance.objects.txt3.el.getVal(),
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
        // res.push({ cmd: temp, cgid: newCommandGroup() })
        return res;
    }
}

module.exports = {
    render: () => new labelNAasMissing().render()
}
