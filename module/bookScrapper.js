/**
 * Created by pery on 24/01/2015.
 */
var env = require('jsdom').env;
var _ = require('lodash');

    function getHtmlPage(url) {
        return /*req = */request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('STATUS: ' + response.statusCode);
                console.log('HEADERS: ' + JSON.stringify(response.headers));
            }
        });
    }

    var scrapperCollection = {
        'simania.co.il':{
            description:'#description > .description',
            bookCover:'.bookImage->src',/*src*/
            author:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > h3 > a'/*text*/,
            bookName:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > h2 > span',/*text*/
            publisher:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > a:nth-child(1)',/*text*/
            year:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > b:nth-child(2)',
            pages:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > b:nth-child(3)',/*text*/
            category:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > a:nth-child(6)',/*text*/
            translation:'body > div > div > div:nth-child(6) > table > tbody > tr > td:nth-child(2) > div > div > a:nth-child(4)'
        },
        'www.steimatzky.co.il':{
            description:'#ctl00_ctl00_MasterContentPlaceHolder_InternalContentPlaceHolder_ItemControl_lblSummary',
            bookCover:'#ctl00_ctl00_MasterContentPlaceHolder_InternalContentPlaceHolder_ItemControl_ItemVisualDisplay1_imgMainCover',
            author:'',
            bookName:'#ctl00_ctl00_MasterContentPlaceHolder_InternalContentPlaceHolder_ItemControl_lblBookName',
            publisher:'',
            year:'',
            pages:'',
            category:'',
            translation:''
        },
        'demo':{
            description:'',
            bookCover:'',
            author:'',
            bookName:'',
            publisher:'',
            year:'',
            pages:'',
            category:'',
            translation:''
        }
    };


    module.exports = function (req, res) {
        "use strict";
        var url = 'http://simania.co.il/bookdetails.php?item_id=640589';
        env(url, function (errors, win) {
            console.log(errors);
            var $ = require('jquery')(win);
            var scarper = scrapperCollection[win.location.hostname];
            var info = {};
            _(scarper).forEach(function (val, key) {
                var a =  val.split('->');
                var path = a[0], attr = a[1];
                info[key] = $(path)[0][attr || 'innerHTML'].trim();
            });

            res.send(info);
        });
        //var read = getHtmlPage('http://simania.co.il/bookdetails.php?item_id=640589');
        //read.pipe(res);
    };

