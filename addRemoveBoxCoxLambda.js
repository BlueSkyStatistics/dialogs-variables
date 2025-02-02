


class addRemoveBoxCoxLambda extends baseModal {
    static dialogId = 'addRemoveBoxCoxLambda'
    static t = baseModal.makeT(addRemoveBoxCoxLambda.dialogId)

    constructor() {
        var config = {
            id: addRemoveBoxCoxLambda.dialogId,
            label: addRemoveBoxCoxLambda.t('title'),
            modalType: "two",
            RCode:`

require(MASS)

oldLambda = NULL

{{if(options.selected.gpbox1 === "addLambda")}}
		{{if(options.selected.lambda === "")}} 
			BSkyFormat("Error: A lambda value is required")
		{{#else}}
			oldLambda = attr({{dataset.name}}\${{selected.variableSelcted | safe}}, 'bcox_lambda')
			attr({{dataset.name}}\${{selected.variableSelcted | safe}}, 'bcox_lambda') = {{selected.lambda | safe}}
			
			if(is.null(oldLambda))
			{
				oldLambda = c("None")
			}
			
			BSkyFormat(paste("Original Lambda value:", oldLambda, "changed to:",{{selected.lambda | safe}}, "for", '{{selected.variableSelcted | safe}}'))
		{{/if}}
{{#else}}
	{{if(options.selected.gpbox1 === "removeLambda")}}
		oldLambda = attr({{dataset.name}}\${{selected.variableSelcted | safe}}, 'bcox_lambda')
		attr({{dataset.name}}\${{selected.variableSelcted | safe}}, 'bcox_lambda') = NULL
		
		if(!is.null(oldLambda))
		{
			BSkyFormat(paste("Original Lambda value:", oldLambda, "has been removed", "for", '{{selected.variableSelcted | safe}}'))
		}else
		{
			BSkyFormat(paste("No Lambda value found for", '{{selected.variableSelcted | safe}}'))
		}
	{{/if}}
{{/if}}

		
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
			/*
			variablelistSelcted: {
                el: new dstVariableList(config, {
                    label: addRemoveBoxCoxLambda.t('variablelistSelcted'),
                    no: "variablelistSelcted",
                    required: false,
                    filter: "Numeric|Scale",
					style: "mb-3",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
			*/
			/*
			digits: {
                el: new inputSpinner(config, {
                    no: 'digits',
                    label: addRemoveBoxCoxLambda.t('digits'),
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
					label: addRemoveBoxCoxLambda.t('label2'), 
					h: 6, 
					style: "mb-2",
				}) 
			},
			variableSelcted: {
                el: new dstVariable(config, {
                    label: addRemoveBoxCoxLambda.t('variableSelcted'),
                    no: "variableSelcted",
                    required: true,
                    //filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					filter: "Numeric|Scale",
					style: "mt-1 ml-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			lambda: {
                el: new input(config, {
                    no: 'lambda',
                    label: addRemoveBoxCoxLambda.t('lambda'),
                    placeholder: "",
                    required: false,
                    type: "numeric",
					filter: "numeric",
					//style: "ml-5 mb-3",
					style: "ml-5 mb-2",
                    extraction: "TextAsIs",
					allow_spaces:true,
                    value: "",
					width: "w-25",
                })
            },
			selectAddLambdaRad: {
                el: new radioButton(config, {
                    label: addRemoveBoxCoxLambda.t('selectAddLambdaRad'),
                    no: "gpbox1",
                    increment: "selectAddLambdaRad",
                    value: "addLambda",
                    state: "checked",
                    extraction: "ValueAsIs",
                })
            },
			selectRemoveLambdaRad: {
                el: new radioButton(config, {
                    label: addRemoveBoxCoxLambda.t('selectRemoveLambdaRad'),
                    no: "gpbox1",
                    increment: "selectRemoveLambdaRad",
                    value: "removeLambda",
                    state: "",
					//style: "mb-4",
					extraction: "ValueAsIs",
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [	
					objects.label2.el.content,
					//objects.variablelistSelcted.el.content,
					objects.variableSelcted.el.content,
					objects.selectAddLambdaRad.el.content,
					objects.lambda.el.content,
					objects.selectRemoveLambdaRad.el.content
					//objects.digits.el.content
					],
            nav: {
                name: addRemoveBoxCoxLambda.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: addRemoveBoxCoxLambda.t('help.title'),
            r_help: addRemoveBoxCoxLambda.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: addRemoveBoxCoxLambda.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new addRemoveBoxCoxLambda().render()
}
