function getRandomInt(max: number, min?: number): number {
  const minNumber = min ? min : Math.ceil(1);

  max = Math.floor(max);
  return Math.floor(Math.random() * (max - minNumber + 1)) + minNumber; //Максимум и минимум включаются
}

export default getRandomInt;
