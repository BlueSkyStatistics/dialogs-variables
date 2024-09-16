
var localization = {
    en: {
        title: "Character To Date",
        navigation: "Character To Date",
		labelInfo: "If the conversion of the date character variable to date data type is successful, it will always create the new date variable with YYYY-MM-DD format",
        label1: "Select a suffix or prefix for converted variable",
        suffix: "Suffix",
        prefix: "Prefix",
        prefixOrSuffix: "Enter a prefix or suffix",
        Destination: "Select character variable to convert to date",
        DateFormat: "Specify the date format of the character variable selected",
        
		//Not used n this dialog
		TimeZone: "Select a time zone (default -nothing  selected is the local time zone of the PC)",
		
		missingYear: "If year is missing in date character variable, type in the year, e.g. 2024. Leave blank to use current year",
		missingMonth: "If month is missing in date character variable, type in the month, e.g. 03, Mar, or March for March. Leave blank to use current month",
		missingDay: "If day is missing in date character variable, type in the day of the month, e.g. 17. Leave blank to use today",
		
        help: {
            title: "Convert partial of full Date characters to Date data type",
            r_help: "help(package=\"lubridate\")",
            body: `
<b>Description</b></br>
Converts a date character string with partial or full date elements, i.e., date elements such as year, month, and day of the month to a date (POSIXct class) type. Select a format from the possible list of formats that represents the date character string (i.e., order and presence/absence of month, day, or year elements). 
<br/>
Many string preparation steps are performed internally before calling the functions from lubridate package to convert the prepared character date string to a new POSIXct date variable.
<br/>
<br/>
OPTIONS
<br/>
Expand the OPTIONS to fine-tune further whether to use the current year, month, or today if the year, month, or date elements are absent in the character date string variable
<br/>
<br/> 
	Date Formatting choices for the selected character date string variable are:
	</br>
	</br>
	month day:
	</br>
	Choose this when the selected character date string only contains the month followed by a day and no year, such as 03/17, 05-25, Mar,15 , May-21, ...
	</br>
	</br>
	day month:
	</br>
	Choose this when the selected character date string only contains the day followed by the month and no year, such as 17/03, 25-05, 15,Mar , 21-May,...
	</br>
	</br>
	month year:
	</br>
	Choose this when the selected character date string only contains the month followed by the year and no day of the month, such as 03/2024, 05-2020, Mar,2023 , Jul-2018,...
	</br>
	</br>
	year month:
	</br>
	Choose this when the selected character date string only contains the year followed by the month and no day of the month, such as 2024/03, 2020-05, 2023,Mar , 2018-Jul,...
	</br>
	</br>
	year only:
	</br>
	Choose this when the selected character date string only year and no day or month, such as 2020, 2024, 1995, ....
	</br>
	</br>
	month only:
	</br>
	Choose this when the selected character date string only month and no day or year, such as 03, 11, Mar, November, ....
	</br>
	</br>
	day only:
	</br>
	Choose this when the selected character date string only day and no month or year, such as day of the month as 03, 17, 28, or day of the week as Mon, Saturday, ....
	</br>
	</br>
	year month day:
	</br>
	Choose this when the selected character date string year, followed by month and day such as 2024/03/22, 2020-05-19, 2019,Mar,26,...
	</br>
	</br>
	month day year:
	</br>
	Choose this whenthe selected character date string contains the month, followed by day and year, such as 03/22/2024, 05-19-2020, Mar,26,2019,...
	</br>
	</br>
	day month year:
	</br>
	Choose this when the selected character date string contains a day, followed by a month and year, such as 22/03/2024, 19-05-2020, 26 March 2019,...
	</br>
	</br>
	</br>
<b>Help</b></br>
help(package=\"lubridate\")
`}
    }
}


class convertCharacterToDate extends baseModal {
    constructor() {
        var config = {
            id: "convertCharacterToDate",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode:`

require(lubridate)

#BSkystrptime (varNames = c( {{selected.Destination | safe}}), dateFormat = "{{selected.DateFormat | safe}}", timezone = "{{selected.TimeZone | safe}}", prefixOrSuffix = "{{selected.rdgrp1 | safe}}",  prefixOrSuffixValue = "{{selected.prefixOrSuffix | safe}}", data = "{{dataset.name}}") 

# Extract year, month, and day
bsky_currentDate = Sys.Date()
bsky_currentYear = year(bsky_currentDate)
bsky_currentMonth = month(bsky_currentDate)
bsky_currentDay = day(bsky_currentDate)

bsky_missingYear = {{if(options.selected.missingYear !="")}} "{{selected.missingYear | safe}}" {{#else}} bsky_currentYear {{/if}}

bsky_missingMonth = {{if(options.selected.missingMonth !="")}} "{{selected.missingMonth | safe}}" {{#else}} bsky_currentMonth {{/if}}

bsky_missingDay = {{if(options.selected.missingDay !="")}} "{{selected.missingDay | safe}}" {{#else}} bsky_currentDay {{/if}}

# Create a mapping function
BSkyWeekdayToNumber <- function(day) 
{
  if(!all(!is.na(suppressWarnings(as.numeric(day))))){
	  day = day %>%
		recode(
		  "Mon" = 1, "Monday" = 1,
		  "Tue" = 2, "Tuesday" = 2,
		  "Wed" = 3, "Wednesday" = 3,
		  "Thu" = 4, "Thursday" = 4,
		  "Fri" = 5, "Friday" = 5,
		  "Sat" = 6, "Saturday" = 6,
		  "Sun" = 7, "Sunday" = 7
		)
  }
  return(day)
}

BSkyConvertCharDateVarToDate <- function(charDateVar, dateFormat, missingYear = year(Sys.Date()), missingMonth = month(Sys.Date()), missingDay = day(Sys.Date()))
{
	switch(dateFormat,
			 #"month day" = {return(as.POSIXct(ymd(paste(missingYear,"/",charDateVar),tz = "UTC")))},
			 "month day" = {return(ymd(paste(missingYear,"/",charDateVar),tz = "UTC"))},
			 
			 "day month" = {return(ydm(paste(missingYear,"/",charDateVar),tz = "UTC"))},
			 
			 "month year" = {return(dmy(paste(missingDay,"/",charDateVar),tz = "UTC"))},
			 #"month year" = {return(format(as.POSIXct(dmy(paste(missingDay,"/",charDateVar)),tz = "UTC"),tz = "UTC", usetz = TRUE))},
			 
			 "year month" = {return(ymd(paste(charDateVar,"/",missingDay),tz = "UTC"))},
			 
			 "year only" = {return(ymd(paste(charDateVar, "/", missingMonth, "/", missingDay),tz = "UTC"))},
			 "month only" =  {return(ymd(paste(missingYear,"/",charDateVar, "/", missingDay),tz = "UTC"))},
			 "day only" = {return(ymd(paste(missingYear, "/", missingMonth, "/", BSkyWeekdayToNumber(charDateVar)),tz = "UTC"))},
			 
			 "year month day" = {return(ymd(charDateVar,tz = "UTC"))},
			 "month day year" = {return(mdy(charDateVar,tz = "UTC"))},
			 "day month year" = {return(dmy(charDateVar,tz = "UTC"))},
			 
			 stop("Invalid date format type")
	  )
}

{{if(options.selected.rdgrp1 ==="suffix")}} 
{{dataset.name}}\${{selected.Destination | safe}}{{selected.prefixOrSuffix | safe}} = BSkyConvertCharDateVarToDate(as.character({{dataset.name}}\${{selected.Destination | safe}}), "{{selected.DateFormat | safe}}", bsky_missingYear, bsky_missingMonth, bsky_missingDay)
{{#else}}
{{dataset.name}}\${{selected.prefixOrSuffix | safe}}{{selected.Destination | safe}} = BSkyConvertCharDateVarToDate(as.character({{dataset.name}}\${{selected.Destination | safe}}), "{{selected.DateFormat | safe}}", bsky_missingYear, bsky_missingMonth, bsky_missingDay)
{{/if}}

BSkyLoadRefresh(bskyDatasetName="{{dataset.name}}",load.dataframe=TRUE)        
`,
            pre_start_r: JSON.stringify({
                TimeZone: "OlsonNames()",
            })
        }
        var objects = {
			labelInfo: { el: new labelVar(config, { label: localization.en.labelInfo, h: 6 }) },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5 }) },
            suffix: { el: new radioButton(config, { label: localization.en.suffix, no: "rdgrp1", increment: "suffix", value: "suffix", state: "checked", extraction: "ValueAsIs" }) },
            prefix: { el: new radioButton(config, { label: localization.en.prefix, no: "rdgrp1", increment: "prefix", value: "prefix", state: "", extraction: "ValueAsIs", }) },
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
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            Destination: {
                el: new dstVariable(config, {
                    label: localization.en.Destination,
                    no: "Destination",
                    filter: "String|Numeric|Date|Ordinal|Nominal|Scale",
                    //extraction: "NoPrefix|UseComma|Enclosed",
					extraction: "NoPrefix",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
			DateFormat: {
                el: new comboBox(config, {
                    no: 'DateFormat',
                    label: localization.en.DateFormat,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    options:["month day", "day month", "month year", "year month", "year month day", "month day year", "day month year", "year only", "month only", "day only"],
                    //options: ["%m-%d-%y", "%m-%d-%y %H:%M:%S", "%m-%d-%y %I:%M:%S %p", "%b %d, %y", "%b %d, %y %H:%M:%S", "%m-%d-%Y", "%m-%d-%Y  %H:%M:%S", "%m-%d-%Y %I:%M:%S %p", "%b %d, %Y", "%b %d, %Y %H:%M:%S", "%m/%d/%y", "%m/%d/%y %H:%M:%S", "%m/%d/%y %I:%M:%S %p", "%b %d, %y", "%b %d, %y %H:%M:%S", "%m/%d/%Y", "%m/%d/%Y %H:%M:%S", "%m/%d/%Y %I:%M:%S %p", "%b %d, %Y", "%b %d, %Y %H:%M:%S", "%d-%m-%y", "%d-%m-%y %H:%M:%S", "%d-%m-%y %I:%M:%S %p",
                    //    "%d %b, %y", "%d %b, %y %H:%M:%S", "%d-%m-%Y", "%d-%m-%Y %H:%M:%S", "%d-%m-%Y %I:%M:%S %p", "%d %b, %Y", "%d %b, %Y  %H:%M:%S", "%d/%m/%y", "%d/%m/%y %H:%M:%S", "%d/%m/%y %I:%M:%S %p", "%d %b, %y", "%d %b, %y %H:%M:%S", "%d/%m/%Y", "%d/%m/%Y %H:%M:%S", "%d/%m/%Y %I:%M:%S %p", "%d %b, %Y", "%d %b, %Y  %H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d", "%Y-%m-%d %I:%M:%S", "%Y-%d-%m", "%Y-%d-%m %H:%M:%S", "%Y-%d-%m %I:%M:%S", "%y-%m-%d", "%y-%m-%d %H:%M:%S", "%y-%m-%d %I:%M:%S",
                    //      "%y-%d-%m", "%y-%d-%m %H:%M:%S", "%y-%d-%m %I:%M:%S", "%Y %m %d  %H:%M:%S", "%Y %m %d", "%Y %m %d %H:%M:%S", "%Y %m %d %I:%M:%S", "%Y %d %m", "%Y %d %m %H:%M:%S", "%Y %d %m %I:%M:%S", "%y %m %d", "%y %m %d %H:%M:%S", "%y %m %d %I:%M:%S", "%y %d %m", "%y %d %m %H:%M:%S", "%y %d %m %I:%M:%S", "%Y %m %d  %H:%M:%S", "%Y %m %d", "%Y %m %d %H:%M:%S", "%Y %m %d %I:%M:%S", "%Y %d %m", "%Y %d %m %H:%M:%S", "%Y %d %m %I:%M:%S", "%y %m %d", "%y %m %d %H:%M:%S", "%y %m %d %I:%M:%S", "%y %d %m", "%y %d %m %H:%M:%S", "%y %d %m %I:%M:%S"]
                })
            },
			missingYear: {
                el: new input(config, {
                    no: 'missingYear',
                    label: localization.en.missingYear,
                    placeholder: "",
                    type: "character",
					//filter: "String|Numeric|Scale",
                    enforceRobjectRules: false,
					//allow_spaces: true,
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
			// Not used
            TimeZone: {
                el: new comboBox(config, {
                    no: 'TimeZone',
                    label: localization.en.TimeZone,
                    multiple: true,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: ""
                })
            },
        }
        var timeZoneOptions = {
            el: new optionsVar(config, {
                no: "timeZoneOptions",
                name: "Options",
                content: [
                    //objects.TimeZone.el, 
					objects.missingYear.el,
					objects.missingMonth.el,
					objects.missingDay.el,
                ]
            }
            )
        }
        const content = {
            head: [objects.labelInfo.el.content, objects.label1.el.content, objects.suffix.el.content, objects.prefix.el.content, objects.prefixOrSuffix.el.content],
            left: [objects.content_var.el.content],
            right: [objects.Destination.el.content, objects.DateFormat.el.content,],
            bottom: [timeZoneOptions.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-calendar-1",
                onclick: `r_before_modal("${config.id}")`,
                modal_id: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new convertCharacterToDate().render()