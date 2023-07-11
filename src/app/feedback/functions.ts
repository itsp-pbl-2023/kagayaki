export const calcStringPerMinute = (text: string, time: number) => {
  const minutes = time / 60000;
  const stringSize = text.length;
  return stringSize / minutes;
};

export const valSpeed = (sizePerMinute: number) => {
  console.log("number:");
  console.log(sizePerMinute);
  const bestStringSize = 300;
  const goodRate: number = 0.2;
  const badRate = 0.5;
  const speed = (sizePerMinute - bestStringSize) / bestStringSize;
  console.log("speed:");
  console.log(speed);
  if (-goodRate < speed && speed < goodRate) {
    return 0;
  }
  if (-badRate < speed && speed < -goodRate) {
    return -1;
  }
  if (goodRate < speed && speed < badRate) {
    return 1;
  }
  if (speed < -badRate) {
    return -2;
  }
  return 2;
};
