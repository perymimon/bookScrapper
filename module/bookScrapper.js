/**
 * Created by pery on 24/01/2015.
 */
var env = require('jsdom').env;
var _ = require('lodash');


/*site to check*/

    function getHtmlPage(url) {
        return /*req = */request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('STATUS: ' + response.statusCode);
                console.log('HEADERS: ' + JSON.stringify(response.headers));
            }
        });
    }

    var scrapperCollection = {
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
function scrapBookInformation(page,callback){
    "use strict";
    var url = page.pageUrl;
    var scrapper = page.scrapper;
    console.log(page);
    env(url, function (errors, win) {
        console.log('evc:',errors,win);
        var $ = require('jquery')(win);
        var info = {};
        _(scrapper).forEach(function (val, key) {
            var a =  val.split('->');
            var path = a[0], attr = a[1];
            info[key] = $(path)[0][attr || 'innerHTML'].trim();
        });

        callback(errors,info);
    });
}
var simania =  require('./proactiveSearch/simania.js');
var async = require('async');
var siteToCheck = [simania,simania];
module.exports = function (req, res) {
        "use strict";
        //var url = 'http://simania.co.il/bookdetails.php?item_id=640589';
        var bookName = req.query.bookName;

        async.map(siteToCheck, function (site,next) {
            site(bookName,next);
        }, function (errors, pages) {
            async.map(pages,scrapBookInformation, function (error, info) {
                res.send(info);
            })

        });

    };

