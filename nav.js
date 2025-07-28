/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

//const {getT} = global.requireFromRoot("localization");
let t = getT('menutoolbar')
const nav = () => ({
    "name": t('variables_top_level_title'),// {ns: 'menutoolbar'}),
    "tab": "Variables",
    "buttons": [
        "./binNumericVariables",
        {
            "name": t('variables_Box_Cox'),// {ns: 'menutoolbar'}),
            "icon": "icon-gaussian-function",
            "children": [
                "./nonNormalBoxCoxTransform",
                "./inspectBoxCoxLambda",
                "./addRemoveBoxCoxLambda",
                "./inverseBoxCoxTransform"
            ]
        },        			
        {
            "name": t('variables_Compute'),// {ns: 'menutoolbar'}),
            "icon": "icon-calculator",
            "children": [
                "./applyFunctionAcrossRows",
                "./computeDummyVariables",
                "./computeVariable",
                "./conditionalCompute",
                "./conditionalComputeMayo"
            ]
        },
        "./concatenateVariables",
        {
            "name": t('variables_Convert'),// {ns: 'menutoolbar'}),
            "icon": "icon-exchange",
            "children": [
                "./convertDateToString",
				"./convertStringToDate",
                "./convertStringToDateTime",
                "./convertToFactor",
                "./ConvertToOrdinal"
            ]
        },
        "./deleteVariables",
        {
            "name": t('variables_Factor_Levels'),// {ns: 'menutoolbar'}),
            "icon": "icon-shapes",
            "children": [
                "./addNewLevels",
                "./displayLevels",
                "./dropUnusedLevels",
                "./labelNAasMissing",
                "./lumpIntoOther",
                "./specifyLevelsToKeepOrReplace",
                "./reorderByCount",
				"./byAnotherVariable",
                "./reorderByOccurance",
            ]
        },
        {
            "name": t('variables_Missing_Values'),// {ns: 'menutoolbar'}),
            "icon": "icon-na",
            "children": [
                "./replaceMissingValues",
                "./missValsModelImputation",
                "./missingValuesBasic",
                "./removeNAs",
                "./missValsFormula"
            ]
        },
        "./rankVariables",
        "./recodeVariables",
        "./standardizeVariables",
        "./transformVariables"
    ]
})

module.exports = {
    nav: nav(),
    render: () => nav()
}

