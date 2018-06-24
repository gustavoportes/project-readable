export const uuid = () => {
  let seed = Date.now();
  let uuid = 'xxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, (c) => {
    let r = (seed + Math.random() * 16) % 16 | 0;
    seed = Math.floor(seed/16);
    return (c === 'x' ? r : r & (0x3|0x8)).toString(16);
  });
  return uuid;
}