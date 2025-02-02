








class replaceMissingValues extends baseModal {
    static dialogId = 'replaceMissingValues'
    static t = baseModal.makeT(replaceMissingValues.dialogId)

    constructor() {
        var config = {
            id: replaceMissingValues.dialogId,
            label: replaceMissingValues.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
#[Replaces NAs in factor and string variables by the specified value]
#For factor variables, the specified value must be a level of the factor
#You can add levels by right clicking on the variable in the variable grid and selecting "Add new level"
{{dataset.name}}[,c({{selected.destination | safe}})]  [is.na({{dataset.name}}[,c({{selected.destination | safe}})])] <- c("{{selected.repString | safe}}")
#Refreshes the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")  
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            destination: {
                el: new dstVariableList(config, {
                    label: replaceMissingValues.t('destination'),
                    no: "destination",
                    filter: "String||Date|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            repString: {
                el: new input(config, {
                    no: 'repString',
                    label: replaceMissingValues.t('repString'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                }),
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.repString.el.content],
            nav: {
                name: replaceMissingValues.t('navigation'),
                icon: "icon-abc",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: replaceMissingValues.t('help.title'),
            r_help: replaceMissingValues.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: replaceMissingValues.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new replaceMissingValues().render()
}
