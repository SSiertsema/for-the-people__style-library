import moment from "moment";

export function convertUtcToTime(value) {
  const date = new Date(value);
  return moment(date).format("HH:mm");
}

export function convertUtcToDatetime(value) {
  if (typeof value === "undefined") {
    return "";
  }
  if (value === null) {
    return "";
  }
  const date = new Date(value);
  return moment(date).format("YYYY-MM-DDTHH:mm");
}

export function convertTimeToUtc(time) {
  const timeParts = time.split(":");
  const date = new Date();
  date.setHours(timeParts[0]);
  date.setMinutes(timeParts[1]);
  return date.toISOString();
}

export function convertDateTimeToUtc(dateTime) {
  const parts = dateTime.split("T");
  const datePart = parts[0];
  const timePart = parts[1];

  const dateParts = datePart.split("-");
  const year = dateParts[0];
  const month = parseInt(dateParts[1]) - 1; // month starts from 0 to 11
  const day = dateParts[2];

  const timeParts = timePart.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  const date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(hours, minutes);

  console.log(dateTime, date.toLocaleString(), date.toISOString());

  return date.toISOString();
}
