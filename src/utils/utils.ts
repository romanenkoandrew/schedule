const getDateFromTimeStamp = (timeZone: string) => {
  const options = {
    timeZone: timeZone,
    year: 'numeric',
    day: 'numeric',
    month: 'numeric'
  };
  return new Date().toLocaleString('en-GB', options);
};

const getTimeFromTimeStamp = (timeZone: string) => {
  const options = {
    timeZone: timeZone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  return new Date().toLocaleString('en-GB', options);
};

// это пока не точно

export { getDateFromTimeStamp, getTimeFromTimeStamp };
