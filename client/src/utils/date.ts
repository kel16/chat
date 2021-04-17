import moment from "moment";

export function getTime(date: Date): string {
  return moment(date).format("LT");
}
