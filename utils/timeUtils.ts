import moment, { Moment } from "moment";

export const checkIsBigger = (dateToCheck: Moment) => {
  return moment().isAfter(dateToCheck);
};
