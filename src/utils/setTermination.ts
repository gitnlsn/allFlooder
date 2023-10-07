export const setTermination = (ttl: number) => {
  setTimeout(() => {
    process.exit();
  }, ttl * 1000);
};
