export const shuf = <ObjectType>(array: Array<ObjectType>) =>
  array
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5);
