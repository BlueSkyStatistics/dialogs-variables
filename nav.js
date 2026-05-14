const nav = {
    "id": "menu-variables",
    "buttons": [
        "./binNumericVariables",
        {
            "id": "menu-variables-box-cox",
            "icon": "icon-gaussian-function",
            "children": [
                "./addRemoveBoxCoxLambda",
                "./nonNormalBoxCoxTransform",
                "./inspectBoxCoxLambda",
                "./inverseBoxCoxTransform"
            ]
        },
        {
            "id": "menu-variables-compute",
            "icon": "icon-calculator",
            "children": [
                "./applyFunctionAcrossRows",
                "./computeVariable",
                "./conditionalCompute",
                "./conditionalComputeMayo",
                "./computeDummyVariables"
            ]
        },
        "./concatenateVariables",
        {
            "id": "menu-variables-convert",
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
            "id": "menu-variables-factorlevels",
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
            "id": "menu-variables-missingvalues",
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

