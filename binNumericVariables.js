










class binNumericVariables extends baseModal {
    static dialogId = 'binNumericVariables'
    static t = baseModal.makeT(binNumericVariables.dialogId)

    constructor() {
        var config = {
            id: binNumericVariables.dialogId,
            label: binNumericVariables.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
{{selected.varname | safe}} <- BlueSky::BSkybinVariable({{selected.vartobin | safe}}, bins={{selected.noofbins | safe}}, method={{selected.BinMethod | safe}}, labels={{if (options.selected.levelnames !== "c('')")}}{{selected.levelnames | safe}}{{/if}}{{selected.levelnames1 | safe}})
#Refresh the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            vartobin: {
                el: new dstVariable(config, {
                    label: binNumericVariables.t('vartobin'),
                    no: "vartobin",
                    filter: "Numeric|Date|Scale",
                    extraction: "Prefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            varname: {
                el: new input(config, {
                    label: binNumericVariables.t('varname'),
                    no: "varname",
                    extraction: "PrefixByDatasetName",
                    placeholder: "",
                    overwrite: "variable",
                    required: true,
                    value: "",
                }), r: ['{{ var | safe}}']
            },
            noofbins: {
                el: new inputSpinner(config, {
                    no: 'noofbins',
                    label: binNumericVariables.t('noofbins'),
                    min: 2,
                    max: 9999999,
                    step: 1,
                    value: 4,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label1: { el: new labelVar(config, { label: binNumericVariables.t('label1'), h: 5, style: "mt-2" }) },
            Names: { el: new radioButton(config, { label: binNumericVariables.t('Names'), no: "levelnames1", increment: "Names", value: "", state: "checked", extraction: "ValueAsIs", required: true, dependant_objects: ['levelnames'] }) },
            levelnames: {
                el: new input(config, {
                    label: binNumericVariables.t('levelnames'),
                    ml: 4,
                    no: "levelnames",
                    extraction: "CreateArray",
                    value: "",
                    placeholder: "",
                    type: "character",
                    allow_spaces:true,
                }), r: ['{{ var | safe}}']
            },
            Numbers: { el: new radioButton(config, { label: binNumericVariables.t('Numbers'), no: "levelnames1", increment: "Numbers", value: "FALSE", state: "", extraction: "ValueAsIs" }) },
            Ranges: { el: new radioButton(config, { label: binNumericVariables.t('Ranges'), no: "levelnames1", increment: "Ranges", value: "NULL", state: "", extraction: "ValueAsIs" }) },
            label2: { el: new labelVar(config, { label: binNumericVariables.t('label2'), h: 5,style: "mt-2", }) },
            equalwidth: { el: new radioButton(config, { label: binNumericVariables.t('equalwidth'), no: "BinMethod", increment: "equalwidth", value: "'intervals'", state: "checked", extraction: "ValueAsIs" }) },
            equalcount: { el: new radioButton(config, { label: binNumericVariables.t('equalcount'), no: "BinMethod", increment: "equalcount", value: "'proportion'", state: "", extraction: "ValueAsIs" }) },
            natural: { el: new radioButton(config, { label: binNumericVariables.t('natural'), no: "BinMethod", increment: "natural", value: "'natural'", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.vartobin.el.content, objects.varname.el.content, objects.noofbins.el.content, objects.label1.el.content, objects.Names.el.content, objects.levelnames.el.content, objects.Numbers.el.content, objects.Ranges.el.content, objects.label2.el.content, objects.equalwidth.el.content, objects.equalcount.el.content, objects.natural.el.content],
            nav: {
                name: binNumericVariables.t('navigation'),
                icon: "icon-bin",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: binNumericVariables.t('help.title'),
            r_help: binNumericVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: binNumericVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new binNumericVariables().render()
}
