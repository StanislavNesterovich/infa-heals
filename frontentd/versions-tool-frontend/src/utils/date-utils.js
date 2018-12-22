function getFormattedDate(timestamp) {
  const date = new Date(timestamp);
  return date.toDateString();
}

function getDateDiffInDays(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());

  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export {
  getFormattedDate,
  getDateDiffInDays,
};
