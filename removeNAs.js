/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class removeNAs extends baseModal {
    static dialogId = 'removeNAs'
    static t = baseModal.makeT(removeNAs.dialogId)

    constructor() {
        var config = {
            id: removeNAs.dialogId,
            label: removeNAs.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(data.table)
#Removes missing values
#{{selected.newdatasetname | safe}}{{selected.rd | safe}}<-data.table:::na.omit.data.table({{dataset.name}}[c({{selected.subsetvars | safe}})])
{{selected.newdatasetname | safe}}{{selected.rd | safe}}<-na.omit({{dataset.name}}[c({{selected.subsetvars | safe}})])
#Refreshes the dataset in the data grid
BSkyLoadRefresh("{{selected.newdatasetname | safe}}{{selected.rd | safe}}")
 `
        }
        var objects = {
            label0: { el: new labelVar(config, { label: removeNAs.t('label0'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            label1: { el: new labelVar(config, { label: removeNAs.t('label1'),style: "mt-2",h: 5 }) },
            New: { el: new radioButton(config, { label: removeNAs.t('New'), no: "rd", increment: "New", value: "", state: "checked", extraction: "ValueAsIs",required: true, dependant_objects: ['newdatasetname'] }) },
            newdatasetname: {
                el: new input(config, {
                    no: 'newdatasetname',
                    label: removeNAs.t('newdatasetname'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    overwrite: "dataset",
                    ml: 4,
                    type: "character"
                })
            },
            Existing: { el: new radioButton(config, { label: removeNAs.t('Existing'), no: "rd", increment: "Existing", style: "mb-2",syntax: "{{dataset.name}}", value: "", state: "", extraction: "ValueAsIs" }) },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: removeNAs.t('subsetvars'),
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            head: [objects.label0.el.content,],
            left: [objects.content_var.el.content],
            right: [objects.label1.el.content, objects.New.el.content, objects.newdatasetname.el.content, objects.Existing.el.content, objects.subsetvars.el.content,],
            nav: {
                name: removeNAs.t('navigation'),
                icon: "icon-na",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: removeNAs.t('help.title'),
            r_help: removeNAs.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: removeNAs.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new removeNAs().render()
}
