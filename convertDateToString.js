











class convertDateToString extends baseModal {
    static dialogId = 'convertDateToString'
    static t = baseModal.makeT(convertDateToString.dialogId)

    constructor() {
        var config = {
            id: convertDateToString.dialogId,
            label: convertDateToString.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
BSkystrftime (varNames = c({{selected.Destination | safe}}), dateFormat = "{{selected.DateFormat | safe}}", timezone = "{{selected.TimeZone | safe}}", prefixOrSuffix = "{{selected.rdgrp1 | safe}}",  prefixOrSuffixValue = "{{selected.prefixOrSuffix | safe}}", data = "{{dataset.name}}") 
BSkyLoadRefresh(bskyDatasetName="{{dataset.name}}",load.dataframe=TRUE)         
`,
            pre_start_r: JSON.stringify({
                TimeZone: "OlsonNames()",
            })
        }
        var objects = {
            label1: { el: new labelVar(config, { label: convertDateToString.t('label1'), h: 5 }) },
            suffix: { el: new radioButton(config, { label: convertDateToString.t('suffix'), no: "rdgrp1", increment: "suffix", value: "suffix", state: "checked", extraction: "ValueAsIs" }) },
            prefix: { el: new radioButton(config, { label: convertDateToString.t('prefix'), no: "rdgrp1", increment: "prefix", value: "prefix", state: "", extraction: "ValueAsIs", }) },
            prefixOrSuffix: {
                el: new input(config, {
                    no: 'prefixOrSuffix',
                    label: convertDateToString.t('prefixOrSuffix'),
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
                    label: convertDateToString.t('Destination'),
                    no: "Destination",
                    filter: "Numeric|Date",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            DateFormat: {
                el: new comboBox(config, {
                    no: 'DateFormat',
                    label: convertDateToString.t('DateFormat'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    options: ["%m-%d-%y", "%m-%d-%y %H:%M:%S", "%m-%d-%y %I:%M:%S %p", "%b %d, %y", "%b %d, %y %H:%M:%S", "%m-%d-%Y", "%m-%d-%Y  %H:%M:%S", "%m-%d-%Y %I:%M:%S %p", "%b %d, %Y", "%b %d, %Y %H:%M:%S", "%m/%d/%y", "%m/%d/%y %H:%M:%S", "%m/%d/%y %I:%M:%S %p", "%b %d, %y", "%b %d, %y %H:%M:%S", "%m/%d/%Y", "%m/%d/%Y %H:%M:%S", "%m/%d/%Y %I:%M:%S %p", "%b %d, %Y", "%b %d, %Y %H:%M:%S", "%d-%m-%y", "%d-%m-%y %H:%M:%S", "%d-%m-%y %I:%M:%S %p",
                        "%d %b, %y", "%d %b, %y %H:%M:%S", "%d-%m-%Y", "%d-%m-%Y %H:%M:%S", "%d-%m-%Y %I:%M:%S %p", "%d %b, %Y", "%d %b, %Y  %H:%M:%S", "%d/%m/%y", "%d/%m/%y %H:%M:%S", "%d/%m/%y %I:%M:%S %p", "%d %b, %y", "%d %b, %y %H:%M:%S", "%d/%m/%Y", "%d/%m/%Y %H:%M:%S", "%d/%m/%Y %I:%M:%S %p", "%d %b, %Y", "%d %b, %Y  %H:%M:%S", "%Y-%m-%d  %H:%M:%S", "%Y-%m-%d", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d %I:%M:%S", "%Y-%d-%m", "%Y-%d-%m %H:%M:%S", "%Y-%d-%m %I:%M:%S", "%y-%m-%d", "%y-%m-%d %H:%M:%S", "%y-%m-%d %I:%M:%S",
                        "%y-%d-%m", "%y-%d-%m %H:%M:%S", "%y-%d-%m %I:%M:%S", "%Y %m %d  %H:%M:%S", "%Y %m %d", "%Y %m %d %H:%M:%S", "%Y %m %d %I:%M:%S", "%Y %d %m", "%Y %d %m %H:%M:%S", "%Y %d %m %I:%M:%S", "%y %m %d", "%y %m %d %H:%M:%S", "%y %m %d %I:%M:%S", "%y %d %m", "%y %d %m %H:%M:%S", "%y %d %m %I:%M:%S", "%Y %m %d  %H:%M:%S", "%Y %m %d", "%Y %m %d %H:%M:%S", "%Y %m %d %I:%M:%S", "%Y %d %m", "%Y %d %m %H:%M:%S", "%Y %d %m %I:%M:%S", "%y %m %d", "%y %m %d %H:%M:%S", "%y %m %d %I:%M:%S", "%y %d %m", "%y %d %m %H:%M:%S", "%y %d %m %I:%M:%S"]
                })
            },
            TimeZone: {
                el: new comboBox(config, {
                    no: 'TimeZone',
                    label: convertDateToString.t('TimeZone'),
                    multiple: true,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
        }
        var timeZoneOptions = {
            el: new optionsVar(config, {
                no: "timeZoneOptions",
                name: convertDateToString.t('advanced_lbl'),
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
                name: convertDateToString.t('navigation'),
                icon: "icon-abc",
                onclick: `r_before_modal("${config.id}")`,
                
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: convertDateToString.t('help.title'),
            r_help: convertDateToString.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: convertDateToString.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new convertDateToString().render()
}
