const cheerio = require('cheerio');
const moment = require('moment');
const tz = require('moment-timezone');

function extractListingsFromHTML (html) {
  const $ = cheerio.load(html);
  const dataRows= $('#table0 > tbody > tr');

  const estacion= [];
  dataRows.each((i, el) => {

    // Extract information from each row of the jobs table
    let time = $(el).children('.obsTime').text().trim();
    let precipitation = $(el).children('td').eq(0).text();
    time = moment(time).tz("America/Tegucigalpa").utc().format('YYYY-MM-DD HH:mm');
   
    estacion.push({time, precipitation});
  });

  return estacion;
}

module.exports = {
  extractListingsFromHTML
};