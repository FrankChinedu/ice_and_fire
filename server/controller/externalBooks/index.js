const request = require('request-promise');
const transform = require('../../utils/resquestUtil');

const getBooks = async (req, res) => {
  let name = req.query.name;

  name = name ? `?name=${name}`: '';

  const url = `https://www.anapioficeandfire.com/api/books${name}`;

  try {
    let result = await request(url);

    result = JSON.parse(result);
    if(result.length) {
      for(let i =0; i < result.length; i++){
        delete result[i]['characters']
        delete result[i]['povCharacters'];
        delete result[i]['url'];
        delete result[i]['mediaType'];
      }
    }
    return res.status(200).json(transform.response(200, 'success', result));
  } catch (e) {
    console.log('err', e)
    return res.status(400).json(transform.response(400, 'error', {message: e.message}));
  }
};

module.exports = {
  getBooks
};
