










class transformVariables extends baseModal {
    static dialogId = 'transformVariables'
    static t = baseModal.makeT(transformVariables.dialogId)

    constructor() {
        var config = {
            id: transformVariables.dialogId,
            label: transformVariables.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
local({
text =c("{{selected.enterPrefix | safe}}{{selected.enterSuffix | safe}}")
varNames =c({{selected.target | safe}})
#Create the new variable names with a prefix
if ("{{selected.grp10 | safe}}"=="Prefix") 
{
    newVarNames =paste (text,varNames, sep="_")
} else if ("{{selected.grp10 | safe}}"=="Suffix") 
{
#Create the new variable names with a suffix
    newVarNames =paste (varNames, text, sep="_")
}
i=1
for(var in varNames)
{
#Perform the transformation on each variable
if ("{{selected.grp10 | safe}}" =="Overwrite")
    {
    {{dataset.name}}[,var] <<-{{selected.selectctrl | safe}}({{dataset.name}}[,var])       
    } else 
    {
    {{dataset.name}}[,newVarNames[i]] <<-{{selected.selectctrl | safe}}({{dataset.name}}[,var])
    }
i=i+1
}
}
)
#Refresh the dataset in the grid
BSkyLoadRefresh("{{dataset.name}}")
`,
        }
        var objects = {
            label1: { el: new labelVar(config, { label: transformVariables.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: transformVariables.t('target'),
                    no: "target",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            selectctrl: {
                el: new comboBox(config, {
                    no: 'selectctrl',
                    label: transformVariables.t('selectctrl'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    options: ["log10", "log", "log2", "abs", "ceiling", "floor", "factorial", "toupper", "tolower", "as.numeric", "as.character", "as.factor", "sqrt"]
                })
            },
            label2: { el: new labelVar(config, { label: transformVariables.t('label2'), style: "mt-3",h: 5 }) },
            suffix: { el: new radioButton(config, { label: transformVariables.t('suffix'), no: "grp10", increment: "suffix", value: "Suffix", state: "checked", required:true,extraction: "ValueAsIs", dependant_objects: ["enterSuffix"] }) },
            enterSuffix: {
                el: new input(config, {
                    no: 'enterSuffix',
                    label: transformVariables.t('enterSuffix'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    allow_spaces:true,
                }),
            },
            prefix: { el: new radioButton(config, { label: transformVariables.t('prefix'), no: "grp10", increment: "prefix", value: "Prefix", state: "", required:true,extraction: "ValueAsIs", dependant_objects: ["enterPrefix"] }) },
            enterPrefix: {
                el: new input(config, {
                    no: 'enterPrefix',
                    label: transformVariables.t('enterPrefix'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    ml: 4,
                    type: "character"
                }),
            },
            overwrite: { el: new radioButton(config, { label: transformVariables.t('overwrite'), no: "grp10", increment: "overwrite", value: "Overwrite", state: "", extraction: "ValueAsIs", }) },
        }
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.target.el.content, objects.selectctrl.el.content, objects.label2.el.content, objects.suffix.el.content, objects.enterSuffix.el.content, objects.prefix.el.content, objects.enterPrefix.el.content, objects.overwrite.el.content,],
            nav: {
                name: transformVariables.t('navigation'),
                icon: "icon-sqrt_x",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: transformVariables.t('help.title'),
            r_help: transformVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: transformVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new transformVariables().render()
}
