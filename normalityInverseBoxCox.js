


class inverseBoxCoxTransform extends baseModal {
    static dialogId = 'inverseBoxCoxTransform'
    static t = baseModal.makeT(inverseBoxCoxTransform.dialogId)

    constructor() {
        var config = {
            id: inverseBoxCoxTransform.dialogId,
            label: inverseBoxCoxTransform.t('title'),
            modalType: "two",
            RCode:`

require(MASS)

InverseBoxCoxTransform <- function(response, lambda=0) 
{
    if (lambda == 0L) 
	{ 
		exp(response)
	}
	else if(lambda %in% c(0.5, 0.33, 1, 2, 3))
	{
		#response ^ lambda
		exp(log(response)/lambda)
	}
	else if(lambda %in% c(-0.5, -0.33, -1, -2, -3))
	{
		#1/(response ^ (-lambda))
		exp(log(response)/lambda)
	}
    else 
	{ 
		#(response^lambda - 1) / lambda
		exp(log(1 + lambda * response)/lambda)
	}
}

origLambda = NULL

{{if(options.selected.gpbox1 === "variable")}}
		{{if(options.selected.variableSelcted === "")}} 
			BSkyFormat("\nError: A variable must be selected\n")
		{{#else}}
			{{if(options.selected.lambda === "")}} 
				origLambda = attr({{dataset.name}}\${{selected.variableSelcted | safe}}, 'bcox_lambda')
				if(is.null(origLambda))
				{
					BSkyFormat("Error: No Lambda value found associated with the variable. You may manually specify a lambda value to be used to convert")
				}else
				{
					BSkyFormat(paste("Original Lambda value:", round(origLambda, {{selected.digits | safe}}), "will be used to convert", '{{selected.variableSelcted | safe}}'))
				}
			{{#else}}
				origLambda = c({{selected.lambda | safe}})
				BSkyFormat(paste("Specified Lambda value:", origLambda, "will be used to convert", '{{selected.variableSelcted | safe}}'))
			{{/if}}
			
			if(!is.null(origLambda))
			{
				invbcox_{{selected.variableSelcted | safe}} = InverseBoxCoxTransform (response = {{dataset.name}}\${{selected.variableSelcted | safe}}, lambda = origLambda)
			
				{{if(options.selected.invBoxCoxColName === "")}}
					{{dataset.name}}\${{selected.variableSelcted | safe}}_invbcox = round(invbcox_{{selected.variableSelcted | safe}}, {{selected.digits | safe}})
					attr({{dataset.name}}\${{selected.variableSelcted | safe}}_invbcox, 'bcox_lambda') = NULL
				{{#else}}
					{{dataset.name}}\${{selected.invBoxCoxColName | safe}} = round(invbcox_{{selected.variableSelcted | safe}}, {{selected.digits | safe}})
					attr({{dataset.name}}\${{selected.invBoxCoxColName | safe}}, 'bcox_lambda') = NULL
				{{/if}}
				
				BSkyLoadRefresh('{{dataset.name}}')
			}
		{{/if}}
{{#else}}
	{{if(options.selected.gpbox1 === "number")}}
		{{if(options.selected.invNumber === "")}} 
			BSkyFormat("\nError: A numeric value to be converted must be specified\n")
		{{#else}}
			{{if(options.selected.lambda === "")}} 
				{{if(options.selected.variableSelcted === "")}} 
					BSkyFormat("\nError: No Lambda value specified or no variable selected above to extract the Lambda value from. You may manually specify a lambda value or chose a varioable above that was transformed with Box-Cox previously\n")
				{{#else}}
					origLambda = attr({{dataset.name}}\${{selected.variableSelcted | safe}}, 'bcox_lambda')
					if(is.null(origLambda))
					{
						BSkyFormat("Error: No Lambda value found associated with the variable selected above. You may manually specify a lambda value to be used to convert")
					}else
					{
						BSkyFormat(paste("Original Lambda value from the variable (", '{{selected.variableSelcted | safe}}', ") :", round(origLambda, {{selected.digits | safe}}), "will be used to convert"))
					}
				{{/if}}
			{{#else}}
				origLambda = c({{selected.lambda | safe}})
				BSkyFormat(paste("Specified Lambda value:", origLambda, "will be used to convert"))
			{{/if}}
			
			if(!is.null(origLambda))
			{
				invbcox_number = InverseBoxCoxTransform (response = {{selected.invNumber | safe}}, lambda = origLambda)
				BSkyFormat(data.frame("Original Value" = {{selected.invNumber | safe}}, "Converted Value" = invbcox_number, check.names = FALSE),
								outputTableRenames = "Inverse Box-Cox Conversion")
			}
		{{/if}}		
	{{/if}}
{{/if}}

`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
			/*
			variablelistSelcted: {
                el: new dstVariableList(config, {
                    label: inverseBoxCoxTransform.t('variablelistSelcted'),
                    no: "variablelistSelcted",
                    required: false,
                    filter: "Numeric|Scale",
					style: "mb-3",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
			*/
			
			digits: {
                el: new inputSpinner(config, {
                    no: 'digits',
                    label: inverseBoxCoxTransform.t('digits'),
                    required: true,
                    min: 0,
                    max: 15,
                    step: 1,
                    value: 4,
					width: "w-25",
					style: "mb-2",
                })
            }, 
			label2: { 
				el: new labelVar(config, { 
					label: inverseBoxCoxTransform.t('label2'), 
					h: 6, 
					style: "mb-2",
				}) 
			},
			variableSelcted: {
                el: new dstVariable(config, {
                    label: inverseBoxCoxTransform.t('variableSelcted'),
                    no: "variableSelcted",
                    required: false,
                    //filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					filter: "Numeric|Scale",
					style: "mt-1 ml-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			lambda: {
                el: new input(config, {
                    no: 'lambda',
                    label: inverseBoxCoxTransform.t('lambda'),
                    placeholder: "",
                    required: false,
                    type: "numeric",
					filter: "numeric",
					//style: "ml-5 mb-3",
					style: "mb-2",
                    extraction: "TextAsIs",
					allow_spaces:true,
                    value: "",
					width: "w-25",
                })
            },
			invBoxCoxColName: {
                el: new input(config, {
                    no: 'invBoxCoxColName',
                    label: inverseBoxCoxTransform.t('invBoxCoxColName'),
                    placeholder: "",
                    required: false,
                    type: "character",
					//filter: "character|numeric",
					style: "ml-5",
                    extraction: "TextAsIs",
					//allow_spaces:true,
                    value: "",
                })
            },
			invNumber: {
                el: new input(config, {
                    no: 'invNumber',
                    label: inverseBoxCoxTransform.t('invNumber'),
                    placeholder: "",
                    required: false,
                    type: "numeric",
					//filter: "character|numeric",
					style: "ml-5",
                    extraction: "TextAsIs",
					allow_spaces:true,
                    value: "",
                })
            },
			selectVariableRad: {
                el: new radioButton(config, {
                    label: inverseBoxCoxTransform.t('selectVariableRad'),
                    no: "gpbox1",
                    increment: "selectVariableRad",
                    value: "variable",
                    state: "checked",
                    extraction: "ValueAsIs",
                })
            },
			selectNumberRad: {
                el: new radioButton(config, {
                    label: inverseBoxCoxTransform.t('selectNumberRad'),
                    no: "gpbox1",
                    increment: "selectNumberRad",
                    value: "number",
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
					
					objects.selectVariableRad.el.content,
					objects.variableSelcted.el.content,
					objects.invBoxCoxColName.el.content,
					
					objects.selectNumberRad.el.content,
					objects.invNumber.el.content,
					
					objects.lambda.el.content,
					
					objects.digits.el.content
					],
            nav: {
                name: inverseBoxCoxTransform.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: inverseBoxCoxTransform.t('help.title'),
            r_help: "help(data,package='utils')",
            body: inverseBoxCoxTransform.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new inverseBoxCoxTransform().render()
}
