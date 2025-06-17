import { DateTime } from "luxon";
import { DATE_FORMAT, EXAMPLE_VALID_DATE_TIME } from "../constants.js";
import { isValidZone } from "../utils.js";

/**
 * Convert a date time string from one timezone to another
 * @param {string} dateTime - The date time string to convert
 * @param {string} fromZone - The IANA timezone of the date time string
 * @param {string} toZone - The IANA timezone to convert the date time string to
 * @returns {string} - The converted date time string
 */
export const convertTimezones = (dateTime, fromZone, toZone) => {
  const zonedDateTime = DateTime.fromFormat(dateTime, DATE_FORMAT, {
    zone: fromZone
  });

  if (!zonedDateTime.isValid) {
    return `Invalid date time string: ${dateTime}. Must follow format: ${EXAMPLE_VALID_DATE_TIME}`
  }

  if (!isValidZone(toZone)) {
    return `Invalid timezone: ${toZone}. Must be a valid IANA timezone. Example: Asia/Kolkata`
  }

  const convertedDateTime = zonedDateTime.setZone(toZone);

  if (!convertedDateTime.isValid) {
    return `Invalid date time string: ${convertedDateTime} with timezone ${toZone}. The timezone ${toZone} is not a valid IANA timezone.`
  }

  const weekday = convertedDateTime.weekdayLong;
  return `${convertedDateTime.toFormat(DATE_FORMAT)}, ${weekday} in ${toZone}`;
};

