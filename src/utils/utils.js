export const calculateDateDifference = (createdAt) => {
  const date_now = new Date();
  const date_future = new Date(createdAt);
  var delta = Math.abs(date_future - date_now) / 1000;

  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  if (days) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  if (hours) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  if (minutes) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }

  var seconds = Math.floor(delta % 60); 
  return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
}