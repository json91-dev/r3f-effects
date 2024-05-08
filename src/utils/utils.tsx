export const randomIntBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomNumBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const dtr = (deg: number) => {
  return (Math.PI / 180) * deg
}
