var loggly = require('loggly');

function logger(tag) {
  return loggly.createClient({
    token: "8c98ff23-bef1-4f92-8696-3108998ef509",
    subdomain: "jenniferjones",
    tags: ["NodeJS", tag],
    json:true
  });
}


module.exports = logger;
