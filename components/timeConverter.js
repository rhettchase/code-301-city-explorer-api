const pacificTimeOptions = {
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3,
  hour12: false,
};

module.exports = function convertToPacificTime(utcTimestamp) {
  const timestamp = new Date(utcTimestamp);
  return timestamp.toLocaleString('en-US', pacificTimeOptions);
};
