const response = (statuscode, status, payload) => {
  if(!payload){
    payload = {};
  }

  return {
    "status_code": statuscode,
    "status": status,
    "data": payload
  };
}

module.exports = {
  response,
};
