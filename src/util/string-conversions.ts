export function splitStringToArray(str: string) {
  if (str === undefined || null) return;
  //split string and remove comma separator
  var reGex = /\s*(?:,|$)\s*/;
  const newString = str.split(reGex);
  return newString;
}
