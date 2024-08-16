const httpStatusCode = {
    OK:200,
    ERROR:404
}

const getDataFromRequest = (req) => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(JSON.parse(body));
      });
    });
  };

module.exports = {getDataFromRequest, httpStatusCode}