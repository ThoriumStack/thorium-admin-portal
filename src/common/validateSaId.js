export function isValidSAID(id) {
  let i, c,
    even = '',
    sum = 0,
    check = id.slice(-1);

  if (id.length !== 13 || id.match(/\D/)) {
    return false;
  }
  id = id.substr(0, id.length - 1);
  for (i = 0; c = id.charAt(i); i += 2) {
    sum += +c;
    even += id.charAt(i + 1);
  }
  even = '' + even * 2;
  for (i = 0; c = even.charAt(i); i++) {
    sum += +c;
  }
  sum = 10 - ('' + sum).charAt(1);
  return ('' + sum).slice(-1) === check;
}