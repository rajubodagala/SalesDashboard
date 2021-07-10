import React, { Component } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { IconButton, withStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import startOfWeek from "date-fns/startOfWeek";
import clsx from "clsx";  
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import isSameDay from "date-fns/isSameDay";
import endOfWeek from "date-fns/endOfWeek";
import { makeJSDateObject } from "./helper.js";
import isWithinInterval from "date-fns/isWithinInterval";
import '../style.css'

class SalesCalender extends Component
{
    constructor() {
        super();
        this.state = {
            startDate:  new Date(),
            endDate:  new Date(),
            reportingCycle: "Monthly",
            selectedDate: new Date(),
            pickerView: ["month"],
            pickerType: "month"
        };
      }

      
  handleDateChange = (sDate) => {
    this.props.selectedDate(sDate);
    this.setState({
      selectedDate: sDate,
    });
  };
  
  formatWeekSelectLabel = (date, invalidLabel) => {
    let dateClone = makeJSDateObject(date);    

    return  dateClone && isValid(dateClone)
    ? ` ${format(startOfWeek(dateClone), 'MMMM yyyy')} `
    : invalidLabel;
  };
  renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;
    let dateClone = makeJSDateObject(date);
    let selectedDateClone = makeJSDateObject(selectedDate);
    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);
    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> </span>
        </IconButton>
      </div>
    );
  };

render() {
    const {
      selectedDate,
      pickerType,
      pickerView
    } = this.state;
    return (
      <div className={"calendercss"}>
<MuiPickersUtilsProvider utils={DateFnsUtils}>
<DatePicker
  value={selectedDate || new Date()}
  onChange={this.handleDateChange}
  inputVariant="outlined"
  minDate={new Date().setFullYear(
    new Date().getFullYear() - 10
  )}
  maxDate={new Date().setFullYear(
    new Date().getFullYear() + 10
  )}
  openTo={"month"}
  views={["month"]}
  clearable
  autoOk
  className="pr-2 custom-dropdown"
  labelFunc={this.formatWeekSelectLabel}
/>
</MuiPickersUtilsProvider>
</div>
);
}
}

export default SalesCalender;