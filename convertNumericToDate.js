/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Numeric To Date & Time",
        navigation: "Numeric To Date & Time",
       
	   //labelInfo: "Converts a numeric variable to a POSIXct date-time variable. Choose the numeric type that matches your data (e.g. Unix timestamp in seconds, milliseconds, or a packed numeric such as YYYYMMDD or YYYYMMDDHHMMSS). The new variable is always stored in UTC.",
       labelInfo: "Converts a numeric variable to a POSIXct date-time variable. Choose the numeric type that matches your data (e.g. Unix timestamp in seconds, Julian or Excel Date in days). The new variable is always stored in UTC.",
        
		label1: "Select a suffix or prefix for the converted variable",
        suffix: "Suffix",
        prefix: "Prefix",
        prefixOrSuffix: "Enter a prefix or suffix",
        Destination: "Select numeric variable to convert to date",

        NumericType: "Select the numeric type of the source variable",
        unixOrigin: "(Optional) Specific Origin / Epoch (format: YYYYMMDDHHMMSS, default 19700101000000 i.e., January 1, 1970, at 00:00:00 UTC). Unix Timestamp treats values as seconds since the origin; Julian Day treats values as days since the origin; Excel Date shifts the converted result by the days between the origin and 1970-01-01 (leave blank for standard Excel files). See Help for examples.",
        TimeZone: "Select a time zone for Unix timestamps (default – nothing selected is UTC)",

        missingYear: "Missing Year: if year cannot be derived, type in the year, e.g. 2024. Leave blank to use current year",
        missingMonth: "Missing Month: if month cannot be derived, type in the month, e.g. 03 for March. Leave blank to use current month",
        missingDay: "Missing Day: if day cannot be derived, type in the day of the month, e.g. 17. Leave blank to use today",
        missingHour: "Missing Hour: if hour cannot be derived, type in the hour, e.g. 7 or 16. Leave blank to use current hour",
        missingMinute: "Missing Minute: if minute cannot be derived, type in the minute, e.g. 10 or 35. Leave blank to use current minute",
        missingSeconds: "Missing Seconds: if seconds cannot be derived, type in the seconds, e.g. 17 or 59. Leave blank to use current seconds",

        help: {
            title: "Convert Numeric to Date & Time (POSIXct)",
            r_help: "help(package=\"lubridate\")",
            body: `
                <b>Description</b></br>
                Converts a numeric column to a POSIXct date-time variable using the lubridate package.
                The converted variable is always created and displayed in UTC.
                <br/>
                <br/>
                Supported numeric types:
                </br>
                </br>
                <b>Unix Timestamp – Number of Seconds (since 1970-01-01)</b>
                </br>
                An integer or double giving the number of seconds elapsed since 1970-01-01 00:00:00 UTC.
                A fractional part is treated as fractional seconds.
                </br>
                Examples: 1696636800 → 2023-10-07 00:00:00 UTC; 1700000000.5 → 2023-11-14 22:13:20.5 UTC
                </br>
                </br>
                <b>Julian Day – Number of Days (since 1970-01-01)</b>
                </br>
                A day count where 0 = 1970-01-01. Note: this is NOT the astronomical Julian Day Number (JDN,
                where 2440588 = 1970-01-01). If your data contains JDN values in the ~2,400,000 range,
                subtract 2440588 first (Variables &gt; Compute), then use this option.
                A fractional part is treated as a fraction of a day (0.5 = noon).
                </br>
                Examples: 19637 → 2023-10-07; 20000 → 2024-10-04; 19637.5 → 2023-10-07 12:00:00 UTC
                </br>
                </br>
                <b>Excel Date – Number of Days (Windows 1900 date system)</b>
                </br>
                The serial number used by Microsoft Excel on Windows, where 1 = 1900-01-01 and
                25569 = 1970-01-01. The fractional part encodes the time of day (fraction of 24 hours).
                </br>
                Excel's historical leap-year bug is handled: Excel serial 60 corresponds to the
                nonexistent date 1900-02-29, so serials of 60 or more are internally reduced by 1
                (serial 60 itself converts to 1900-02-28, serial 61 to 1900-03-01). All dates from
                1900-03-01 onward convert to the true calendar date.
                </br>
                </br>
                Worked example — the value 46140.68:
                </br>
                &nbsp;&nbsp;• Whole part 46140 → April 28, 2026
                </br>
                &nbsp;&nbsp;• Fractional part 0.68 × 86,400 seconds = 58,752 seconds = 16:19:12 (4:19:12 PM)
                </br>
                &nbsp;&nbsp;• Result: 2026-04-28 16:19:12 UTC
                </br>
                </br>
                <b>Rule of thumb — recognizing the format from the value range (for present-day dates)</b>
                <table border="1" cellpadding="4" cellspacing="0">
                <tr><th>Typical value range</th><th>Likely format</th></tr>
                <tr><td>~45,000–47,000 (5 digits)</td><td>Excel serial date (years 2023–2028)</td></tr>
                <tr><td>~19,000–21,000 (5 digits)</td><td>Julian days since 1970 (years 2022–2027)</td></tr>
                <tr><td>~1,600,000,000–1,800,000,000 (10 digits)</td><td>Unix timestamp in seconds (years 2020–2027)</td></tr>
                </table>
                </br>
                <b>What is an Epoch / Origin? (plain English)</b>
                </br>
                A number by itself cannot be a date — it only becomes one once you know the starting
                point it is counted from. That agreed-upon starting point is called the <i>epoch</i>
                (also called the <i>origin</i>). Think of it as "day zero" (or "second zero") on a ruler:
                the numeric value simply tells you how far along the ruler you are, and the epoch tells
                you where the ruler begins. The same number means completely different dates under
                different epochs — for example, the value 20000 means 2024-10-04 when counted as days
                from 1970-01-01, but 2054-10-04 when counted as days from 2000-01-01.
                </br>
                </br>
                Each of the three formats in this dialog has its own built-in default epoch:
                <table border="1" cellpadding="4" cellspacing="0">
                <tr><th>Format</th><th>Default epoch</th><th>The value counts...</th></tr>
                <tr><td>Unix Timestamp</td><td>1970-01-01 00:00:00 UTC</td><td>seconds since the epoch</td></tr>
                <tr><td>Julian Day</td><td>1970-01-01 (day 0)</td><td>days since the epoch</td></tr>
                <tr><td>Excel Date</td><td>1900 date system (serial 1 = 1900-01-01)</td><td>days, where 25569 = 1970-01-01</td></tr>
                </table>
                </br>
                <b>Origin / Epoch input field (optional — leave blank in most cases)</b>
                </br>
                If your numeric values were created by a system that counts from a different starting
                point than the defaults above, type that starting point into the Origin / Epoch field as
                exactly 14 digits in YYYYMMDDHHMMSS order (4-digit year, 2-digit month, day, hour, minute,
                second — pad with zeros). Examples of how to write an origin:
                </br>
                &nbsp;&nbsp;• 1970-01-01 00:00:00 → 19700101000000 (this is the default when left blank)
                </br>
                &nbsp;&nbsp;• 1960-01-01 00:00:00 → 19600101000000
                </br>
                &nbsp;&nbsp;• 2000-01-01 12:30:00 → 20000101123000
                </br>
                The entry must be a real calendar date-time; an impossible value such as 19701399000000
                (month 13, day 99) is rejected with an error. How the override is applied depends on the
                format:
                </br>
                <ul>
                <li><b>Unix Timestamp (Seconds):</b> the values are treated as seconds elapsed since the
                custom origin instead of since 1970-01-01. Example: SAS datetime values count seconds
                from 1960-01-01, so enter 19600101000000; a SAS value of 315619200 then converts to
                1970-01-01 00:00:00 UTC. Leave blank for ordinary Unix timestamps.</li>
                <li><b>Julian Day:</b> the values are treated as days elapsed since the custom origin
                instead of since 1970-01-01. Example: if your day counts start at 2000-01-01, enter
                20000101000000; a value of 0 then converts to 2000-01-01, and a value of 100 converts
                to 2000-04-10.</li>
                <li><b>Excel Date:</b> the origin shifts the converted result forward or backward by the
                number of days between the custom origin and 1970-01-01; it does not redefine the Excel
                1900 epoch itself. For standard Windows Excel files, leave this blank. Note: workbooks
                saved with the Mac 1904 date system are not supported by this shift — instead add 1462
                to the serial values first (Variables &gt; Compute), then convert with the default origin.</li>
                </ul>
                </br>
                </br>
                <b>Formats not available in this dialog</b>
                </br>
				The following numeric formats are not supported/implemented in this dialog. To convert them, first change the variable to character (Variables &gt; Convert &gt; Numeric to Character, if needed) and then use the Variables &gt; Convert &gt; Character to Date and Time menu.
				</br>
				</br>
                <b>Unix Timestamp – Milliseconds</b>
                </br>
                An integer representing the number of milliseconds since the Unix epoch.
                Example values: 1696680000000, 1700000000500
                </br>
                </br>
                <b>Unix Timestamp – Microseconds</b>
                </br>
                An integer representing the number of microseconds since the Unix epoch.
                Example values: 1696680000000000
                </br>
                </br>
                <b>Packed Numeric – YYYYMM</b>
                </br>
                A 6-digit integer encoding year and month only (day and time are not encoded).
                Example values: 202502, 202510
                </br>
                </br>
                <b>Packed Numeric – YYYYMMDD</b>
                </br>
                An 8-digit integer encoding a calendar date only (no time).
                Example values: 20241007, 19991231
                </br>
                </br>
                <b>Packed Numeric – YYYYMMDDHHMMSS</b>
                </br>
                A 14-digit integer encoding date and time without separators.
                Example values: 20241007163456, 19991231235959
                </br>
                </br>
                <b>Year only</b>
                </br>
                A 4-digit numeric year (month, day, and time are not encoded).
                Example values: 2020, 2024
                </br>
                <b>Help</b></br>
                help(package="lubridate")
            `
        }
    }
}


class convertNumericToDate extends baseModal {
    constructor() {
        var config = {
            id: "convertNumericToDate",
            label: localization.en.title,
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
            labelInfo: { el: new labelVar(config, { label: localization.en.labelInfo, h: 6 }) },
            label1:    { el: new labelVar(config, { label: localization.en.label1, h: 5 }) },
            suffix: {
                el: new radioButton(config, {
                    label: localization.en.suffix,
                    no: "rdgrp1", increment: "suffix",
                    value: "suffix", state: "checked",
                    extraction: "ValueAsIs"
                })
            },
            prefix: {
                el: new radioButton(config, {
                    label: localization.en.prefix,
                    no: "rdgrp1", increment: "prefix",
                    value: "prefix", state: "",
                    extraction: "ValueAsIs"
                })
            },
            prefixOrSuffix: {
                el: new input(config, {
                    no: 'prefixOrSuffix',
                    label: localization.en.prefixOrSuffix,
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
                    label: localization.en.Destination,
                    no: "Destination",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            NumericType: {
                el: new comboBox(config, {
                    no: 'NumericType',
                    label: localization.en.NumericType,
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
                    label: localization.en.unixOrigin,
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
                    label: localization.en.missingYear,
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
                    label: localization.en.missingMonth,
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
                    label: localization.en.missingDay,
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
                    label: localization.en.missingHour,
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
                    label: localization.en.missingMinute,
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
                    label: localization.en.missingSeconds,
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
                    label: localization.en.TimeZone,
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
                name: localization.en.navigation,
                icon: "icon-calendar-1",
                onclick: `r_before_modal('${config.id}')`,
                modal_id: config.id
            }
        }

        super(config, objects, content);
        this.help = localization.en.help;
    }
}

module.exports.item = new convertNumericToDate().render()
