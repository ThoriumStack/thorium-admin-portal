import * as moment from "moment/min/moment-with-locales.min"

export function dateTimeToLocalString(dateTime) {
   return `${dateToString(dateTime)} ${timeToLocalString(dateTime)}`;
}

export function timeToLocalString(dateTime) {
  return moment.utc(dateTime).local().format('LT')
}

/**
 * Convert a date to string in the format for the locale
 * @param date
 * @returns {*}
 */
export function dateToString(date) {
  let localeData = moment.localeData();
  let format = localeData.longDateFormat('L')
  return moment(date).format(format)
}

/**
 * A date string locally formatted in local time
  * @param date
 * @returns {string}
 */
export function dateToLocalString(date) {
  let localeData = moment.localeData();
  let format = localeData.longDateFormat('L')
  return moment.utc(date).local().format(format)
}