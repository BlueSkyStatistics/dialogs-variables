/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class nonNormalBoxCoxTransform extends baseModal {
    static dialogId = 'nonNormalBoxCoxTransform'
    static t = baseModal.makeT(nonNormalBoxCoxTransform.dialogId)

    constructor() {
        var config = {
            id: nonNormalBoxCoxTransform.dialogId,
            label: nonNormalBoxCoxTransform.t('title'),
            modalType: "two",
            RCode:`

require(MASS)

BoxCoxTransform <<- function(response, lambda=0) 
{
    if (lambda == 0L) 
	{ 
		log(response) 
	}
	else if(lambda %in% c(0.5, 0.33, 1, 2, 3))
	{
		response ^ lambda
	}
	else if(lambda %in% c(-0.5, -0.33, -1, -2, -3))
	{
		1/(response ^ (-lambda))
	}
    else 
	{ 
		(response^lambda - 1) / lambda 
	}
}
	
{{if(options.selected.gpbox1 === "variable")}}
	{{if(options.selected.variableSelcted === "")}} 
		BSkyFormat("\nError: A variable must be selected\n")
	{{#else}}
		{{if(options.selected.boxcoxChk !== "TRUE")}}
			if(length({{dataset.name}}\${{selected.variableSelcted | safe}}[{{dataset.name}}\${{selected.variableSelcted | safe}} < 0 & !is.na({{dataset.name}}\${{selected.variableSelcted | safe}})]) == 0)
			{
				boxcoxObj = NULL 
				bcox_{{selected.variableSelcted | safe}} = c()
				boxcoxLambdaOptimal = -999 
				
				{{if(options.selected.lambda === "")}}
					boxcoxObj <- MASS::boxcox(object = lm(with({{dataset.name}}, c({{selected.variableSelcted | safe}})) ~ 1), plotit = TRUE)
					if(!is.null(boxcoxObj))
					{
						# Exact lambda
						boxcoxLambdaOptimal <- boxcoxObj$x[which.max(boxcoxObj$y)]
						boxcoxLambda = boxcoxLambdaOptimal
						#BSkyFormat(cbind(x_points = boxcoxObj$x, y_points = boxcoxObj$y), outputTableRenames = "log-likelihood values for Lambda")
						BSkyFormat(paste("\nBased on log-likelihood function, Box-Cox lambda value chosen for the transformation is:", round(boxcoxLambda,{{selected.digits | safe}}),"\n"))
					}
				{{#else}}
					boxcoxLambda = c({{selected.lambda | safe}})
					
					BSkyFormat(paste("\nBox-Cox lambda value specified for the transformation is:", round(boxcoxLambda,{{selected.digits | safe}}),"\n"))
				{{/if}}
					
					if(boxcoxLambda != -999)  
					{
						bcox_{{selected.variableSelcted | safe}} = round(BoxCoxTransform(response = {{dataset.name}}\${{selected.variableSelcted | safe}}, lambda = boxcoxLambda), {{selected.digits | safe}})
					}
					
					if(length(bcox_{{selected.variableSelcted | safe}}) > 0 && !all(is.na(bcox_{{selected.variableSelcted | safe}})))
					{
						{{if(options.selected.boxcoxColName === "")}}
							{{dataset.name}}\${{selected.variableSelcted | safe}}_bcox = round(bcox_{{selected.variableSelcted | safe}}, {{selected.digits | safe}})
							attr({{dataset.name}}\${{selected.variableSelcted | safe}}_bcox, 'bcox_lambda') = boxcoxLambda
						{{#else}}
							{{dataset.name}}\${{selected.boxcoxColName | safe}} = round(bcox_{{selected.variableSelcted | safe}}, {{selected.digits | safe}})
							attr({{dataset.name}}\${{selected.boxcoxColName | safe}}, 'bcox_lambda') = boxcoxLambda
						{{/if}}
					}
			} else {
					BSkyFormat("Error: Box-Cox tranformation cannot be performed with negative values")
			}
		{{/if}}	
		
		{{if(options.selected.johnsonChk === "TRUE")}}
		
			jon_{{selected.variableSelcted | safe}} = NULL
			
			jon_{{selected.variableSelcted | safe}} <- RE.Johnson(with({{dataset.name}}, {{selected.variableSelcted | safe}}[!is.na({{selected.variableSelcted | safe}})]))$transformed
			
			if(length(jon_{{selected.variableSelcted | safe}}) > 0 && !all(is.na(jon_{{selected.variableSelcted | safe}})))
			{
				{{dataset.name}}\${{selected.variableSelcted | safe}}_jon = {{dataset.name}}\${{selected.variableSelcted | safe}}
				
				{{dataset.name}}\${{selected.variableSelcted | safe}}_jon[!is.na({{dataset.name}}\${{selected.variableSelcted | safe}}_jon)] = round(jon_{{selected.variableSelcted | safe}}, {{selected.digits | safe}})
				
			}
		{{/if}}
		
		BSkyLoadRefresh('{{dataset.name}}')
		
	{{/if}}
{{#else}}
		temp_vector_values = NULL
		temp_vector_values = unlist({{dataset.name}})
		boxcoxLambdaOptimal = -999 
		bcox_temp_vector_values = c()
		
		{{if(options.selected.boxcoxChk !== "TRUE")}}
			if(length(temp_vector_values[temp_vector_values < 0 & !is.na(temp_vector_values)]) == 0)
			{
				boxcoxObj = NULL 
				boxcoxLambda = NULL
				
				{{if(options.selected.lambda === "")}}
					boxcoxObj <- MASS::boxcox(object = lm(temp_vector_values ~ 1), plotit = TRUE)
				
					if(!is.null(boxcoxObj))
					{
						# Exact lambda 
						boxcoxLambdaOptimal <- boxcoxObj$x[which.max(boxcoxObj$y)]
						boxcoxLambda = boxcoxLambdaOptimal
					}
				{{#else}}
					boxcoxLambda = {{selected.lambda | safe}}
				{{/if}}
				
					BSkyFormat(paste("\nBoxcox lambda value chosen for the transformation is", round(boxcoxLambda,{{selected.digits | safe}}),"\n"))
					
					if(boxcoxLambda != -999)  
					{
						bcox_temp_vector_values = round(BoxCoxTransform(response = temp_vector_values, lambda = boxcoxLambda), {{selected.digits | safe}})
					}
					
					if(length(bcox_temp_vector_values) > 0 && !all(is.na(bcox_temp_vector_values)))
					{
						{{if(options.selected.boxcoxDatasetName !== "")}}
							{{selected.boxcoxDatasetName | safe}} = as.data.frame(matrix(bcox_temp_vector_values, nrow = dim({{dataset.name}})[1], byrow = FALSE))
							names({{selected.boxcoxDatasetName | safe}}) = names({{dataset.name}})
							BSkyLoadRefresh('{{selected.boxcoxDatasetName | safe}}')
							attr({{selected.boxcoxDatasetName | safe}}, 'bcox_lambda') = boxcoxLambda
							dummy = lapply(names({{selected.boxcoxDatasetName | safe}}),function(x) attr({{selected.boxcoxDatasetName | safe}}[,c(x)], 'bcox_lambda') <<- boxcoxLambda)
						{{#else}}
							{{dataset.name}}_bcox = as.data.frame(matrix(bcox_temp_vector_values, nrow = dim({{dataset.name}})[1], byrow = FALSE))
							names({{dataset.name}}_bcox) = names({{dataset.name}})
							BSkyLoadRefresh('{{dataset.name}}_bcox')
							attr({{dataset.name}}_bcox, 'bcox_lambda') = boxcoxLambda
							dummy = lapply(names({{dataset.name}}_bcox),function(x) attr({{dataset.name}}_bcox[,c(x)], 'bcox_lambda') <<- boxcoxLambda)
						{{/if}}
					}
				} else {
					BSkyFormat("Error: Box-Cox tranformation cannot be performed with negative values")
				}
		{{/if}}	
		
		
		{{if(options.selected.johnsonChk === "TRUE")}}
			jon_temp_vector_values = NULL
			
			jon_temp_vector_values <- RE.Johnson(temp_vector_values[!is.na(temp_vector_values)])$transformed
			if(length(jon_temp_vector_values) > 0 && !all(is.na(jon_temp_vector_values)))
			{
				temp_vector_values[!is.na(temp_vector_values)] = jon_temp_vector_values
				
				{{if(options.selected.johnsonDatasetName !== "")}}
					{{selected.johnsonDatasetName | safe}} = as.data.frame(matrix(temp_vector_values, nrow = dim({{dataset.name}})[1], byrow = FALSE))
					names({{selected.johnsonDatasetName | safe}}) = names({{dataset.name}})
					BSkyLoadRefresh('{{selected.johnsonDatasetName | safe}}')
				{{#else}}
					{{dataset.name}}_jon = as.data.frame(matrix(temp_vector_values, nrow = dim({{dataset.name}})[1], byrow = FALSE))
					names({{dataset.name}}_jon) = names({{dataset.name}})
					BSkyLoadRefresh('{{dataset.name}}_jon')
				{{/if}}
			}
		{{/if}}
{{/if}}
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
			boxcoxChk: {
                el: new checkbox(config, {
                    label: nonNormalBoxCoxTransform.t('boxcoxChk'), 
					no: "boxcoxChk",
                    bs_type: "valuebox",
                    //style: "mt-2 mb-1",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: " ",
					state: "checked",
					newline: true,
                })
            },
			johnsonChk: {
                el: new checkbox(config, {
                    label: nonNormalBoxCoxTransform.t('johnsonChk'), 
					no: "johnsonChk",
                    bs_type: "valuebox",
                    style: "mb-2",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: " ",
					newline: true,
                })
            },
			digits: {
                el: new inputSpinner(config, {
                    no: 'digits',
                    label: nonNormalBoxCoxTransform.t('digits'),
                    required: true,
                    min: 0,
                    max: 15,
                    step: 1,
                    value: 4,
					width: "w-25",
					style: "mb-2",
                })
            }, 
			lambda: {
                el: new input(config, {
                    no: 'lambda',
                    label: nonNormalBoxCoxTransform.t('lambda'),
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
			label2: { 
				el: new labelVar(config, { 
					label: nonNormalBoxCoxTransform.t('label2'), 
					h: 6, 
					style: "mb-2",
				}) 
			},
			variableSelcted: {
                el: new dstVariable(config, {
                    label: nonNormalBoxCoxTransform.t('variableSelcted'),
                    no: "variableSelcted",
                    required: false,
                    //filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
					filter: "Numeric|Scale",
					style: "mt-1 ml-3",
                    extraction: "NoPrefix",
                }), r: ['{{ var | safe}}']
            },
			selectVariableRad: {
                el: new radioButton(config, {
                    label: nonNormalBoxCoxTransform.t('selectVariableRad'),
                    no: "gpbox1",
                    increment: "selectVariableRad",
                    value: "variable",
                    state: "checked",
                    extraction: "ValueAsIs",
                })
            },
			selectDatasetRad: {
                el: new radioButton(config, {
                    label: nonNormalBoxCoxTransform.t('selectDatasetRad'),
                    no: "gpbox1",
                    increment: "selectDatasetRad",
                    value: "dataset",
                    state: "",
					//style: "mb-4",
					extraction: "ValueAsIs",
					dependant_objects: ["boxcoxDatasetName"]
                })
            },
			boxcoxColName: {
                el: new input(config, {
                    no: 'boxcoxColName',
                    label: nonNormalBoxCoxTransform.t('boxcoxColName'),
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
			boxcoxDatasetName: {
                el: new input(config, {
                    no: 'boxcoxDatasetName',
                    label: nonNormalBoxCoxTransform.t('boxcoxDatasetName'),
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
			johnsonDatasetName: {
                el: new input(config, {
                    no: 'johnsonDatasetName',
                    label: nonNormalBoxCoxTransform.t('johnsonDatasetName'),
                    placeholder: "",
                    required: false,
                    type: "character",
					//filter: "character|numeric",
					style: "ml-5 mb-2",
                    extraction: "TextAsIs",
					//allow_spaces:true,
                    value: "",
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [
					//objects.boxcoxChk.el.content,
					
					
					//objects.johnsonChk.el.content,
					
					objects.label2.el.content,
					
					objects.selectVariableRad.el.content,
					objects.variableSelcted.el.content,
					objects.boxcoxColName.el.content,
					
					objects.selectDatasetRad.el.content,
					
					objects.boxcoxDatasetName.el.content,
					//objects.johnsonDatasetName.el.content,
					
					objects.lambda.el.content,
					objects.digits.el.content
					],
            nav: {
                name: nonNormalBoxCoxTransform.t('navigation'),
                icon: "icon-gaussian-function",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: nonNormalBoxCoxTransform.t('help.title'),
            r_help: nonNormalBoxCoxTransform.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: nonNormalBoxCoxTransform.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new nonNormalBoxCoxTransform().render()
}
