/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class recodeVariables extends baseModal {
    static dialogId = 'recodeVariables'
    static t = baseModal.makeT(recodeVariables.dialogId)

    constructor() {
        var config = {
            id: recodeVariables.dialogId,
            label: recodeVariables.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(car)
#Perform the recode
BSkyRecode(colNames=c({{selected.oldvars | safe}}),{{if (options.selected.newvar !== "")}} newColNames={{selected.newvar | safe}},{{/if}} OldNewVals='{{selected.oldnewvals | safe}}',{{if (options.selected.g1 == "prefix" || options.selected.g1 == "suffix")}} prefixOrSuffix =c('{{selected.g1 | safe}}'),{{/if}}{{if (options.selected.enterPrefix !== "")}} prefixOrSuffixString =c("{{selected.enterPrefix | safe}}"),{{/if}}{{if (options.selected.enterSuffix !== "")}} prefixOrSuffixString =c("{{selected.enterSuffix | safe}}"),{{/if}}{{if (options.selected.g1 == "TRUE" )}} NewCol={{selected.g1 | safe}},{{/if}} dontMakeFactor ={{selected.dontMakeFactor | safe}},dataSetNameOrIndex='{{dataset.name}}')
#Refresh the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            oldvars: {
                el: new dstVariableList(config, {
                    label: recodeVariables.t('oldvars'),
                    no: "oldvars",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label1: { el: new labelVar(config, { label: recodeVariables.t('label1'), style: "mt-3",h: 5 }) },
            newvarradio: { el: new radioButton(config, { label: recodeVariables.t('newvarradio'), no: "g1", increment: "newvarradio", value: "TRUE",  required:true, state: "checked", syntax: "", extraction: "ValueAsIs", dependant_objects: ["newvar"] }) },
            newvar: {
                el: new input(config, {
                    no: 'newvar',
                    label: recodeVariables.t('newvar'),
                    placeholder: "",
                    extraction: "CreateArray",
                    allow_spaces:true,
                    value: "",
                    ml: 4,
                    type: "character",
                }),
            },
            oldvarradio: { el: new radioButton(config, { label: recodeVariables.t('oldvarradio'), no: "g1", increment: "oldvarradio", value: "", state: "", syntax: "{{dataset.name}}", extraction: "ValueAsIs" }) },
            suffix: { el: new radioButton(config, { label: recodeVariables.t('suffix'), no: "g1", increment: "suffix", value: "suffix", state: "", syntax: "", required: true, dependant_objects: ["enterSuffix"], extraction: "ValueAsIs", }) },
            prefix: { el: new radioButton(config, { label: recodeVariables.t('prefix'), no: "g1", increment: "prefix", value: "prefix", state: "", syntax: "", required: true, dependant_objects: ["enterPrefix"], extraction: "ValueAsIs", }) },
            enterPrefix: {
                el: new input(config, {
                    no: 'enterPrefix',
                    label: recodeVariables.t('enterPrefix'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            enterSuffix: {
                el: new input(config, {
                    no: 'enterSuffix',
                    label: recodeVariables.t('enterSuffix'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    allow_spaces:true,
                    }),
            },
            label3: { el: new labelVar(config, { label: recodeVariables.t('label3'), h: 6, style: "mt-3" }) },
            label4: { el: new labelVar(config, { label: recodeVariables.t('label4'), h: 6 }) },
            label5: { el: new labelVar(config, { label: recodeVariables.t('label5'), h: 6 }) },
            label5a: { el: new labelVar(config, { label: recodeVariables.t('label5a'), h: 6 }) },
            label5b: { el: new labelVar(config, { label: recodeVariables.t('label5b'), h: 6 }) },
            label6: { el: new labelVar(config, { label: recodeVariables.t('label6'), h: 6 }) },
            oldnewvals: {
                el: new input(config, {
                    no: 'oldnewvals',
                    label: recodeVariables.t('oldnewvals'),
                    placeholder: "",
                    allow_spaces:true,  
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                    type: "character"
                }),
            },

            dontMakeFactor: { el: new checkbox(config, { label: recodeVariables.t('dontMakeFactor'), style: "mt-2",no: "dontMakeFactor",
            extraction: "Boolean" }) },

        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.oldvars.el.content, objects.label1.el.content, objects.newvarradio.el.content, objects.newvar.el.content, objects.oldvarradio.el.content, objects.suffix.el.content, objects.enterSuffix.el.content,objects.prefix.el.content, objects.enterPrefix.el.content],
            bottom: [objects.label3.el.content,objects.label4.el.content, objects.label5.el.content,objects.label5a.el.content,objects.label5b.el.content,objects.label6.el.content, objects.oldnewvals.el.content, objects.dontMakeFactor.el.content],
            nav: {
                name: recodeVariables.t('navigation'),
                icon: "icon-recode",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: recodeVariables.t('help.title'),
            r_help: recodeVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: recodeVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new recodeVariables().render()
}
