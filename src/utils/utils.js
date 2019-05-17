export function startTime(ref) {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  //   document.getElementById("txt").innerHTML = h + ":" + m + ":" + s;
  ref.current.innerHTML = h + ":" + m + ":" + s;
  let t = setTimeout(() => startTime(ref), 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
