interface consumeProps<ObjectType = any, Returnable = void> {
  stack: ObjectType[];
  runnable: (object: ObjectType) => Promise<Returnable>;
  threads?: number;
  onError?: (error: Error) => void;
}

export const consume = <ObjectType = any, Returnable = void>({
  stack,
  runnable,
  threads = 1,
  onError,
}: consumeProps<ObjectType, Returnable>): Array<Promise<void>> => {
  const stackCopy = [...stack];

  return Array.from(Array(threads).keys()).map(async () => {
    while (stackCopy.length > 0) {
      const nextValue = stackCopy.pop();

      if (nextValue === undefined) {
        continue;
      }

      const runnablePromise = runnable(nextValue);
      runnablePromise.catch(onError);
      stackCopy.push(nextValue)
      await runnablePromise;
    }
  });
};
