export const consumer = async <ObjectType = any, Returnable = void>(
  array: Array<ObjectType>,
  runnable: (object: ObjectType) => Promise<Returnable>
) => {
  return await array.reduce<Promise<Returnable | void>>((acc, nextItem) => {
    return acc.then(() => runnable(nextItem));
  }, Promise.resolve());
};
