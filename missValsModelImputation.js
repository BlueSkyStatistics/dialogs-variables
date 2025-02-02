












class missValsModelImputation extends baseModal {
    static dialogId = 'missValsModelImputation'
    static t = baseModal.makeT(missValsModelImputation.dialogId)

    constructor() {
        var config = {
            id: missValsModelImputation.dialogId,
            label: missValsModelImputation.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require("simputation")
local({
    packageToLoad = switch("{{selected.modeltype | safe}}",
    "impute_rlm"="MASS", "impute_en"="glmnet", "impute_cart"="rpart", "impute_rf"="randomForest", "impute_rhd"="VIM", "impute_shd"="VIM", "impute_knn"="VIM", "impute_mf"="missForest", "impute_em"="norm") 
    
    #Load required package
    require(packageToLoad,character.only = TRUE)
    
    #Impute missing values
    .GlobalEnv\${{dataset.name}} ={{selected.modeltype | safe}}({{dataset.name}}, {{selected.depVar | safe}}~{{selected.formula | safe}})
    })
    #Refresh the dataset in the grid
    BSkyLoadRefresh("{{dataset.name}}")
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            depVar: {
                el: new dstVariable(config, {
                    label: missValsModelImputation.t('depVar'),
                    no: "depVar",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            label1: {el: new labelVar(config, {no: 'label1', label: missValsModelImputation.t('label1'), style: "mt-3",h: 9}) },
            formulaBuilder: {
                el: new formulaBuilder(config, {
                    no: "formula",
                    required:true,
                    label: missValsModelImputation.t('formula'),
                })
            },

            modeltype: {
                el: new comboBox(config, {
                    no: 'modeltype',
                    label: missValsModelImputation.t('modeltype'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["impute_rlm", "impute_en", "impute_cart", "impute_rf", "impute_rhd","impute_shd", "impute_knn", "impute_mf","impute_em"],
                    default: "impute_rlm",
                })
            },
            modelParam: {
                el: new input(config, {
                    no: 'modelParam',
                    label: missValsModelImputation.t('modelParam'),
                    placeholder: "",
                    type: "character",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [ objects.depVar.el.content, objects.formulaBuilder.el.content,  objects.modeltype.el.content, objects.modelParam.el.content],
            nav: {
                name: missValsModelImputation.t('navigation'),
                icon: "icon-logistic_formula",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: missValsModelImputation.t('help.title'),
            r_help: missValsModelImputation.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: missValsModelImputation.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new missValsModelImputation().render()
}
