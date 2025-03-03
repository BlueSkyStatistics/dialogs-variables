/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */











class computeDummyVariables extends baseModal {
    static dialogId = 'computeDummyVariables'
    static t = baseModal.makeT(computeDummyVariables.dialogId)

    constructor() {
        var config = {
            id: computeDummyVariables.dialogId,
            label: computeDummyVariables.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(fastDummies)
#Dummy coding variables
{{dataset.name}} <- fastDummies::dummy_cols(.data ={{dataset.name}}, select_columns = c({{selected.target | safe}}), {{selected.rdgrp | safe}}{{selected.chk3 | safe}},{{selected.chk4 | safe}} )
#Replacing blanks in the new columns for dummy variables with _ as modeling building
#and other functions don't work with blanks in variable names
#This is because blank characters are common in factor level names, think a level called "Returning customer" or "Home schooling"
names({{dataset.name}} ) <- stringr::str_replace_all(names({{dataset.name}} ) , pattern=" ", replacement="_")
BSkyLoadRefresh(bskyDatasetName="{{dataset.name}}" ,load.dataframe=TRUE)
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: computeDummyVariables.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: computeDummyVariables.t('target'),
                    no: "target",
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label2: { el: new labelVar(config, { label: computeDummyVariables.t('label2'), h: 5 }) },
            MostFrequent: { el: new radioButton(config, { label: computeDummyVariables.t('MostFrequent'), no: "rdgrp", increment: "MostFrequent", value: "remove_most_frequent_dummy = TRUE,", state: "checked", extraction: "ValueAsIs" }) },
            first: { el: new radioButton(config, { label: computeDummyVariables.t('first'), no: "rdgrp", increment: "first", value: "remove_first_dummy = TRUE,", state: "", extraction: "ValueAsIs", }) },
            None: { el: new radioButton(config, { label: computeDummyVariables.t('None'), no: "rdgrp", increment: "None", value: "", state: "", extraction: "ValueAsIs", }) },
            label3: { el: new labelVar(config, { label: computeDummyVariables.t('label3'), h: 5,style: "mt-2", }) },
            chk3: {
                el: new checkbox(config, {
                    label: computeDummyVariables.t('chk3'),
                    no: "chk3",
                    bs_type: "valuebox",
                    newline:true,
                    extraction: "BooleanValue",
                    true_value: "remove_selected_columns = TRUE",
                    false_value: "remove_selected_columns = FALSE",
                })
            },
            chk4: {
                el: new checkbox(config, {
                    label: computeDummyVariables.t('chk4'),
                    no: "chk4",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "ignore_na = FALSE",
                    false_value: "ignore_na = TRUE",
                })
            },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.label2.el.content, objects.MostFrequent.el.content, objects.first.el.content, objects.None.el.content, objects.label3.el.content, objects.chk3.el.content, objects.chk4.el.content,],
            nav: {
                name: computeDummyVariables.t('navigation'),
                icon: "icon-dummies",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: computeDummyVariables.t('help.title'),
            r_help: computeDummyVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: computeDummyVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new computeDummyVariables().render()
}
