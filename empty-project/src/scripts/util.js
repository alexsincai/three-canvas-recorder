export const round = (v, dec = 3) =>
    Math.floor(v * Math.pow(10, dec)) / Math.pow(10, dec);

export const mapRange = (value, fromMin, fromMax, toMin, toMax) => {
    const input = fromMax - fromMin;
    const output = toMax - toMin;
    const valueScaled = (value - fromMin) / input;
    return toMin + valueScaled * output;
};
