'use strict';

const request = require('axios');
const {extractListingsFromHTML} = require('./helpers');

module.exports.getdata = (event, context, callback) => {
  request('https://hads.ncep.noaa.gov/nexhads2/servlet/DecodedData?sinceday=-3&nwslis=QUIH3&hsa=nil&state=nil&of=0#')
    .then(({data}) => {
      const datosDeEstacion = extractListingsFromHTML(data);
      callback(null, {datosDeEstacion});
    })
    .catch(callback);
};

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
