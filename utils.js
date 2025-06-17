import { DateTime } from "luxon";

export const isValidZone = (zone) => {
  return DateTime.local().setZone(zone).isValid;
};