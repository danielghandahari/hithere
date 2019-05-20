export function startTime(ref) {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  ref.current.innerHTML = h + ":" + m + ":" + s;
  let t = setTimeout(() => startTime(ref), 500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

export function convertTimestampToTime(timestamp) {
  let date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  let hours = date.getHours();
  hours = checkTime(hours);
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  let formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
}

export function getPosition(options) {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
