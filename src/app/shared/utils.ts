// @ts-ignore
export const deepCopyFunction = (inObject) => {
  let value;
  let key;
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject;
  }
  const outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    // @ts-ignore
    outObject[key] = deepCopyFunction(value);
  }
  return outObject;
};
