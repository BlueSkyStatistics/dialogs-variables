/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */













class rankVariables extends baseModal {
    static dialogId = 'rankVariables'
    static t = baseModal.makeT(rankVariables.dialogId)

    constructor() {
        var config = {
            id: rankVariables.dialogId,
            label: rankVariables.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
{{dataset.name}} <- {{dataset.name}} {{if (options.selected.rankby !="")}} %>%\n\tgroup_by({{selected.rankby | safe}}){{/if}}{{selected.rankString | safe}}
\nBSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: rankVariables.t('label1'), h: 6 }) },
            suffix: { el: new radioButton(config, { label: rankVariables.t('suffix'), no: "rdgrp1", increment: "suffix", value: "Suffix", state: "checked", extraction: "ValueAsIs" }) },
            prefix: { el: new radioButton(config, { label: rankVariables.t('prefix'), no: "rdgrp1", increment: "prefix", value: "Prefix", state: "", extraction: "ValueAsIs", }) },
            txt1: {
                el: new input(config, {
                    no: 'txt1',
                    label: rankVariables.t('txt1'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                    ml: 4,
                    type: "character"
                }),
            },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            dest: {
                el: new dstVariableList(config, {
                    label: rankVariables.t('dest'),
                    no: "dest",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            rankby: {
                el: new dstVariableList(config, {
                    label: rankVariables.t('rankby'),
                    no: "rankby",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                }), r: ['{{ var | safe}}']
            },
            label2: { el: new labelVar(config, { label: rankVariables.t('label2'),style: "mt-3",h: 5 }) },
            rankfn: {
                el: new comboBox(config, {
                    no: 'rankfn',
                    label: rankVariables.t('rankfn'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    options: ["row_number", "min_rank", "dense_rank", "percent_rank", "cume_dist", "ntile",]
                })
            },
            nooftiles: {
                el: new inputSpinner(config, {
                    no: 'nooftiles',
                    label: rankVariables.t('nooftiles'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 5,
                    extraction: "NoPrefix|UseComma"
                }),
            },
        }
        const content = {
            head: [objects.label1.el.content, objects.suffix.el.content, objects.prefix.el.content, objects.txt1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.dest.el.content, objects.rankby.el.content,],
            bottom: [objects.label2.el.content, objects.rankfn.el.content, objects.nooftiles.el.content],
            nav: {
                name: rankVariables.t('navigation'),
                icon: "icon-rank",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: rankVariables.t('help.title'),
            r_help: rankVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: rankVariables.t('help.body')
        }
;
    }
    prepareExecution(instance) {
        var res = [];
        var rankString = "%>%\n\tmutate(";
        var rankfn = "";
        var txt1 = "";
        rankfn = instance.objects.rankfn.el.getVal()
        txt1 = instance.objects.txt1.el.getVal()
        let nooftiles = instance.objects.nooftiles.el.getVal()
        var prefixOrSuffix = common.getCheckedRadio("rankVariables_rdgrp1");
        instance.objects.dest.el.getVal().forEach(function (value) {
            var variable = "";
            variable = value;
            if (prefixOrSuffix == "Prefix") {
                if (rankfn == "ntile") {
                    rankString = rankString.concat(txt1, "_", variable, "=", rankfn, "(", variable, ",", nooftiles, "),")
                }
                else {
                    rankString = rankString.concat(txt1, "_", variable, "=", rankfn, "(", variable, "),")
                }
            }
            else {
                if (rankfn == "ntile") {
                    rankString = rankString.concat(variable, "_", txt1, "=", rankfn, "(", variable, ",", nooftiles, "),")
                }
                else {
                    rankString = rankString.concat(variable, "_", txt1, "=", rankfn, "(", variable, "),")
                }
            }
        })
        rankString = rankString.slice(0, -1);
        rankString = rankString.concat(")");
        var code_vars = {
            dataset: {
                name: getActiveDataset()
            },
            selected: {
                rankby: instance.objects.rankby.el.getVal(),
                rankString: rankString,
            }
        }
        res.push({ cmd: instance.dialog.renderR(code_vars), cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        return res;
    }
}

module.exports = {
    render: () => new rankVariables().render()
}
