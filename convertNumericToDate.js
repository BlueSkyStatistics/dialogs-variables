/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class convertNumericToDate extends baseModal {
    static dialogId = 'convertNumericToDate'
    static t = baseModal.makeT(convertNumericToDate.dialogId)

    constructor() {
        var config = {
            id: convertNumericToDate.dialogId,
            label: convertNumericToDate.t('title'),
            modalType: "two",
            splitProcessing: false,
            RCode: `
require(lubridate)

# Capture current date-time components for fallback defaults
bsky_currentDateTime = lubridate::now(tzone = "UTC")
bsky_currentYear    = lubridate::year(bsky_currentDateTime)
bsky_currentMonth   = lubridate::month(bsky_currentDateTime)
bsky_currentDay     = lubridate::day(bsky_currentDateTime)
bsky_currentHour    = lubridate::hour(bsky_currentDateTime)
bsky_currentMinute  = lubridate::minute(bsky_currentDateTime)
bsky_currentSeconds = floor(lubridate::second(bsky_currentDateTime))

# Fallback to current date-time values (OPTIONS panel currently hidden;
# restore template conditionals here when packed numeric formats are re-exposed)
bsky_missingYear    = bsky_currentYear
bsky_missingMonth   = bsky_currentMonth
bsky_missingDay     = bsky_currentDay
bsky_missingHour    = bsky_currentHour
bsky_missingMinute  = bsky_currentMinute
bsky_missingSeconds = bsky_currentSeconds


# Parse the user-supplied Unix origin (YYYYMMDDHHMMSS) into a POSIXct value.
# Defaults to the standard Unix epoch (1970-01-01 00:00:00 UTC) when blank.
bsky_unixOriginStr = "{{selected.unixOrigin | safe}}"
if (nchar(trimws(bsky_unixOriginStr)) == 0) {
    bsky_unixOriginStr = "19700101000000"
}
if (!grepl("^[0-9]{14}$", trimws(bsky_unixOriginStr))) {
    stop("Origin must be exactly 14 digits in YYYYMMDDHHMMSS format, e.g. 19700101000000")
}
bsky_originPOSIXct = lubridate::ymd_hms(
    paste0(
        substr(bsky_unixOriginStr, 1,  4), "-",
        substr(bsky_unixOriginStr, 5,  6), "-",
        substr(bsky_unixOriginStr, 7,  8), " ",
        substr(bsky_unixOriginStr, 9,  10), ":",
        substr(bsky_unixOriginStr, 11, 12), ":",
        substr(bsky_unixOriginStr, 13, 14)
    ),
    tz = "UTC"
)
# Guard against digit strings that pass the 14-digit regex but are not real
# calendar date-times (e.g. 19701399000000 - month 13, day 99). ymd_hms()
# returns NA for these, which would silently turn every converted value into NA.
if (is.na(bsky_originPOSIXct)) {
    stop(paste0("Origin '", bsky_unixOriginStr, "' is not a valid calendar date-time. Use YYYYMMDDHHMMSS with a real date and time, e.g. 19700101000000"))
}
# Offset in seconds between the custom origin and the Unix epoch
bsky_originOffsetSec = as.numeric(bsky_originPOSIXct)

# Core conversion function
BSkyConvertNumericDateVarToDate <<- function(
    numVar, numericType,
    originOffsetSec = 0,
    missingYear    = lubridate::year(lubridate::now(tzone = "UTC")),
    missingMonth   = lubridate::month(lubridate::now(tzone = "UTC")),
    missingDay     = lubridate::day(lubridate::now(tzone = "UTC")),
    missingHour    = lubridate::hour(lubridate::now(tzone = "UTC")),
    missingMinute  = lubridate::minute(lubridate::now(tzone = "UTC")),
    missingSeconds = floor(lubridate::second(lubridate::now(tzone = "UTC")))
) {
    switch(numericType,

        # -----------------------------------------------------------------
        # Unix timestamps — offset shifts the epoch before conversion
        # -----------------------------------------------------------------
        "Timestamp (Unix) - Number of Seconds (since 1970-01-01)" = {
            return(lubridate::as_datetime(as.numeric(numVar) + originOffsetSec, tz = "UTC"))
        },

        #"Timestamp (Unix) - Number of Milliseconds (since 1970-01-01)" = {
        #    return(lubridate::as_datetime(as.numeric(numVar) / 1e3 + originOffsetSec, tz = "UTC"))
        #},

        #"Timestamp (Unix) - Number of Microseconds (since 1970-01-01)" = {
        #    return(lubridate::as_datetime(as.numeric(numVar) / 1e6 + originOffsetSec, tz = "UTC"))
        #},

        # -----------------------------------------------------------------
        # Packed numerics (reserved for future exposure)
        # -----------------------------------------------------------------
        #"Packed Numeric - YYYYMM" = {
        #    s <- formatC(as.integer(numVar), width = 6, flag = "0")
        #    dt_str <- paste0(
        #        substr(s, 1, 4), "-", substr(s, 5, 6), "-",
        #        formatC(missingDay,     width = 2, flag = "0"), " ",
        #        formatC(missingHour,    width = 2, flag = "0"), ":",
        #        formatC(missingMinute,  width = 2, flag = "0"), ":",
        #        formatC(missingSeconds, width = 2, flag = "0")
        #    )
        #    return(lubridate::ymd_hms(dt_str, tz = "UTC"))
        #},

        #"Packed Numeric - YYYYMMDD" = {
        #    s <- formatC(as.integer(numVar), width = 8, flag = "0")
        #    dt_str <- paste0(
        #        substr(s, 1, 4), "-", substr(s, 5, 6), "-", substr(s, 7, 8),
        #        " ",
        #        formatC(missingHour,    width = 2, flag = "0"), ":",
        #        formatC(missingMinute,  width = 2, flag = "0"), ":",
        #        formatC(missingSeconds, width = 2, flag = "0")
        #    )
        #    return(lubridate::ymd_hms(dt_str, tz = "UTC"))
        #},

        #"Packed Numeric - YYYYMMDDHHMMSS" = {
        #    s <- formatC(as.numeric(numVar), format = "f", digits = 0)
        #    s <- formatC(as.integer(s), width = 14, flag = "0")
        #    dt_str <- paste0(
        #        substr(s, 1,  4), "-",
        #        substr(s, 5,  6), "-",
        #        substr(s, 7,  8), " ",
        #        substr(s, 9,  10), ":",
        #        substr(s, 11, 12), ":",
        #        substr(s, 13, 14)
        #    )
        #    return(lubridate::ymd_hms(dt_str, tz = "UTC"))
        #},

        # -----------------------------------------------------------------
        # Year-only numeric (reserved for future exposure)
        # -----------------------------------------------------------------
        #"Year only" = {
        #    dt_str <- paste0(
        #        as.integer(numVar), "-",
        #        formatC(missingMonth,   width = 2, flag = "0"), "-",
        #        formatC(missingDay,     width = 2, flag = "0"), " ",
        #        formatC(missingHour,    width = 2, flag = "0"), ":",
        #        formatC(missingMinute,  width = 2, flag = "0"), ":",
        #        formatC(missingSeconds, width = 2, flag = "0")
        #    )
        #    return(lubridate::ymd_hms(dt_str, tz = "UTC"))
        #},

        # -----------------------------------------------------------------
        # Julian Day — days since 1970-01-01 (not the astronomical JDN).
        # originOffsetSec converts to days (÷ 86400) and shifts the count.
        # Default origin 1970-01-01 → offset = 0, so behaviour is unchanged.
        # -----------------------------------------------------------------
        "Julian Day - Number of Days (since 1970-01-01)" = {
            originOffsetDays <- originOffsetSec / 86400
            return(lubridate::as_datetime((as.numeric(numVar) + originOffsetDays) * 86400, tz = "UTC"))
        },

        # -----------------------------------------------------------------
        # Excel serial date (Windows 1900 epoch, with leap-year bug).
        # Excel day 1 = 1900-01-01; day 60 is the phantom 1900-02-29.
        # Standard shift: Unix epoch (1970-01-01) is Excel serial 25569.
        # originOffsetSec converts to days and adjusts that shift so a
        # custom origin moves the effective epoch accordingly.
        # -----------------------------------------------------------------
        "Excel Date - Number of Days (since Windows 1900)" = {
            n <- as.numeric(numVar)
            # Adjust for Excel's phantom leap day (serial <= 60 are pre-1900-03-01)
            n_adj <- ifelse(n >= 60, n - 1, n)
            # originOffsetSec is seconds from Unix epoch to custom origin;
            # convert to days and subtract from the standard Excel→Unix shift (25568)
            originOffsetDays <- originOffsetSec / 86400
            unix_sec <- (n_adj - 25568 + originOffsetDays) * 86400
            return(lubridate::as_datetime(unix_sec, tz = "UTC"))
        },

        stop("Invalid numeric type specified")
    )
}

{{if(options.selected.rdgrp1 ==="suffix")}}
    {{dataset.name}}\${{selected.Destination | safe}}{{selected.prefixOrSuffix | safe}} = BSkyConvertNumericDateVarToDate(
        {{dataset.name}}\${{selected.Destination | safe}},
        "{{selected.NumericType | safe}}",
        bsky_originOffsetSec,
        bsky_missingYear, bsky_missingMonth, bsky_missingDay,
        bsky_missingHour, bsky_missingMinute, bsky_missingSeconds
    )
{{#else}}
    {{dataset.name}}\${{selected.prefixOrSuffix | safe}}{{selected.Destination | safe}} = BSkyConvertNumericDateVarToDate(
        {{dataset.name}}\${{selected.Destination | safe}},
        "{{selected.NumericType | safe}}",
        bsky_originOffsetSec,
        bsky_missingYear, bsky_missingMonth, bsky_missingDay,
        bsky_missingHour, bsky_missingMinute, bsky_missingSeconds
    )
{{/if}}

BSkyLoadRefresh(bskyDatasetName="{{dataset.name}}", load.dataframe=TRUE)
`,
            pre_start_r: JSON.stringify({
                TimeZone: "OlsonNames()",
            })
        }

        var objects = {
            labelInfo: { el: new labelVar(config, { label: convertNumericToDate.t('labelInfo'), h: 6 }) },
            label1:    { el: new labelVar(config, { label: convertNumericToDate.t('label1'), h: 5 }) },
            suffix: {
                el: new radioButton(config, {
                    label: convertNumericToDate.t('suffix'),
                    no: "rdgrp1", increment: "suffix",
                    value: "suffix", state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            prefix: {
                el: new radioButton(config, {
                    label: convertNumericToDate.t('prefix'),
                    no: "rdgrp1", increment: "prefix",
                    value: "prefix", state: "",
                    extraction: "ValueAsIs"
                })
            },
            prefixOrSuffix: {
                el: new input(config, {
                    no: 'prefixOrSuffix',
                    label: convertNumericToDate.t('prefixOrSuffix'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    enforceRobjectRules: false,
                    value: "Dt",
                    required: true,
                    ml: 4,
                    type: "character"
                }),
            },
            content_var: { el: new srcVariableList(config, { action: "move", scroll:true }) },
            Destination: {
                el: new dstVariable(config, {
                    label: convertNumericToDate.t('Destination'),
                    no: "Destination",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            NumericType: {
                el: new comboBox(config, {
                    no: 'NumericType',
                    label: convertNumericToDate.t('NumericType'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    options: [
                        "Timestamp (Unix) - Number of Seconds (since 1970-01-01)",
                        //"Timestamp (Unix) - Number of Milliseconds (since 1970-01-01)",
                        //"Timestamp (Unix) - Number of Microseconds (since 1970-01-01)",
                        //"Packed Numeric - YYYYMM",
                        //"Packed Numeric - YYYYMMDD",
                        //"Packed Numeric - YYYYMMDDHHMMSS",
                        //"Year only",
                        "Julian Day - Number of Days (since 1970-01-01)",
                        "Excel Date - Number of Days (since Windows 1900)"
                    ],
                    default: "Timestamp (Unix) - Number of Seconds (since 1970-01-01)"
                })
            },
            unixOrigin: {
                el: new input(config, {
                    no: 'unixOrigin',
                    label: convertNumericToDate.t('unixOrigin'),
                    placeholder: "19700101000000",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-75",
                    extraction: "TextAsIs",
                    value: "",
                    dependant_objects: ["NumericType"],
                    // Show only when a Unix Timestamp type is selected
                    // (visibility controlled by the UI framework via dependant_objects)
                })
            },
            missingYear: {
                el: new input(config, {
                    no: 'missingYear',
                    label: convertNumericToDate.t('missingYear'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            missingMonth: {
                el: new input(config, {
                    no: 'missingMonth',
                    label: convertNumericToDate.t('missingMonth'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            missingDay: {
                el: new input(config, {
                    no: 'missingDay',
                    label: convertNumericToDate.t('missingDay'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            missingHour: {
                el: new input(config, {
                    no: 'missingHour',
                    label: convertNumericToDate.t('missingHour'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            missingMinute: {
                el: new input(config, {
                    no: 'missingMinute',
                    label: convertNumericToDate.t('missingMinute'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            missingSeconds: {
                el: new input(config, {
                    no: 'missingSeconds',
                    label: convertNumericToDate.t('missingSeconds'),
                    placeholder: "",
                    type: "character",
                    enforceRobjectRules: false,
                    width: "w-50",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            // Reserved for future time-zone selection
            TimeZone: {
                el: new comboBox(config, {
                    no: 'TimeZone',
                    label: convertNumericToDate.t('TimeZone'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
        }

        var timeZoneOptions = {
            el: new optionsVar(config, {
                no: "timeZoneOptions",
                content: [
                    objects.missingYear.el,
                    objects.missingMonth.el,
                    objects.missingDay.el,
                    objects.missingHour.el,
                    objects.missingMinute.el,
                    objects.missingSeconds.el,
                ]
            })
        }

        const content = {
            head: [
                objects.labelInfo.el.content,
                objects.label1.el.content,
                objects.suffix.el.content,
                objects.prefix.el.content,
                objects.prefixOrSuffix.el.content
            ],
            left:   [objects.content_var.el.content],
            right:  [objects.Destination.el.content, objects.NumericType.el.content, objects.unixOrigin.el.content],
            //bottom: [timeZoneOptions.el.content],
            nav: {
                name: convertNumericToDate.t('navigation'),
                icon: "icon-calendar-1",
                onclick: `r_before_modal('${config.id}')`,
                modal_id: config.id
            }
        }

        super(config, objects, content);
        
        this.help = {
            title: convertNumericToDate.t('help.title'),
            r_help: convertNumericToDate.t('help.r_help'), //Fix by Anil //r_help: "help(data,package='utils')",
            body: convertNumericToDate.t('help.body')
        }
;
    }
}


module.exports = {
    render: () => new convertNumericToDate().render()
}

