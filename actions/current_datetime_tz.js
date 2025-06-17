import { DateTime } from "luxon";
import { DATE_FORMAT } from "../constants.js";

/**
 * Get the current date time and timezone
 * @returns {string} - The current date time and timezone
 */
export const currentDateTimeAndTz = () => {
  const zonedDateTime = DateTime.now();

  const dateTime = zonedDateTime.toFormat(DATE_FORMAT);
  const timezone = zonedDateTime.zoneName;
  const weekday = zonedDateTime.weekdayLong;

  return `${dateTime}, ${weekday} in ${timezone}`;
};
