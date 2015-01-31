/**
 * Created by pery on 01/02/2015.
 */
/**
 * Created by pery on 31/01/2015.
 */
var _ = require('lodash');
var request = require('request');

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

var URL = _.template('http://simania.co.il/searchBooks.php?searchType=tabAll&query={{bookName}}');
//'simania.co.il'
var scrapper = {
    description:'#description > .description',
    bookCover:'.bookImage->src',/*src*/
    author:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > h3 > a'/*text*/,
    bookName:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > h2 > span',/*text*/
    publisher:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > a:nth-child(1)',/*text*/
    year:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > b:nth-child(2)',
    pages:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > b:nth-child(3)',/*text*/
    category:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > a:nth-child(6)',/*text*/
    translation:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > a:nth-child(4)'
};

function dataByBookNamNamee(bookName,callback){
    "use strict";
    //callback(realPageUrl, scrapper);
    callback(null,{pageUrl:123, scrapper:{a:34}});

};

module.exports = dataByBookNamNamee;
