function DateFormatter(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const dateToFilter = `${year}-${month}-${day}`;
  return dateToFilter;
}
function DateFormatterFromMongoose(date) {
  const formatedDate = date.slice(0, 10);
  return formatedDate;
}
export { DateFormatter, DateFormatterFromMongoose };
