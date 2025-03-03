/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const nav = {
    "name": "Variables",
    "tab": "Variables",
    "buttons": [
        "./binNumericVariables",
        {
            "name": "Box-Cox",
            "icon": "icon-gaussian-function",
            "children": [
                "./nonNormalBoxCoxTransform",
                "./inspectBoxCoxLambda",
                "./addRemoveBoxCoxLambda",
                "./inverseBoxCoxTransform"
            ]
        },        			
        {
            "name": "Compute",
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
            "name": "Convert",
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
            "name": "Factor Levels",
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
            "name": "Missing Values",
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
}

module.exports.nav = nav

