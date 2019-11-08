const request = async (url, options) => {
  const data = [{
    data: "somebooks"
  }];

  return JSON.stringify(data);
};

module.exports = request;