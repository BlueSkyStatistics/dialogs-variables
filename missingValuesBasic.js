/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */













class missingValuesBasic extends baseModal {
    static dialogId = 'missingValuesBasic'
    static t = baseModal.makeT(missingValuesBasic.dialogId)

    constructor() {
        var config = {
            id: missingValuesBasic.dialogId,
            label: missingValuesBasic.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
local({
    varNames =c({{selected.target | safe}})
    operation = c('{{selected.grp | safe}}')
    if (operation =="applyOperation")
    {
    #Replaces the nas in each variable by the mean, median, min or max
    for(var in varNames)
    {
    {{dataset.name}}[is.na({{dataset.name}}[, var]), var]<<-{{selected.selectctrl | safe}}({{dataset.name}}[,var],na.rm=TRUE)
    }
    }
    #Replaces nas by specified value
    if (operation == "replaceValue")
    {
    {{dataset.name}}[,varNames]  [is.na({{dataset.name}}[,varNames])] <<-c( {{selected.valueEntered | safe}})
    }
})
#Refreshes the datast in the data grid
BSkyLoadRefresh("{{dataset.name}}")
            `
        }
        var objects = {
            label1: { el: new labelVar(config, { label: missingValuesBasic.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: missingValuesBasic.t('target'),
                    no: "target",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label2: { el: new labelVar(config, { label: missingValuesBasic.t('label2'), style: "mt-3",h: 5 }) },
            rd1: { el: new radioButton(config, { label: missingValuesBasic.t('rd1'), no: "grp", increment: "rd1", required: true, value: "applyOperation", state: "checked", extraction: "ValueAsIs", dependant_objects: ["selectctrl"] }) },
            selectctrl: {
                el: new comboBox(config, {
                    no: 'selectctrl',
                    label: missingValuesBasic.t('selectctrl'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    default: "mean",
                    options: ["mean", "median", "min", "max", "getmode"]
                })
            },
            rd2: { el: new radioButton(config, { label: missingValuesBasic.t('rd2'), no: "grp", increment: "rd2", value: "replaceValue", required: true, state: "", extraction: "ValueAsIs", dependant_objects: ["valueEntered"] }) },
            valueEntered: {
                el: new inputSpinner(config, {
                    no: 'valueEntered',
                    label: missingValuesBasic.t('valueEntered'),
                    min: -9999999,
                    max: 9999999,
                    step: 1,
                    value: 0,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.label2.el.content, objects.rd1.el.content, objects.selectctrl.el.content, objects.rd2.el.content, objects.valueEntered.el.content],
            nav: {
                name: missingValuesBasic.t('navigation'),
                icon: "icon-123",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: missingValuesBasic.t('help.title'),
            r_help: missingValuesBasic.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: missingValuesBasic.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new missingValuesBasic().render()
}
