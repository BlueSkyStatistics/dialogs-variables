
var localization = {
    en: {
		title: "Character To Date & Time",
		navigation: "Character To Date & Time",
		labelInfo: "If the conversion of the date, time, or date time character variable to date only or date time data type is successful, it will always create the new date variable with YYYY-MM-DD format if only date is available, and YYYY-MM-DD HH:MM:SS, or YYYY-MM-DD HH:MM:SS.xxx with xxx milliseconds if time is available",
		label1: "Select a suffix or prefix for converted variable",
		suffix: "Suffix",
		prefix: "Prefix",
		prefixOrSuffix: "Enter a prefix or suffix",
		Destination: "Select character variable to convert to date",

		DateFormat: "Specify the format for the date portion of the character variable selected, e.g. date only as 2024-10-07 or date time as 2024-10-07 16:34:56 (leave blank if no date element is available)",
		TimeFormat: "Specify the format for the time portion of the character variable selected, e.g. date time including milliseconds as 2024-10-07 16:34:56.789 or just time as 16:34:56 (leave blank if no time element is available)",

		//Not used in this dialog
		TimeZone: "Select a time zone (default -nothing selected is the local time zone of the PC)",
		
		missingYear: "Missing Year: if year is missing in date character variable, type in the year, e.g. 2024. Leave blank to use current year",
		missingMonth: "Missing Month: if month is missing in date character variable, type in the month, e.g. 03, Mar, or March for March. Leave blank to use current month",
		missingDay: "Missing Day: if day is missing in date character variable, type in the day of the month, e.g. 17. Leave blank to use today",
		
		missingHour: "Missing Hour: if hour is missing in date/time character variable, type in the hour, e.g. 7 or 16. Leave blank to use current hour",
		missingMinute: "Missing Minute: if minute is missing in date/time character variable, type in the minute, e.g. 10 or 35. Leave blank to use current minute",
		missingSeconds: "Missing Seconds: if seconds is missing in date/time character variable, type in the seconds, e.g. 17 or 59. Leave blank to use current seconds",
		
help: {
		title: "Convert partial of full Date characters to Date data type",
		r_help: "help(package=\"lubridate\")",
		body: `
			<b>Description</b></br>
			Converts a date, time, or date time character string with partial or full date and time elements, i.e., date elements such as year, month, and day of the month to a date (POSIXct class) type or just the time such as Hour Min Sec Millisec, Hour Min Sec, .. to a full date (POSIXct class) type. 
			<br/>
			<br/>
			Select a format from the possible list of formats from date formats if only date elements are available in the selected character string
			<br/> 
			Select a time format the possible list of time formats if only time elements are available in the selected character string
			<br/>
			Select both date and time formats from the date and time formats selection list if both date and time elements are available in the selected character string
			<br/>
			Select the appropriate format that represents the date and time character string (i.e., order and presence/absence of month, day, or year or hour, min, seconds, or milliseconds elements)
			<br/>
			Many string preparation steps are performed internally before calling the functions from lubridate package to convert the prepared character date, time, or date time string to a new POSIXct date variable.
			<br/>
			<br/>
			OPTIONS
			<br/>
			Expand the OPTIONS to fine-tune further whether to use the current year, month, or today if the year, month, or date elements are absent in the character date string variable or current hour, minute, seconds if one or more time elements are missing from the character time string.
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
			Choose this when the selected character date string only contains the year followed by the month and no day of the month, such as 2024/03, 2020-05, 2023,Mar, 2018-Jul,...
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
			Time Formatting choices for the selected character date string variable are:
			</br>
			</br>
			Hour Min Sec
			</br>
			Choose this when the selected character date/time string contains Hour, followed by Minutes and Seconds, such as 22/03/2024 17:15:48, or just time as 17:15:48,...
			</br>
			</br>
			Hour Min Sec Millisec (or Microsec)
			</br>
			Choose this when the selected character date/time string contains Hour, followed by Minutes, Seconds, and Milliseconds, or Micro seconds, such as 22/03/2024 17:15:48.784, or just time as 17:15:48.784,17:15:48.784239,...
			</br>
			</br>
			Min Sec Millisec (or Microsec)
			</br>
			Choose this when the selected character time string contains Minutes, Seconds, and Milliseconds, or Micro seconds, such as just time 15:48.784,15:48.784239... 
			</br>
			</br>
			Hour Min 
			</br>
			Choose this when the selected character date/time string contains Hour, followed by Minutes, such as 22/03/2024 17:15, or just time 17:15,...
			</br>
			</br>
			Min Sec
			</br>
			Choose this when the selected character time string contains Minutes and Seconds such as time as 15:48,... 
			</br>
			</br>
			Sec Millisec (or Microsec)
			</br>
			Choose this when the selected character time string contains Seconds, and Milliseconds, or Micro seconds, such as time as 48.784, 55.784239,... 
			</br>
			</br>
			Hour only 
			</br>
			Choose this when the selected character time string contains only Hour such as time as 10, 14, or 22,... 
			</br>
			</br>
			Min only
			</br>
			Choose this when the selected character time string contains only Minutes such as time as 10, 29, 44, or 59,... 
			</br>
			</br>
			Sec only
			</br>
			Choose this when the selected character time string contains only Seconds such as time as 10, 29, 44, or 59,... 
			</br>
			</br>	
			Millisec only
			</br>
			Choose this when the selected character time string contains only Milliseconds such as time as 10, 290, 448, or 759,... 
			</br>
			</br>
			Microsec only
			</br>
			Choose this when the selected character time string contains only Microseconds such as time as 101, 2901, 448890, or 759123,... 
			</br>
			</br>
<b>Help</b></br>
help(package=\"lubridate\")
`}
    }
}


class convertStringToDate extends baseModal {
    constructor() {
        var config = {
            id: "convertStringToDate",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode:`

require(lubridate)

#BSkystrptime (varNames = c( {{selected.Destination | safe}}), dateFormat = "{{selected.DateFormat | safe}}", timezone = "{{selected.TimeZone | safe}}", prefixOrSuffix = "{{selected.rdgrp1 | safe}}",  prefixOrSuffixValue = "{{selected.prefixOrSuffix | safe}}", data = "{{dataset.name}}") 

# Extract current year, month, and day
# bsky_currentDate = Sys.Date()

bsky_currentDateTime = lubridate::now()
bsky_currentYear = lubridate::year(bsky_currentDateTime)
bsky_currentMonth = lubridate::month(bsky_currentDateTime)
bsky_currentDay = lubridate::day(bsky_currentDateTime)

#Get current hour, minute, seconds, and milliseconds
bsky_currentHour <- lubridate::hour(bsky_currentDateTime)
bsky_currentMinute <- lubridate::minute(bsky_currentDateTime)
bsky_currentSeconds <- floor(lubridate::second(bsky_currentDateTime))

bsky_fullSeconds <- as.numeric(bsky_currentDateTime)
bsky_currentMilliseconds <- (bsky_fullSeconds - floor(bsky_fullSeconds)) * 1000 


bsky_missingYear = {{if(options.selected.missingYear !="")}} "{{selected.missingYear | safe}}" {{#else}} bsky_currentYear {{/if}}

bsky_missingMonth = {{if(options.selected.missingMonth !="")}} "{{selected.missingMonth | safe}}" {{#else}} bsky_currentMonth {{/if}}

bsky_missingDay = {{if(options.selected.missingDay !="")}} "{{selected.missingDay | safe}}" {{#else}} bsky_currentDay {{/if}}


bsky_missingHour = {{if(options.selected.missingHour !="")}} "{{selected.missingHour | safe}}" {{#else}} bsky_currentHour {{/if}}

bsky_missingMinute = {{if(options.selected.missingMinute !="")}} "{{selected.missingMinute | safe}}" {{#else}} bsky_currentMinute {{/if}}

bsky_missingSeconds = {{if(options.selected.missingSeconds !="")}} "{{selected.missingSeconds | safe}}" {{#else}} bsky_currentSeconds {{/if}}


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

BSkyConvertCharDateVarToDate <- function(charDateVar, dateFormat, timeFormat, 
					missingYear = lubridate::year(lubridate::now()), missingMonth = lubridate::month(lubridate::now()), missingDay = lubridate::day(lubridate::now()),
					missingHour = lubridate::hour(lubridate::now()), missingMinute = lubridate::minute(lubridate::now()), missingSeconds = floor(lubridate::second(lubridate::now()))
				)
{
	if(timeFormat == ''){
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
	} else if(dateFormat == '') {  
		#ymd_hms("2024-10-07 12:34:56.789")
		switch(timeFormat,
			"Hour Min Sec" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, charDateVar),tz = "UTC"))}, 
			"Hour Min Sec Millisec (or Microsec)" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, charDateVar),tz = "UTC"))},
			"Min Sec Millisec (or Microsec)" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, missingHour, ":", charDateVar),tz = "UTC"))},								
			"Hour Min" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, charDateVar, ":00"),tz = "UTC"))}, 
			"Min Sec" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, missingHour, ":", charDateVar),tz = "UTC"))}, 
			"Sec Millisec (or Microsec)" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, missingHour, ":", missingMinute, ":", charDateVar),tz = "UTC"))},  
			"Hour only" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, charDateVar, ":00:00"),tz = "UTC"))}, 
			"Min only" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, missingHour, ":", charDateVar, ":00"),tz = "UTC"))}, 
			"Sec only" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, missingHour, ":", missingMinute, ":", charDateVar),tz = "UTC"))},
			"Millisec only" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, missingHour, ":", missingMinute, ":",  paste0(missingSeconds, "." ,sprintf("%03d", as.numeric(charDateVar)))),tz = "UTC"))},
			"Microsec only" = {return(ymd_hms(paste(missingYear, "/", missingMonth, "/", missingDay, missingHour, ":", missingMinute, ":",  paste0(missingSeconds, "." ,sprintf("%06d", as.numeric(charDateVar)))),tz = "UTC"))},
			
			stop("Invalid time format type")
		)
	} else {
		# Extract the time component at the end of the string (after the last space)
		time_part = sub(".*\\\\s(\\\\d{1,2}:\\\\d{1,2}:\\\\d{1,2}(\\\\.\\\\d{1,3})?)$", "\\\\1", charDateVar)
		#print(time_part)

		# Extract the date component by removing the time part
		date_part = sub("\\\\s\\\\d{1,2}:\\\\d{1,2}:\\\\d{1,2}(\\\\.\\\\d{1,3})?$", "", charDateVar)
		#print(date_part)
		
		date_ready_str = switch(dateFormat,
				 "month day" = {paste(missingYear,"/",date_part)},
				 "day month" = {paste(missingYear,"/",date_part)},
				 "month year" = {paste(missingDay,"/",date_part)},
				 "year month" = {paste(date_part,"/",missingDay)},
				 "year only" = {paste(date_part, "/", missingMonth, "/", missingDay)},
				 "month only" =  {paste(missingYear,"/",date_part, "/", missingDay)},
				 "day only" = {paste(missingYear, "/", missingMonth, "/", BSkyWeekdayToNumber(date_part))},
				 "year month day" = {date_part},
				 "month day year" = {date_part},
				 "day month year" = {date_part},
	
				 stop("Invalid date format type")
		)
		#print(date_ready_str)
		
		time_ready_str = switch(timeFormat,
			"Hour Min Sec" = {time_part}, 
			"Hour Min Sec Millisec (or Microsec)" = {time_part},
			"Min Sec Millisec (or Microsec)" = {paste(missingHour, ":", time_part)},								
			"Hour Min" = {paste( time_part, ":00")}, 
			"Min Sec" = {paste(missingHour, ":", time_part)}, 
			"Sec Millisec (or Microsec)" = {paste(missingHour, ":", missingMinute, ":", time_part)},  
			"Hour only" = {paste(time_part, ":00:00")}, 
			"Min only" = {paste(missingHour, ":", time_part, ":00")}, 
			"Sec only" = {paste(missingHour, ":", missingMinute, ":", time_part)},
			"Millisec only" = {paste(missingHour, ":", missingMinute, ":",  paste0(missingSeconds, "." ,sprintf("%03d", as.numeric(time_part))))},
			"Microsec only" = {paste(missingHour, ":", missingMinute, ":",  paste0(missingSeconds, "." ,sprintf("%06d", as.numeric(time_part))))},
			
			stop("Invalid time format type")
		)
		#print(time_ready_str)
		
		bsky_date_time = switch(dateFormat,
				 "month day" = {ymd_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "day month" = {ydm_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "month year" = {dmy_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "year month" = {ymd_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "year only" = {ymd_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "month only" =  {ymd_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "day only" = {ymd_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "year month day" = {ymd_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "month day year" = {mdy_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 "day month year" = {dmy_hms(paste(date_ready_str, time_ready_str),tz = "UTC")},
				 
				 stop("Invalid date time format type")
		)
		#print(bsky_date_time)
		
		return(bsky_date_time)
	}
}

{{if(options.selected.rdgrp1 ==="suffix")}} 
	if(grepl("(Millisec|Microsec)", "{{selected.TimeFormat | safe}}")){
		{{dataset.name}}\${{selected.Destination | safe}}{{selected.prefixOrSuffix | safe}}_fs = BSkyConvertCharDateVarToDate(as.character({{dataset.name}}\${{selected.Destination | safe}}), "{{selected.DateFormat | safe}}", "{{selected.TimeFormat | safe}}", bsky_missingYear, bsky_missingMonth, bsky_missingDay, bsky_missingHour, bsky_missingMinute, bsky_missingSeconds)
		#{{dataset.name}}\${{selected.Destination | safe}}{{selected.prefixOrSuffix | safe}}_char = strftime({{dataset.name}}\${{selected.Destination | safe}}{{selected.prefixOrSuffix | safe}}_fs, "%Y-%m-%d %H:%M:%OS3")
		{{dataset.name}}\${{selected.Destination | safe}}{{selected.prefixOrSuffix | safe}}_char = format({{dataset.name}}\${{selected.Destination | safe}}{{selected.prefixOrSuffix | safe}}_fs, "%Y-%m-%d %H:%M:%OS6", tz="UTC")
	}else {
		{{dataset.name}}\${{selected.Destination | safe}}{{selected.prefixOrSuffix | safe}} = BSkyConvertCharDateVarToDate(as.character({{dataset.name}}\${{selected.Destination | safe}}), "{{selected.DateFormat | safe}}", "{{selected.TimeFormat | safe}}", bsky_missingYear, bsky_missingMonth, bsky_missingDay, bsky_missingHour, bsky_missingMinute, bsky_missingSeconds)
	}
{{#else}}
	if(grepl("(Millisec|Microsec)", "{{selected.TimeFormat | safe}}")){
		{{dataset.name}}\${{selected.prefixOrSuffix | safe}}{{selected.Destination | safe}}_fs = BSkyConvertCharDateVarToDate(as.character({{dataset.name}}\${{selected.Destination | safe}}), "{{selected.DateFormat | safe}}", "{{selected.TimeFormat | safe}}", bsky_missingYear, bsky_missingMonth, bsky_missingDay, bsky_missingHour, bsky_missingMinute, bsky_missingSeconds)
		{{dataset.name}}\${{selected.prefixOrSuffix | safe}}{{selected.Destination | safe}}_char = format({{dataset.name}}\${{selected.prefixOrSuffix | safe}}{{selected.Destination | safe}}_fs, "%Y-%m-%d %H:%M:%OS6", tz="UTC")
	}else {
		{{dataset.name}}\${{selected.prefixOrSuffix | safe}}{{selected.Destination | safe}} = BSkyConvertCharDateVarToDate(as.character({{dataset.name}}\${{selected.Destination | safe}}), "{{selected.DateFormat | safe}}", "{{selected.TimeFormat | safe}}", bsky_missingYear, bsky_missingMonth, bsky_missingDay, bsky_missingHour, bsky_missingMinute, bsky_missingSeconds)
	}
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
                    required: false,
                    options:[	"",
								"month day", 
								"day month", 
								"month year", 
								"year month", 
								"year month day", 
								"month day year", 
								"day month year", 
								"year only", 
								"month only", 
								"day only"
							],
                    //options: ["%m-%d-%y", "%m-%d-%y %H:%M:%S", "%m-%d-%y %I:%M:%S %p", "%b %d, %y", "%b %d, %y %H:%M:%S", "%m-%d-%Y", "%m-%d-%Y  %H:%M:%S", "%m-%d-%Y %I:%M:%S %p", "%b %d, %Y", "%b %d, %Y %H:%M:%S", "%m/%d/%y", "%m/%d/%y %H:%M:%S", "%m/%d/%y %I:%M:%S %p", "%b %d, %y", "%b %d, %y %H:%M:%S", "%m/%d/%Y", "%m/%d/%Y %H:%M:%S", "%m/%d/%Y %I:%M:%S %p", "%b %d, %Y", "%b %d, %Y %H:%M:%S", "%d-%m-%y", "%d-%m-%y %H:%M:%S", "%d-%m-%y %I:%M:%S %p",
                    //    "%d %b, %y", "%d %b, %y %H:%M:%S", "%d-%m-%Y", "%d-%m-%Y %H:%M:%S", "%d-%m-%Y %I:%M:%S %p", "%d %b, %Y", "%d %b, %Y  %H:%M:%S", "%d/%m/%y", "%d/%m/%y %H:%M:%S", "%d/%m/%y %I:%M:%S %p", "%d %b, %y", "%d %b, %y %H:%M:%S", "%d/%m/%Y", "%d/%m/%Y %H:%M:%S", "%d/%m/%Y %I:%M:%S %p", "%d %b, %Y", "%d %b, %Y  %H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d", "%Y-%m-%d %I:%M:%S", "%Y-%d-%m", "%Y-%d-%m %H:%M:%S", "%Y-%d-%m %I:%M:%S", "%y-%m-%d", "%y-%m-%d %H:%M:%S", "%y-%m-%d %I:%M:%S",
                    //      "%y-%d-%m", "%y-%d-%m %H:%M:%S", "%y-%d-%m %I:%M:%S", "%Y %m %d  %H:%M:%S", "%Y %m %d", "%Y %m %d %H:%M:%S", "%Y %m %d %I:%M:%S", "%Y %d %m", "%Y %d %m %H:%M:%S", "%Y %d %m %I:%M:%S", "%y %m %d", "%y %m %d %H:%M:%S", "%y %m %d %I:%M:%S", "%y %d %m", "%y %d %m %H:%M:%S", "%y %d %m %I:%M:%S", "%Y %m %d  %H:%M:%S", "%Y %m %d", "%Y %m %d %H:%M:%S", "%Y %m %d %I:%M:%S", "%Y %d %m", "%Y %d %m %H:%M:%S", "%Y %d %m %I:%M:%S", "%y %m %d", "%y %m %d %H:%M:%S", "%y %m %d %I:%M:%S", "%y %d %m", "%y %d %m %H:%M:%S", "%y %d %m %I:%M:%S"]
                })
            },
			TimeFormat: {
                el: new comboBox(config, {
                    no: 'TimeFormat',
                    label: localization.en.TimeFormat,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: false,
                    options:[	"",
								"Hour Min Sec", 
								"Hour Min Sec Millisec (or Microsec)",
								"Min Sec Millisec (or Microsec)",								
								"Hour Min", 
								"Min Sec", 
								"Sec Millisec (or Microsec)",  
								"Hour only", 
								"Min only", 
								"Sec only",
								"Millisec only",
								"Microsec only",
							],
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
					objects.missingHour.el,
					objects.missingMinute.el,
					objects.missingSeconds.el,
                ]
            }
            )
        }
        const content = {
            head: [objects.labelInfo.el.content, objects.label1.el.content, objects.suffix.el.content, objects.prefix.el.content, objects.prefixOrSuffix.el.content],
            left: [objects.content_var.el.content],
            right: [objects.Destination.el.content, objects.DateFormat.el.content, objects.TimeFormat.el.content,],
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
module.exports.item = new convertStringToDate().render()