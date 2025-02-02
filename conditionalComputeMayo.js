







class conditionalComputeMayo extends baseModal {
    static dialogId = 'conditionalComputeMayo'
    static t = baseModal.makeT(conditionalComputeMayo.dialogId)

    constructor() {
        var config = {
            id: conditionalComputeMayo.dialogId,
            label: conditionalComputeMayo.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(stringr);
require(dplyr);
#Computes the new/existing column
local({tryCatch({ .GlobalEnv\${{dataset.name}} <- {{dataset.name}} %>% mutate({{selected.newvar |safe}} = {{selected.swCase | safe}} )}, error = function(e){  cat(conditionMessage(e))} )})
#Refresh the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")
`,
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {scroll: true}) },
            newvar: {
                el: new input(config, {
                    no: 'newvar',
                    label: conditionalComputeMayo.t('newvar'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                    overwrite: "variable",
                    required: true
                }),
            },
            swCase: {
                el: new switchCase(config, {
                    no: "swCase",
                    label: "",
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character"
                })
            }, 
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.newvar.el.content, objects.swCase.el.content ],
            nav: {
                name: conditionalComputeMayo.t('navigation'),
                icon: "icon-sqrt_qmark",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: conditionalComputeMayo.t('help.title'),
            r_help: conditionalComputeMayo.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: conditionalComputeMayo.t('help.body')
        }
;
    }

    prepareExecution(instance) {
        let res = [];
        let temp = "";
      
            var code_vars = {
                dataset: {
                    name: getActiveDataset()
                },
                selected: {
                    newvar: instance.objects.newvar.el.getVal(),
                    swCase: instance.objects.swCase.el.getVal(),
                   
                }
            }
            code_vars.selected.swCase = constructIfElse(code_vars.selected.swCase)
            let cmd = instance.dialog.renderR(code_vars)
            cmd = removenewline(cmd);
            temp = temp + cmd + "\n";
            
            res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
        return res;
    }
}

module.exports = {
    render: () => new conditionalComputeMayo().render()
}



function constructIfElse(swCase) {
    let if_elements =[];
    let then_elements = []
    let else_elements =[]
    let temp =""
    let hydratedSwCase = JSON.parse(swCase);
    hydratedSwCase.forEach(function (value) {
        if (value.switch != undefined )
        {
            if ( value.switch != "")
            {
                if_elements.push(value.switch)
                then_elements.push(value.case)
            }
        }
        if (value.else != undefined )
        {
            if ( value.else != "")
            {
                else_elements.push(value.else)
            }
        }
    })
    let closingBracket = ")"
    for (var i = 0 ; i < if_elements.length; i ++) 
    {
        temp = temp + "\n\tifelse(" + if_elements[i] + "," + then_elements[i] + ","
    }
    if (else_elements[0] !=undefined)
    {
        temp += else_elements[0]
    }
    else
    {
        temp += "NA"
    }
    temp = temp + closingBracket.repeat(i)
    return temp
}
