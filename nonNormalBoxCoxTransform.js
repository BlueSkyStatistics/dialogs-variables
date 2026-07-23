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
    if (lambda == 0) 
	{ 
		log(response) 
	}
	else if(lambda == 1)
	{
		response
	}
    else 
	{ 
		(response^lambda - 1) / lambda 
	}
}

# Friendly name for well-known Box-Cox lambda values (informational only - does not affect computation)
BSkyBoxCoxLambdaName <<- function(lambda)
{
	if(lambda == 2) return("square ( x^2 )")
	if(lambda == 1) return("no transformation ( x )")
	if(lambda == 0.5) return("square root ( sqrt(x) )")
	if(round(lambda, 2) == 0.33) return("cube root")
	if(lambda == 0.25) return("fourth root")
	if(lambda == 0) return("natural log ( log(x) )")
	if(lambda == -0.5) return("reciprocal square root ( 1/sqrt(x) )")
	if(lambda == -1) return("reciprocal ( 1/x )")
	if(lambda == -2) return("reciprocal square ( 1/x^2 )")
	return("")
}
	
{{if(options.selected.gpbox1 === "variable")}}
	{{if(options.selected.variableSelcted === "")}} 
		BSkyFormat("\nError: A variable must be selected\n")
	{{#else}}
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
						BSkyFormat(paste("\nBased on log-likelihood function, Box-Cox lambda value chosen for the transformation is:", round(boxcoxLambda,{{selected.digits | safe}}),
								ifelse(BSkyBoxCoxLambdaName(boxcoxLambda) != "", paste0("( ", BSkyBoxCoxLambdaName(boxcoxLambda), " )"), ""),
								"\nFormula: ", ifelse(boxcoxLambda == 0, "Y = Ln( X )", ifelse(boxcoxLambda == 1, "Y = X", paste0("Y = ( X^", round(boxcoxLambda, {{selected.digits | safe}}), " - 1 ) / ", round(boxcoxLambda, {{selected.digits | safe}})))),
								"\n"))
					}
				{{#else}}
					boxcoxLambda = c({{selected.lambda | safe}})
					
					BSkyFormat(paste("\nBox-Cox lambda value specified for the transformation is:", round(boxcoxLambda,{{selected.digits | safe}}),
								ifelse(BSkyBoxCoxLambdaName(boxcoxLambda) != "", paste0("( ", BSkyBoxCoxLambdaName(boxcoxLambda), " )"), ""),
								"\nFormula: ", ifelse(boxcoxLambda == 0, "Y = Ln( X )", ifelse(boxcoxLambda == 1, "Y = X", paste0("Y = ( X^", round(boxcoxLambda, {{selected.digits | safe}}), " - 1 ) / ", round(boxcoxLambda, {{selected.digits | safe}})))),
								"\n"))
				{{/if}}
					
					if(boxcoxLambda != -999 && abs(boxcoxLambda) >= 2)
					{
						BSkyFormat("Warning: the optimal Lambda is at the boundary of the Box-Cox search range (-2 to 2). This typically means a power transformation is a poor fit for this data - the transformed values will have very little variation and may appear nearly identical after rounding. You may want to try the Johnson transformation (Transform > Johnson transformation) which often provides a much better fit in these cases")
					}
					
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
		
		
		
		BSkyLoadRefresh('{{dataset.name}}')
		
	{{/if}}
{{#else}}
		temp_vector_values = NULL
		temp_vector_values = unlist({{dataset.name}})
		boxcoxLambdaOptimal = -999 
		bcox_temp_vector_values = c()
		
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
					boxcoxLambda = c({{selected.lambda | safe}})
				{{/if}}
				
					BSkyFormat(paste("\nBoxcox lambda value chosen for the transformation is", round(boxcoxLambda,{{selected.digits | safe}}),
								ifelse(BSkyBoxCoxLambdaName(boxcoxLambda) != "", paste0("( ", BSkyBoxCoxLambdaName(boxcoxLambda), " )"), ""),
								"\nFormula: ", ifelse(boxcoxLambda == 0, "Y = Ln( X )", ifelse(boxcoxLambda == 1, "Y = X", paste0("Y = ( X^", round(boxcoxLambda, {{selected.digits | safe}}), " - 1 ) / ", round(boxcoxLambda, {{selected.digits | safe}})))),
								"\n"))
					
					if(!is.null(boxcoxLambda) && abs(boxcoxLambda) >= 2)
					{
						BSkyFormat("Warning: the optimal Lambda is at the boundary of the Box-Cox search range (-2 to 2). This typically means a power transformation is a poor fit for this data - the transformed values will have very little variation and may appear nearly identical after rounding. You may want to try the Johnson transformation (Transform > Johnson transformation) which often provides a much better fit in these cases")
					}
					
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

`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) }, 
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
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [
					
					
					
					objects.label2.el.content,
					
					objects.selectVariableRad.el.content,
					objects.variableSelcted.el.content,
					objects.boxcoxColName.el.content,
					
					objects.selectDatasetRad.el.content,
					
					objects.boxcoxDatasetName.el.content,
					
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
            r_help: nonNormalBoxCoxTransform.t('help.r_help'), //Fix by Anil //r_help: "help(data,package='utils')",
            body: nonNormalBoxCoxTransform.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new nonNormalBoxCoxTransform().render()
}
