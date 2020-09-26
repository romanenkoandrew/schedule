import moment from 'moment';

const getDateFromTimeStamp = (dateData: [number, string], timeZone: number) => {
  const timestamp = dateData[0];
  const [hours, minutes] = dateData[1].split(':');
  const options = {
    year: 'numeric',
    day: 'numeric',
    month: 'numeric'
  };
  const dateWithUserUTC =
    timestamp -
    -new Date().getTimezoneOffset() * 60000 +
    timeZone * 3600000 -
    new Date(timestamp).getHours() * 3600000 -
    new Date(timestamp).getMinutes() * 60000 -
    new Date(timestamp).getSeconds() * 1000 -
    new Date(timestamp).getMilliseconds() +
    +hours * 3600000 +
    +minutes * 60000;
  return new Date(dateWithUserUTC).toLocaleString('en-GB', options);
};

const getTimeFromString = (dateData: [number, string], timeZoneNow: number, timeZoneEvent: number) => {
  const time = dateData[1];
  const hours: number = +time.split(':')[0];
  let hoursWithUTCTimeZone: number = 0;
  if (hours - timeZoneEvent < 0) {
    hoursWithUTCTimeZone = 24 - (timeZoneEvent - hours);
  } else if (hours - timeZoneEvent > 24) {
    hoursWithUTCTimeZone = hours - timeZoneEvent - 24;
  } else if (hours - timeZoneEvent === 24 || hours - timeZoneEvent === 0) {
    hoursWithUTCTimeZone = 0;
  } else {
    hoursWithUTCTimeZone = hours - timeZoneEvent;
  }

  let hoursWithNowTimeZone: number = 0;
  if (hoursWithUTCTimeZone + timeZoneNow < 0) {
    hoursWithNowTimeZone = 24 + (timeZoneNow + hoursWithUTCTimeZone);
    console.log(hoursWithNowTimeZone);
  } else if (hoursWithUTCTimeZone + timeZoneNow > 24) {
    hoursWithNowTimeZone = hoursWithUTCTimeZone + timeZoneNow - 24;
  } else if (hoursWithUTCTimeZone + timeZoneNow === 24 || hoursWithUTCTimeZone + timeZoneNow === 0) {
    hoursWithNowTimeZone = 0;
  } else {
    hoursWithNowTimeZone = hoursWithUTCTimeZone + timeZoneNow;
  }

  return `${hoursWithNowTimeZone}:${time.split(':')[1]}`;
};

export { getDateFromTimeStamp, getTimeFromString };
