/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */













class convertStringToDateTime extends baseModal {
    static dialogId = 'convertStringToDateTime'
    static t = baseModal.makeT(convertStringToDateTime.dialogId)

    constructor() {
        var config = {
            id: convertStringToDateTime.dialogId,
            label: convertStringToDateTime.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
BSkystrptime (varNames = c( {{selected.Destination | safe}}), dateFormat = "{{selected.DateFormat | safe}}", timezone = "{{selected.TimeZone | safe}}", prefixOrSuffix = "{{selected.rdgrp1 | safe}}",  prefixOrSuffixValue = "{{selected.prefixOrSuffix | safe}}", data = "{{dataset.name}}") 
BSkyLoadRefresh(bskyDatasetName="{{dataset.name}}",load.dataframe=TRUE)        
`,
            pre_start_r: JSON.stringify({
                TimeZone: "OlsonNames()",
            })
        }
        var objects = {
            label1: { el: new labelVar(config, { label: convertStringToDateTime.t('label1'), h: 5 }) },
            suffix: { el: new radioButton(config, { label: convertStringToDateTime.t('suffix'), no: "rdgrp1", increment: "suffix", value: "suffix", state: "checked", extraction: "ValueAsIs" }) },
            prefix: { el: new radioButton(config, { label: convertStringToDateTime.t('prefix'), no: "rdgrp1", increment: "prefix", value: "prefix", state: "", extraction: "ValueAsIs", }) },
            prefixOrSuffix: {
                el: new input(config, {
                    no: 'prefixOrSuffix',
                    label: convertStringToDateTime.t('prefixOrSuffix'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                    ml: 4,
                    type: "character"
                }),
            },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            Destination: {
                el: new dstVariableList(config, {
                    label: convertStringToDateTime.t('Destination'),
                    no: "Destination",
                    filter: "String|Numeric|Date|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            DateFormat: {
                el: new comboBox(config, {
                    no: 'DateFormat',
                    label: convertStringToDateTime.t('DateFormat'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    // options:[],
                    options: ["%m-%d-%y", "%m-%d-%y %H:%M:%S", "%m-%d-%y %I:%M:%S %p", "%b %d, %y", "%b %d, %y %H:%M:%S", "%m-%d-%Y", "%m-%d-%Y  %H:%M:%S", "%m-%d-%Y %I:%M:%S %p", "%b %d, %Y", "%b %d, %Y %H:%M:%S", "%m/%d/%y", "%m/%d/%y %H:%M:%S", "%m/%d/%y %I:%M:%S %p", "%b %d, %y", "%b %d, %y %H:%M:%S", "%m/%d/%Y", "%m/%d/%Y %H:%M:%S", "%m/%d/%Y %I:%M:%S %p", "%b %d, %Y", "%b %d, %Y %H:%M:%S", "%d-%m-%y", "%d-%m-%y %H:%M:%S", "%d-%m-%y %I:%M:%S %p",
                        "%d %b, %y", "%d %b, %y %H:%M:%S", "%d-%m-%Y", "%d-%m-%Y %H:%M:%S", "%d-%m-%Y %I:%M:%S %p", "%d %b, %Y", "%d %b, %Y  %H:%M:%S", "%d/%m/%y", "%d/%m/%y %H:%M:%S", "%d/%m/%y %I:%M:%S %p", "%d %b, %y", "%d %b, %y %H:%M:%S", "%d/%m/%Y", "%d/%m/%Y %H:%M:%S", "%d/%m/%Y %I:%M:%S %p", "%d %b, %Y", "%d %b, %Y  %H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d", "%Y-%m-%d %I:%M:%S", "%Y-%d-%m", "%Y-%d-%m %H:%M:%S", "%Y-%d-%m %I:%M:%S", "%y-%m-%d", "%y-%m-%d %H:%M:%S", "%y-%m-%d %I:%M:%S",
                        "%y-%d-%m", "%y-%d-%m %H:%M:%S", "%y-%d-%m %I:%M:%S", "%Y %m %d  %H:%M:%S", "%Y %m %d", "%Y %m %d %H:%M:%S", "%Y %m %d %I:%M:%S", "%Y %d %m", "%Y %d %m %H:%M:%S", "%Y %d %m %I:%M:%S", "%y %m %d", "%y %m %d %H:%M:%S", "%y %m %d %I:%M:%S", "%y %d %m", "%y %d %m %H:%M:%S", "%y %d %m %I:%M:%S", "%Y %m %d  %H:%M:%S", "%Y %m %d", "%Y %m %d %H:%M:%S", "%Y %m %d %I:%M:%S", "%Y %d %m", "%Y %d %m %H:%M:%S", "%Y %d %m %I:%M:%S", "%y %m %d", "%y %m %d %H:%M:%S", "%y %m %d %I:%M:%S", "%y %d %m", "%y %d %m %H:%M:%S", "%y %d %m %I:%M:%S"]
                })
            },
            TimeZone: {
                el: new comboBox(config, {
                    no: 'TimeZone',
                    label: convertStringToDateTime.t('TimeZone'),
                    multiple: true,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
            //  suffix: { el: new radioButton(config, {label: convertStringToDateTime.t('suffix'), no: "rdgrp1", increment: "suffix", value: "Suffix", state: "checked", extraction: "ValueAsIs",dependant_objects: ["nooftiles"] })},
        }
        var timeZoneOptions = {
            el: new optionsVar(config, {
                no: "timeZoneOptions",
                name: convertStringToDateTime.t('advanced_lbl'),
                content: [
                    objects.TimeZone.el,
                ]
            }
            )
        }
        const content = {
            head: [objects.label1.el.content, objects.suffix.el.content, objects.prefix.el.content, objects.prefixOrSuffix.el.content],
            left: [objects.content_var.el.content],
            right: [objects.Destination.el.content, objects.DateFormat.el.content,],
            bottom: [timeZoneOptions.el.content],
            nav: {
                name: convertStringToDateTime.t('navigation'),
                icon: "icon-calendar-1",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: convertStringToDateTime.t('help.title'),
            r_help: convertStringToDateTime.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: convertStringToDateTime.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new convertStringToDateTime().render()
}
