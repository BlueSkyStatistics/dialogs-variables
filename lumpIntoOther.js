/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */













class lumpIntoOther extends baseModal {
    static dialogId = 'lumpIntoOther'
    static t = baseModal.makeT(lumpIntoOther.dialogId)

    constructor() {
        var config = {
            id: lumpIntoOther.dialogId,
            label: lumpIntoOther.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
## [Lump into Other]
require(forcats);
{{ if ( options.selected.grp10 =="Overwrite"  ) }}
{{dataset.name}}\${{selected.target[0] | safe}} <- forcats::fct_lump( f={{dataset.name}}\${{selected.target[0] | safe}}{{if (options.selected.method =="specifyNoCategories")}},n = {{selected.category | safe}}{{/if}}{{if (options.selected.method =="specifyProportion")}},p = {{selected.proportion | safe}}{{/if}}{{selected.varweights | safe}},other_level="{{selected.other | safe}}",ties.method ="{{selected.ties | safe}}"){{/if}}
{{ if ( options.selected.grp10 =="Prefix"  ) }}
{{dataset.name}}\${{selected.txt4 | safe}}_{{selected.target[0] | safe}} <- forcats::fct_lump( f={{dataset.name}}\${{selected.target[0] | safe}}{{if (options.selected.method =="specifyNoCategories")}},n = {{selected.category | safe}}{{/if}}{{if (options.selected.method =="specifyProportion")}},p = {{selected.proportion | safe}}{{/if}}{{selected.varweights | safe}},other_level="{{selected.other | safe}}",ties.method ="{{selected.ties | safe}}"){{/if}}
{{ if ( options.selected.grp10 =="Suffix" ) }}
{{dataset.name}}\${{selected.target[0] | safe}}_{{selected.txt3 | safe}} <- forcats::fct_lump( f={{dataset.name}}\${{selected.target[0] | safe}}{{if (options.selected.method =="specifyNoCategories")}},n = {{selected.category | safe}}{{/if}}{{if (options.selected.method =="specifyProportion")}},p = {{selected.proportion | safe}}{{/if}}{{selected.varweights | safe}},other_level="{{selected.other | safe}}",ties.method ="{{selected.ties | safe}}"){{/if}}
\nBSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: lumpIntoOther.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
            target: {
                el: new dstVariableList(config, {
                    label: lumpIntoOther.t('target'),
                    no: "target",
                    filter: "Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ target | safe}}']
            },
            other: {
                el: new input(config, {
                    no: 'other',
                    label: lumpIntoOther.t('other'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "other",
                    required: true,
                    allow_spaces:true,
                    type: "character",
                }),
            },
            label3: { el: new labelVar(config, { label: lumpIntoOther.t('label3'), style: "mt-3",h: 5 }) },
            defaultOption: { el: new radioButton(config, { label: lumpIntoOther.t('defaultOption'), no: "method", increment: "defaultOption", value: "defaultOption", state: "checked", extraction: "ValueAsIs" }) },
            categories: { el: new radioButton(config, { label: lumpIntoOther.t('categories'), no: "method", increment: "categories", value: "specifyNoCategories", state: "", extraction: "ValueAsIs", dependant_objects: ["category"] }) },
            category: {
                el: new inputSpinner(config, {
                    no: "category",
                    label: lumpIntoOther.t('category'),
                    ml: 4,
                    min: -10000000,
                    max: 10000000,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
            proportion1: { el: new radioButton(config, { label: lumpIntoOther.t('proportion1'), no: "method", increment: "proportion1", value: "specifyProportion", state: "", extraction: "ValueAsIs", dependant_objects: ["proportion"] }) },
            proportion: {
                el: new inputSpinner(config, {
                    no: "proportion",
                    label: lumpIntoOther.t('proportion'),
                    ml: 4,
                    min: -1,
                    max: 1,
                    step: 0.1,
                    value: 0.1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            varweights: {
                el: new dstVariable(config, {
                    label: lumpIntoOther.t('varweights'),
                    no: "varweights",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    //required:true,
                }), r: [', w={{varweights|safe}}']
            },
            ties: {
                el: new comboBox(config, {
                    no: 'ties',
                    label: lumpIntoOther.t('ties'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["first", "min", "average", "last", "random", "max"],
                    default: "min"
                })
            },
            label2: { el: new labelVar(config, { label: lumpIntoOther.t('label2'), style: "mt-3",h: 5 }) },
            rd3: { el: new radioButton(config, { label: lumpIntoOther.t('rd3'), no: "grp10", required: true, dependant_objects: ["txt3"], increment: "rd3", value: "Suffix", state: "checked", extraction: "ValueAsIs", }) },
            txt3: {
                el: new input(config, {
                    no: 'txt3',
                    label: lumpIntoOther.t('txt3'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd2: { el: new radioButton(config, { label: lumpIntoOther.t('rd2'), no: "grp10", required: true, dependant_objects: ["txt4"], increment: "rd2", value: "Prefix", state: "", extraction: "ValueAsIs", }) },
            txt4: {
                el: new input(config, {
                    no: 'txt4',
                    label: lumpIntoOther.t('txt4'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            rd1: { el: new radioButton(config, { label: lumpIntoOther.t('rd1'), no: "grp10", increment: "rd1", value: "Overwrite", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.other.el.content, objects.label3.el.content, objects.defaultOption.el.content, objects.categories.el.content, objects.category.el.content, objects.proportion1.el.content, objects.proportion.el.content, objects.varweights.el.content, objects.ties.el.content, objects.label2.el.content, objects.rd3.el.content, objects.txt3.el.content, objects.rd2.el.content, objects.txt4.el.content, objects.rd1.el.content],
            nav: {
                name: lumpIntoOther.t('navigation'),
                icon: "icon-combine",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: lumpIntoOther.t('help.title'),
            r_help: lumpIntoOther.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: lumpIntoOther.t('help.body')
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
                    varweights: instance.dialog.prepareSelected({ varweights: instance.objects.varweights.el.getVal()[0] }, instance.objects.varweights.r),
                    grp10: common.getCheckedRadio("lumpIntoOther_grp10"),
                    method: common.getCheckedRadio("lumpIntoOther_method"),
                    category: instance.objects.category.el.getVal(),
                    proportion: instance.objects.proportion.el.getVal(),
                    other: instance.objects.other.el.getVal(),
                    ties: instance.objects.ties.el.getVal(),
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
    render: () => new lumpIntoOther().render()
}
