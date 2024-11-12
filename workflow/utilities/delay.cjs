module.exports = async (delayInMs) => {
  return new Promise((resolve) => setTimeout(resolve, delayInMs));
};
