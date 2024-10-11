


class inspectBoxCoxLambda extends baseModal {
    static dialogId = 'inspectBoxCoxLambda'
    static t = baseModal.makeT(inspectBoxCoxLambda.dialogId)

    constructor() {
        var config = {
            id: inspectBoxCoxLambda.dialogId,
            label: inspectBoxCoxLambda.t('title'),
            modalType: "two",
            RCode:`

require(MASS)

{{if(options.selected.variablelistSelcted === "")}} 
		BSkyFormat("\nError: A variable must be selected\n")
{{#else}}
		boxcoxLambda = NULL
		var_list_df = data.frame()
		
		var_list_len = length(c({{selected.variablelistSelcted | safe}}))
		for(i in 1:var_list_len)
		{
			boxcoxLambda = attr({{dataset.name}}[, c({{selected.variablelistSelcted | safe}})[i]], 'bcox_lambda')
			if(is.null(boxcoxLambda))
			{
				boxcoxLambda = c(" ")
			}
			var_list_df = rbind(var_list_df, boxcoxLambda)
		}
		var_list_df = cbind(c({{selected.variablelistSelcted | safe}}), var_list_df)
		names(var_list_df) = c("Variable", "Lambda")
		#rownames(var_list_df) = c({{selected.variablelistSelcted | safe}})
		BSkyFormat(var_list_df, outputTableRenames = "Box-Cox Lambda Values")
{{/if}}
		
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
			variablelistSelcted: {
                el: new dstVariableList(config, {
                    label: inspectBoxCoxLambda.t('variablelistSelcted'),
                    no: "variablelistSelcted",
                    required: false,
                    filter: "Numeric|Scale",
					style: "mb-3",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
			/*
			digits: {
                el: new inputSpinner(config, {
                    no: 'digits',
                    label: inspectBoxCoxLambda.t('digits'),
                    required: true,
                    min: 0,
                    max: 15,
                    step: 1,
                    value: 4,
					width: "w-25",
					style: "mb-2",
                })
            }, 
			*/
			label2: { 
				el: new labelVar(config, { 
					label: inspectBoxCoxLambda.t('label2'), 
					h: 6, 
					style: "mb-2",
				}) 
			},
			/*
			variableSelcted: {
                el: new dstVariable(config, {
                    label: inspectBoxCoxLambda.t('variableSelcted'),
                    no: "variableSelcted",
                    required: false,
                    //filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					filter: "Numeric|Scale",
					style: "mt-1 ml-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			*/
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [	
					objects.label2.el.content,
					objects.variablelistSelcted.el.content,
					//objects.variableSelcted.el.content,
					//objects.digits.el.content
					],
            nav: {
                name: inspectBoxCoxLambda.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: inspectBoxCoxLambda.t('help.title'),
            r_help: "help(data,package='utils')",
            body: inspectBoxCoxLambda.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new inspectBoxCoxLambda().render()
}
