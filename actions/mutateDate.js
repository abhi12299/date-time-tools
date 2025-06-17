import { DateTime } from "luxon";
import z from "zod";
import { DATE_FORMAT, EXAMPLE_VALID_DATE_TIME } from "../constants.js";

/**
 * Mutate a date time string by adding or subtracting days, hours, minutes, months, or years
 * @param {string} dateTime - The date time string to mutate
 * @param {object} update - The update object
 * @returns {string} - The mutated date time string
 */
export const mutateDate = (dateTime, update) => {
  const updateSchema = z.object({
    days: z.number().optional(),
    hours: z.number().optional(),
    minutes: z.number().optional(),
    months: z.number().optional(),
    years: z.number().optional(),
  });

  const { error, data } = updateSchema.safeParse(update);

  if (error) {
    return `Invalid update request. ${error.message}`
  }

  const dateTimeParsed = DateTime.fromFormat(dateTime, DATE_FORMAT);

  if (!dateTimeParsed.isValid) {
    return `Invalid date time string: ${dateTime}. Must follow format: ${EXAMPLE_VALID_DATE_TIME}`
  }

  const { days, hours, minutes, months, years } = data;

  const mutatedDateTime = dateTimeParsed.plus({
    days,
    hours,
    minutes,
    months,
    years,
  });

  return mutatedDateTime.toFormat(DATE_FORMAT);
}
