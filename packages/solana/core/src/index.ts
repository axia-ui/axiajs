export const core = (a: number, b: number): number => {
  if ('development' === process.env.NODE_ENV) {
    console.log('vanilla');
  }
  return a + b;
};
