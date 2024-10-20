






class ConvertToOrdinal extends baseModal {
    static dialogId = 'ConvertToOrdinal'
    static t = baseModal.makeT(ConvertToOrdinal.dialogId)

    constructor() {
        var config = {
            id: ConvertToOrdinal.dialogId,
            label: ConvertToOrdinal.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
#Converts variable: {{selected.varname | safe}} to ordered factor/ordinal
{{selected.vars | safe}} <- base::factor ({{selected.vars | safe}}, ordered = TRUE)
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            trg: {
                el: new dstVariableList(config, {
                    label: ConvertToOrdinal.t('trg'),
                    no: "trg",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "Prefix|UseComma",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.trg.el.content],
            nav: {
                name: ConvertToOrdinal.t('navigation'),
                icon: "icon-reorder_by_count",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: ConvertToOrdinal.t('help.title'),
            r_help: "help(data,package='utils')",
            body: ConvertToOrdinal.t('help.body')
        }
;
    }

	 prepareExecution(instance) {
        var res = [];
        var code_vars = {
            dataset: {
                name: getActiveDataset()
            },
            selected: instance.dialog.extractData()
        }
       let temp =""
		instance.objects.trg.el.getVal().forEach(function(value) {
			code_vars.selected.vars =  code_vars.dataset.name + "\$"+ value
			code_vars.selected.varname =  value
			//const cmd = instance.dialog.renderR(code_vars);
			temp += instance.dialog.renderR(code_vars);
		});

		temp = temp + "\n#Refreshing the dataset"
		temp = temp + "\nBSkyLoadRefresh(\"" + code_vars.dataset.name + "\")"
		let cmd = temp
		res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
		return res

    }

}
module.exports.item = new ConvertToOrdinal().render()
